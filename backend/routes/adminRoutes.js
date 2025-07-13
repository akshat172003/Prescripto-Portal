import express from 'express'
import { addDoctor,allDoctors,loginAdmin } from '../controller/admincontroller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'
import { changeAvailability } from '../controller/doctorController.js'

const adminRouter= express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('img'),addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailability)

export default adminRouter 