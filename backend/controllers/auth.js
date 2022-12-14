const {User} = require ("../models/User.js");
const bcrypt = require("bcrypt");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");



const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
        ...req.body,
        password: hash,
        });

        await newUser.save();
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};


const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // if (!user) return next(createError(404, "User not found!"));
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password
        );

        if (!isPasswordCorrect) return res.status(404).json({ message: "Wrong Password" });
        // return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
        );

        const { password, ...otherDetails } = user._doc;

        return res
        .cookie("access_token", token, {
            httpOnly: false,
            sameSite: 'none',
            secure: true,
            // httpOnly: true,
        })
        .status(200)
        .json({ details: { ...otherDetails }, token });

    } catch (error) {
        console.log(error);
        res.json({ status: "error", message: error.message });
        
    }
};



module.exports = {
    register,
    login
}