import express from "express"
import { createTask, deleteTask, getMyTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post('/new', isAuthenticated, createTask)
router.get('/my', isAuthenticated, getMyTask)
router.route("/:id").put(updateTask).delete(deleteTask)


export default router

