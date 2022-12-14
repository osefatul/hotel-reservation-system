const {Room} = require("../models/Room.js");
const {Hotel} = require("../models/Hotel.js");
const {ReservedRoom} = require("../models/ReservedRoom.js");

const { createError } = require("../utils/error.js");



const createRoom = async (req, res, next) => {

    /* # How to do it.
    1- Create new room.
    2- Add the newRoom id into the hotel.
    3- Get the hotel_id and Name and add it to the room.
    */

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
    const savedRoom = await newRoom.save();

        // Push the rooms Id into the hotel
        const hotel = await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
        });
    
        await Room.findByIdAndUpdate(savedRoom._id, {
            $push: {
                hotel: {
                    hotelName: hotel.name,
                    hotelId: hotel._id
                }
            }
        })
    res.status(200).json({message : "Room has been created successfully."});
    } catch (err) {
    next(err);
    }
};



const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};


// Set room reserved.
const updateRoomAvailability = async (req, res, next) => {
    try {

        const {totalPrice, 
        reservedBy, 
        roomId,
        dates, 
        hotel,
        selectedRoomsNumber} = req.body
        
        const createReservedRoom =  new ReservedRoom({
            totalPrice, reservedBy, roomId, reservedDates:dates, hotel,
            roomNumbers:selectedRoomsNumber
        })

        await createReservedRoom.save()
        
        res.status(200).json("Room has been successfully reserved.");
    } catch (err) {
        next(err);
    }
};



const deleteRoom = async (req, res, next) => {
    try {
        await Hotel.updateMany({rooms: req.params.id}, {
            $pull: { rooms: req.params.id } 
        }, )
        await Room.findByIdAndDelete(req.params.id);
        // try {
        // await Hotel.findByIdAndUpdate(hotelId, {
        //     $pull: { rooms: req.params.id },
        // });
        res.status(200).json("Room has been deleted.");
    } catch (err) {
        next(err);
    }
};


// All reserved rooms
const getAllReservedRoom = async (req, res, next) => {
    try {
        const rooms = await ReservedRoom.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

// reservedRooms by a specific user
const getAReservedRoomByUser = async (req, res, next) => {
    try {
        const rooms = await ReservedRoom.find({reservedBy: req.params.id});
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};


// reservedRooms by a hotelId
const getAReservedRoomByHotelId = async (req, res, next) => {
    try {
        const room = await ReservedRoom.find({hotel: req.params.id});

        if(!room){
            res.status(200).json({message: "room is not found"});
        }
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};


//delete reserved room and updated room availability as well.
const UpdateReservedRoom= async (req, res, next) => {
    try {
        const {dates} = req.body
        // await Room.updateOne(
        // { "roomNumbers._id": req.body.roomId },
        // {
        //     // We use pull with an array-".$." means in roomNumbers"
        //     $set: {
        //     "roomNumbers.$.unavailableDates": "",
        //     },
        // });

        const createReservedRoom =  await ReservedRoom.findByIdAndDelete(req.params.id)
        console.log(dates)
        res.status(200).json({message: "Room status has been updated."});
    } catch (err) {
        next(err);
    }
};


const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};


const findHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find({rooms: req.params.id});
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
};


const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};





module.exports = {
    createRoom,
    deleteRoom,
    getRoom,
    getRooms,
    updateRoom,
    findHotels,
    getAllReservedRoom,
    getAReservedRoomByUser,
    getAReservedRoomByHotelId,
    UpdateReservedRoom,
    updateRoomAvailability,
}