import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/UserModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/DoctorModel.js'
import appointmentModel from '../models/appointmentModel.js' // ADD THIS IMPORT
import Razorpay from 'razorpay'

//API to register user
const registerUser = async(req,res) => {
    try {
        const{name,email,password} = req.body

        if(!name || !password || !email){
            return res.json({success:false,message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter a valid Email"})
        }
        if(password.length < 8) {
            return res.json({success:false,message:"Enter a strong password"})
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET )

        res.json({success:true,token})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API for user Login
const loginUser = async(req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false,message:"user does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:"Invalid Credential"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to get user profile data
const getProfile = async(req,res) => {
    try {
        const userId = req.user.id;
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true,userData})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//API to update user profile
const updateProfile = async(req,res) => {
    try {
        const userId = req.user.id;
        const {name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if(!name || !phone || !dob || !gender){
            return res.json({success:false,message:"data missing"})
        }

        await userModel.findByIdAndUpdate(userId, {name,phone,address:JSON.parse(address),dob,gender})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
            const imageUrl = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true,message:"Profile Updated"})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// API to get user appointments
const getUserAppointments = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log('Fetching appointments for user:', userId); // Debug log
        
        const appointments = await appointmentModel.find({ userId }).sort({ date: -1 });
        
        console.log('Found appointments:', appointments.length); // Debug log
        
        res.json({ 
            success: true, 
            appointments
        });
        
    } catch (error) {
        console.log('Get appointments error:', error);
        res.json({ 
            success: false, 
            message: error.message 
        });
    }
}

// API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const userId = req.user.id;
        const { appointmentId } = req.body;
        
        console.log('Cancelling appointment:', { userId, appointmentId }); // Debug log
        
        const appointmentData = await appointmentModel.findById(appointmentId);
        
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        
        // Verify that this appointment belongs to the user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized" });
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
//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const userId = req.user.id; // Get userId from auth middleware
        const { docId, slotDate, slotTime } = req.body;
        
        console.log('Booking request:', { userId, docId, slotDate, slotTime }); // Debug log
        
        const docData = await doctorModel.findById(docId).select('-password');
        
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" });
        }
        
        // Initialize slotsBooked if it doesn't exist
        let slots_booked = docData.slotsBooked || {};
        
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password');
        
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Create a clean copy of docData without slotsBooked
        const cleanDocData = { ...docData._doc };
        delete cleanDocData.slotsBooked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData: cleanDocData,
            amount: docData.fees || 0, // Fallback to 0 if fees is undefined
            slotDate,
            slotTime,
            date: Date.now()
        }

        console.log('Creating appointment with data:', appointmentData); // Debug log

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots booked in doctor data
        await doctorModel.findByIdAndUpdate(docId, { slotsBooked: slots_booked });
        
        res.json({ success: true, message: "Appointment booked successfully" });    

    } catch (error) {
        console.log('Booking error:', error);
        res.json({ success: false, message: error.message });
    }
}

const razorpayInstance = new Razorpay({
    key_id: '',
    key_secret: ''
});
//api to make payment
const paymentRazorpay = async (req, res) => {}

export { registerUser, loginUser, getProfile, updateProfile, getUserAppointments, cancelAppointment, bookAppointment };