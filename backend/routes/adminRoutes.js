import express from 'express'
import { addDoctor,loginAdmin } from '../controller/admincontroller.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter= express.Router()
adminRouter.post('/add-doctor',authAdmin,upload.single('img'),addDoctor)
adminRouter.post('/login',loginAdmin)

export default adminRouter 