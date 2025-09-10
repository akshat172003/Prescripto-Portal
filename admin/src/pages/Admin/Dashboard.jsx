import React from 'react'
import {  useState, useEffect,useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets'



const Dashboard = () => {
  const {aToken, dashData, appointments, getAllDoctors, getAllAppointments, getDashboardData} = useContext(AdminContext);
  const { currency, formatDateTime } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getAllDoctors();
      getAllAppointments();
      getDashboardData();
    }
  }, [aToken]);

  return (
    <div className='p-4 md:p-6 space-y-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4'>
        <div className='flex items-center gap-3 p-4 bg-white border rounded-lg'>
          <img src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-sm text-gray-500'>Total Doctors</p>
            <p className='text-xl font-semibold'>{dashData?.totalDoctors ?? 0}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-4 bg-white border rounded-lg'>
          <img src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-sm text-gray-500'>Total Appointments</p>
            <p className='text-xl font-semibold'>{dashData?.totalAppointments ?? 0}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-4 bg-white border rounded-lg'>
          <img src={assets.patients_icon} alt="" />
          <div>
            <p className='text-sm text-gray-500'>Total Patients</p>
            <p className='text-xl font-semibold'>{dashData?.totalPatients ?? 0}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-4 bg-white border rounded-lg'>
          <img src={assets.earning_icon} alt="" />
          <div>
            <p className='text-sm text-gray-500'>Paid Appointments</p>
            <p className='text-xl font-semibold'>{dashData?.paidCount ?? 0}</p>
          </div>
        </div>
        <div className='flex items-center gap-3 p-4 bg-white border rounded-lg'>
          <img src={assets.list_icon} alt="" />
          <div>
            <p className='text-sm text-gray-500'>Unpaid Appointments</p>
            <p className='text-xl font-semibold'>{dashData?.unpaidCount ?? 0}</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        <div className='lg:col-span-2 bg-white border rounded-lg p-4'>
          <div className='flex items-center gap-2 mb-3'>
            <img src={assets.list_icon} alt="" />
            <p className='font-semibold'>Latest Bookings</p>
          </div>
          <div>
            {appointments && appointments.length > 0 ? (
              <ul className='space-y-2'>
                {appointments.filter(i => !i.cancelled).slice(0,3).map((item) => (
                  <li key={item._id} className='flex items-center justify-between p-3 border rounded'>
                    <div className='flex flex-col'>
                      <span className='font-medium'>{item.userData?.name || 'Unknown'}</span>
                      <span className='text-sm text-gray-600'>{formatDateTime(item.slotDate, item.slotTime)}</span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <span className='text-sm font-semibold'>{currency}{item.amount}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${item.payment ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.payment ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-500'>No latest bookings available</p>
            )}
          </div>
        </div>
        <div className='bg-white border rounded-lg p-4'>
          <p className='font-semibold mb-2'>Revenue</p>
          <p className='text-3xl font-bold'>{currency}{dashData?.revenue ?? 0}</p>
          <p className='text-sm text-gray-500 mt-1'>Sum of paid appointment fees</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
