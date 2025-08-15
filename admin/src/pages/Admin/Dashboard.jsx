import React from 'react'
import {  useState, useEffect,useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets'



const Dashboard = () => {
  const {aToken, dashData, getAllDoctors, getAllAppointments} = useContext(AdminContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div>
      <div>
        <div>
          <img src={assets.doctor_icon} alt="" />
          <div>
            <p>Total Doctors: {dashData.totalDoctors}</p>
          </div>
        </div>
        <div>
          <img src={assets.appointments_icon} alt="" />
          <div>
            <p>Total Appointments: {dashData.totalAppointments}</p>
          </div>
        </div>
        <div>
          <img src={assets.patients_icon} alt="" />
          <div>
            <p>Total Patients: {dashData.totalPatients}</p>
          </div>
        </div>
      </div>
      <div>
        <div>
          <img src={assets.list_icon} alt="" />
          <p>Latest Bookings</p>
        </div>
        <div>
          {dashData.latestBookings && dashData.latestBookings.length > 0 ? (
            <ul>
              {dashData.latestBookings.map((booking) => (
                <li key={booking.id}>
                  {booking.patientName} - {booking.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No latest bookings available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
