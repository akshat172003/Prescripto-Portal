import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify'



export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken]= useState(localStorage.getItem('aToken')? localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const backendUrl=import.meta.env.VITE_BACKEND_URL
    const[appointments,setAppointments]=useState([])
    const [dashData, setDashData] = useState(false)

    const getAllDoctors=async()=>{
        try {

            const {data}=  await axios.post(backendUrl+'/api/admin/all-doctors',{}, {headers:{atoken: aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability=async(docId)=>{
        try {
           const {data}= await axios.post(backendUrl+'/api/admin/change-availability',{docId},{headers:{atoken: aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
                getDashboardData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    const getAllAppointments = async () => {
        try {
            
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', {
                headers: { atoken: aToken }
            });
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            
            toast.error('Failed to fetch appointments');
            
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/cancel-appointment',
                { appointmentId },
                { headers: { atoken: aToken } }
            );

            if (data.success) {
                toast.success('Appointment cancelled successfully');
                getAllAppointments();
                getDashboardData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to cancel appointment');
        }
    };

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard-data', {
                headers: { atoken: aToken }
            });
            if (data.success) {
                const normalized = data.data || data.dashboardData || {};
                const withLatest = {
                    ...normalized,
                    latestBookings: normalized.latestBookings || normalized.latestAppointments || []
                }
                setDashData(withLatest);
                console.log(withLatest);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Failed to fetch dashboard data');
        }
    };

    // Auto-refresh dashboard and appointments so user-side cancellations reflect here
    useEffect(() => {
        if (!aToken) return;
        getDashboardData();
        getAllAppointments();
        const intervalId = setInterval(() => {
            getDashboardData();
            getAllAppointments();
        }, 10000);
        return () => clearInterval(intervalId);
    }, [aToken]);

    const value = {
        aToken,setAToken,backendUrl,doctors,getAllDoctors,changeAvailability,getAllAppointments, appointments, setAppointments, cancelAppointment, dashData, getDashboardData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
    
}

export default AdminContextProvider