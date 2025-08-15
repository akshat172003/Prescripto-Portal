import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments ,cancelAppointment} = useContext(AdminContext);
  const { calculateAge, formatDateTime, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getAllAppointments();
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl mx-auto p-5'>
      <h2 className='text-3xl font-bold mb-5'>All Appointments</h2>
      <div className='bg-white border rounded-xl shadow-sm overflow-hidden'>
        {/* Header Row */}
        <div className='grid grid-cols-[32px_2fr_1fr_2fr_2fr_1fr_1fr] bg-gray-100 px-4 py-3 font-semibold text-gray-700'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Appointments */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className='grid grid-cols-[32px_2fr_1fr_2fr_2fr_1fr_1fr] px-4 py-4 items-center border-t hover:bg-gray-50 transition'
          >
            <p>{index + 1}</p>

            {/* Patient */}
            <div className='flex items-center gap-3'>
              <img
                src={item.userData.image}
                alt={item.userData.name}
                className='w-10 h-10 rounded-full object-cover'
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p>{calculateAge(item.userData.dob)}</p>

            {/* Date & Time */}
            <p>{formatDateTime(item.slotDate, item.slotTime)}</p>

            {/* Doctor */}
            <div className='flex items-center gap-3'>
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className='w-10 h-10 rounded-full object-cover'
              />
              <p>{item.docData.name}</p>
            </div>

            {/* Fees */}
            <p className='text-green-600 font-medium'>
              {currency}
              {item.amount}
            </p>

            {/* Actions */}
            <div>
              <button onClick={() => cancelAppointment(item._id)} className='text-red-500 border border-red-300 rounded px-3 py-1 hover:bg-red-50'>
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
