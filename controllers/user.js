import { User } from "../models/user.js"
import ErrorHandler from "../middlewares/error.js"
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js"

export const getAllUsers = async (req, res) => { }

export const getMyProfile = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        })
    } catch (error) {
        next(error)
    }


}

export const updateUser = async (req, res) => { }

export const deleteUser = async (req, res) => { }

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        let user = await User.findOne({ email });
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })
        sendCookie(user, res, "Registered Successfully", 201)
    } catch (error) {
        next(error)
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({ email }).select("+password");
        if (!user) return next(new ErrorHandler("Invalid email or password", 404))
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return next(new ErrorHandler("Invalid email or password", 404))
        sendCookie(user, res, `Welcome back, ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}


export const logout = (req, res) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true
    }).json({
        success: true,
        message: "Logged out successfully"
    })
}