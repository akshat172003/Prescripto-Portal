import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment } from '../controller/UserController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-Profile', authUser, getProfile)
userRouter.post('/update-Profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser, getUserAppointments)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

export default userRouter