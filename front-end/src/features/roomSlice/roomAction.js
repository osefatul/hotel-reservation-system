import { fetchingReservedRoomData, fetchingReservedRoomsData, fetchingRoomAvailabilitySuccess, fetchingRoomData, fetchingRoomsData, fetchingRoomSuccess, roomPending, roomsFail } from "./roomSlice"
import axios from "axios"
import { createRoom, deleteRoom, getRooms, updateRoom, updateRoomAvailability, getReservedRooms, getReservedRoomsByUser, deleteReservedRooms, getReservedRoomsByHotel } from "../../api/StaysApi/roomsApi"


export const updatingRoomAvailability = ({
    roomId,
    dates, 
    reservedBy, 
    totalPrice, 
    hotel,
    selectedRoomsNumber}) => async (dispatch) =>{
    
    dispatch(roomPending())
    try {
        const res = await updateRoomAvailability(roomId,
            dates, 
            reservedBy, 
            totalPrice, 
            hotel,
            selectedRoomsNumber)
        dispatch(fetchingRoomAvailabilitySuccess(res.data))
    }catch(err) {
        console.log(err)
        dispatch(roomsFail(err))
        return err;
    }
}



export const creatingRoom = (formData, hotelId)=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await createRoom(formData, hotelId);
        dispatch(fetchingRoomSuccess(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}



export const fetchingRooms = ()=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await getRooms();
        dispatch(fetchingRoomsData(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}


export const fetchingReservedRooms = ()=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await getReservedRooms();
        dispatch(fetchingReservedRoomsData(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}


export const fetchingReservedRoomsByUser = (id)=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await getReservedRoomsByUser(id);
        dispatch(fetchingReservedRoomsData(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}


export const fetchingReservedRoomsByHotelId = (id)=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await getReservedRoomsByHotel(id);
        dispatch(fetchingReservedRoomsData(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}


export const fetchingUnReservedRoomsByUser = (id, formData)=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await deleteReservedRooms(id, formData);
        dispatch(fetchingReservedRoomsData(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}



export const updatingRoomDetails = (roomId) => async (dispatch) => {
    dispatch(roomPending())
    try {
        const res = await updateRoom(roomId)
        dispatch(fetchingRoomData(res.data))
    }catch(e){
        console.log(e);
        dispatch(roomsFail())
        return e

    }
}



export const deletingRoom = (roomId)=>  async(dispatch) => {
    dispatch(roomPending())
    try{
        const res = await deleteRoom(roomId);
        dispatch(fetchingRoomSuccess(res.data));
    }catch(e){
        console.log(e);
        dispatch(roomsFail(e))
        return e
    }
}