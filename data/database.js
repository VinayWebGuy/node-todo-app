import mongoose from "mongoose"

export const connectDB = () => mongoose.connect(process.env.MONGO_URI, {
    dbName: "todo_app",
})
    .then(() => { console.log("Mongo DB Connected") })
    .catch((e) => { console.log(e) })