import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">My Appointments</h2>

      <div className="space-y-4">
        {doctors.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="border w-full rounded-lg p-4 shadow-sm flex items-start space-x-4 bg-white"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-50 h-20 bg-blue-50 object-cover"
            />

            <div className="flex-1 space-y-1">
              <p className="text-lg font-bold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.specialty}</p>
              <p className="text-sm text-gray-700 font-medium">Address:</p>
              <p className="text-sm text-gray-600">{item.address.line1}</p>
              <p className="text-sm text-gray-600">{item.address.line2}</p>
              <p className="text-sm text-primary mt-2">
                <span className="font-semibold">Date and Time:</span> 25 July, 2024 | 8:30 PM
              </p>
            </div>

            <div className="flex flex-col gap-2 ml-auto">
              <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                Pay Online
              </button>
              <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
