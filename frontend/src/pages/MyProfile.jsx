import React, { useState } from 'react';
import { assets } from '../assets/assets';

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    image: assets.profile_pic,
    email: 'richardjameswap@gmail.com',
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond Circle, Church Road, London",
      
    },
    gender: "Male",
    birthday: "20 July, 2024"
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "line1" || name === "line2") {
      setUserData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto shadow-lg rounded-xl bg-white">
      <div className="flex items-center space-x-4">
        <img src={userData.image} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
        <div>
          {isEdit ? (
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className="text-xl font-bold border-b w-full"
            />
          ) : (
            <h2 className="text-xl font-bold">{userData.name}</h2>
          )}
          <p className="text-gray-500">{userData.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-700">
        <p>
          <strong>Phone:</strong>{" "}
          {isEdit ? (
            <input
              type="text"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              className="border-b w-full"
            />
          ) : (
            userData.phone
          )}
        </p>
        <p>
          <strong>Gender:</strong>{" "}
          {isEdit ? (
            <input
              type="text"
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="border-b w-full"
            />
          ) : (
            userData.gender
          )}
        </p>
        <p>
          <strong>Birthday:</strong>{" "}
          {isEdit ? (
            <input
              type="text"
              name="birthday"
              value={userData.birthday}
              onChange={handleChange}
              className="border-b w-full"
            />
          ) : (
            userData.birthday
          )}
        </p>
        <p>
          <strong>Address:</strong><br />
          {isEdit ? (
            <>
              <input
                type="text"
                name="line1"
                value={userData.address.line1}
                onChange={handleChange}
                className="border-b w-full mb-1"
              />
              
            </>
          ) : (
            `${userData.address.line1}}`
          )}
        </p>
      </div>

      <button
        onClick={() => setIsEdit(!isEdit)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {isEdit ? "Save Profile" : "Edit Profile"}
      </button>
    </div>
  );
};

export default MyProfile;
