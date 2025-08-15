import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointment = () => {
  const { backendUrl, token, doctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's appointments
  const getUserAppointments = async () => {
    try {
      if (!token) {
        toast.error('Please login to view appointments');
        return;
      }

      const { data } = await axios.get(backendUrl + '/api/user/appointments', {
        headers: { token }
      });

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Appointment cancelled successfully');
        getUserAppointments(); // Refresh appointments
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to cancel appointment');
    }
  };

  // Format date and time
  const formatDateTime = (slotDate, slotTime) => {
    // Convert "15_12_2024" to readable format
    const [day, month, year] = slotDate.split('_');
    const date = new Date(year, month - 1, day);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return `${formattedDate} | ${slotTime}`;
  };

  // Get doctor info by ID
  const getDoctorInfo = (docId) => {
    return doctors.find(doctor => doctor._id === docId);
  };

  const appointmentRazorpay=async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to process payment');
    }
  }

  useEffect(() => {
    if (token && doctors.length > 0) {
      getUserAppointments();
    }
  }, [token, doctors]);

  if (loading) {
    return (
      <div className="p-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>
        <p>Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appointment, index) => {
            const doctorInfo = getDoctorInfo(appointment.docId);
            
            if (!doctorInfo) {
              return null; // Skip if doctor info not found
            }

            return (
              <div
                key={appointment._id || index}
                className="border w-full rounded-lg p-4 shadow-sm flex items-start space-x-4 bg-white"
              >
                <img
                  src={doctorInfo.image}
                  alt={doctorInfo.name}
                  className="w-20 h-20 bg-blue-50 object-cover rounded"
                />

                <div className="flex-1 space-y-1">
                  <p className="text-lg font-bold">{doctorInfo.name}</p>
                  <p className="text-sm text-gray-600">{doctorInfo.specialty}</p>
                  <p className="text-sm text-gray-700 font-medium">Address:</p>
                  <p className="text-sm text-gray-600">{doctorInfo.address.line1}</p>
                  <p className="text-sm text-gray-600">{doctorInfo.address.line2}</p>
                  <p className="text-sm text-primary mt-2">
                    <span className="font-semibold">Date and Time:</span>{' '}
                    {formatDateTime(appointment.slotDate, appointment.slotTime)}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Status:</span>{' '}
                    <span className={`px-2 py-1 rounded text-xs ${
                      appointment.cancelled 
                        ? 'bg-red-100 text-red-800' 
                        : appointment.isCompleted 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {appointment.cancelled 
                        ? 'Cancelled' 
                        : appointment.isCompleted 
                        ? 'Completed' 
                        : 'Scheduled'}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col gap-2 ml-auto">
                  {!appointment.cancelled && !appointment.isCompleted && (
                    <>
                      <button onClick={() => appointmentRazorpay(appointment._id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Pay Online
                      </button>
                      <button 
                        onClick={() => cancelAppointment(appointment._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyAppointment;