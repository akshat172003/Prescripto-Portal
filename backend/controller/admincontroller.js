import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/DoctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/AppointmentModel.js"

//API for adding doctors
const addDoctor = async(req,res)=>{
    try {
        const { name,email,password,specialty,degree,experience, about, fees, address}= req.body
        const imageFile=req.file

        //checking for all data to add doctor
        if(!name || !email || !password || !specialty || !degree || !experience || !about || !fees || !address){
            return res.json({success:false,message:"Missing Details"})
        }

        //VALIDATING EMAIL FORMAT
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid Email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"Please enter a dtrong Password"})
        }
        //hashing Doctors password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        //uplaod img to cloudinary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl=imageUpload.secure_url

        const doctorData={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            specialty,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor=new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message :"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message :error.message})
    }

}

//API FOR ADMIN LOGIN
const loginAdmin = async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:'true',token})

        } else{
            res.json({success:'false',message: "Invalid Credential"})
        }
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message: error.message})
    }
}

//API to get all doctors list
const allDoctors= async (req,res)=>{
    try {

        const doctors= await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
//Api to get all appointment list
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({ success: true, appointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to cancel appointment
const appointmentCancel = async (req, res) => {
    try {
        
        const { appointmentId } = req.body;

        console.log('Cancelling appointment:', { appointmentId }); // Debug log

        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        
        
        // Check if appointment is already cancelled or completed
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment is already cancelled" });
        }
        
        if (appointmentData.isCompleted) {
            return res.json({ success: false, message: "Cannot cancel completed appointment" });
        }
        
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
        
        // Remove the slot from doctor's booked slots
        const docData = await doctorModel.findById(appointmentData.docId);
        let slots_booked = docData.slotsBooked || {};
        
        if (slots_booked[appointmentData.slotDate]) {
            slots_booked[appointmentData.slotDate] = slots_booked[appointmentData.slotDate].filter(
                slot => slot !== appointmentData.slotTime
            );
            
            // If no slots left for this date, remove the date key
            if (slots_booked[appointmentData.slotDate].length === 0) {
                delete slots_booked[appointmentData.slotDate];
            }
        }
        
        await doctorModel.findByIdAndUpdate(appointmentData.docId, { slotsBooked: slots_booked });
        
        res.json({ success: true, message: "Appointment cancelled successfully" });
        
    } catch (error) {
        console.log('Cancel appointment error:', error);
        res.json({ success: false, message: error.message });
    }
}
//API to get dashboard data from admin
const adminDashboardData = async (req, res) => {
    try {
        const totalDoctors = await doctorModel.find({});
        const totalAppointments = await appointmentModel.find({});
        const totalPatients = await appointmentModel.find({});

        const dashboardData = {
            totalDoctors: totalDoctors.length,
            totalAppointments: totalAppointments.length,
            totalPatients: totalPatients.length,
            latestAppointments: totalAppointments.reverse().slice(0,5) 
        };

        res.json({
            success: true,
            dashboardData
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export {addDoctor,loginAdmin,allDoctors, appointmentsAdmin, appointmentCancel, adminDashboardData}