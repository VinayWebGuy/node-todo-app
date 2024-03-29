import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false
    },
    createdAt: {
        type: Date,
        dafault: Date.now()
    }
})
export const User = mongoose.model("User", userSchema)


