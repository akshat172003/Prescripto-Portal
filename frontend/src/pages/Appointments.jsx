import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'                                                                 

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, CurrencySymbol } = useContext(AppContext)
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlot, setDocSlot] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')


  const fetchDocInfo = async() => {
    const docInfo=doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async() => {
    setDocSlot([])

    let today = new Date()
    for(let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0) // 9 PM

      if(today.getDay() === currentDate.getDay()) {
        currentDate.setHours(currentDate.getHours()>10? currentDate.getHours() +1 : 10) // Start at 10 AM
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0) // Round to nearest 30 minutes
      }
      else{
        currentDate.setHours(10, 0, 0, 0) // Start at 10 AM
        currentDate.setMinutes(0, 0, 0, 0) // Round to nearest 30 minutes
      }

      let timeSlots= []

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30) // Increment by 30 minutes
      }
      setDocSlot(prevSlots => [...prevSlots, { timeSlots }])
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  useEffect(() => {
    console.log(docSlot)
    
  },[docSlot])

  return docInfo &&(
    <div>
    <div className='flex flex-col sm:flex-row gap-4 w-full sm:mx-w-3xl mx-auto my-8'>
      <div >
        <img className='bg-primary w-full sm:mx-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
      </div>
      <div className='flex-1 border border-gray-400 bg-white rounded-lg p-8 py-7 mx-2 flex flex-col gap-4'>
        <h2 className='flex items-center text-2xl font-medium text-gray-900 gap-2'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="Verified" /></h2>
      <div className='flex items-center gap-2 text-medium text-gray-600 mt-1 '>
        <p>{docInfo.degree} - {docInfo.specialty}</p>
        <button className='border border-gray-400 rounded-full px-2 py-1'>{docInfo.rating} / 5</button>
      </div>
      <div>
        <p className='flex items-center gap-1'>About <img className='w-4' src={assets.info_icon} alt="" /></p>
        <p className='text-gray-600 text-sm'>{docInfo.about}</p>
        <p className='mt-4 text-gray-500'>Appointment Fee: <span className='text-gray-600 font-medium'>{CurrencySymbol}{docInfo.fees}</span></p>
      </div>
      </div>
      
    </div>
    {/*----Booking Slots */}
      <div className='sm:ml-72 sm:pl:4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
    

            <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot.map((item, index) => (
              <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-700'}`} key={index}>
                <p>{item.timeSlots[0] && daysofWeek[item.timeSlots[0].dateTime.getDay()]}</p>
                <p>{item.timeSlots[0] && item.timeSlots[0].dateTime.getDate()}</p>

              </div>
            ))
          }
          
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length && docSlot[slotIndex].timeSlots.map((item, index) => (
          
            <div key={index}>
              <p onClick={() => setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'border border-gray-700'}`}>
              {item.time.toLowerCase()}
              </p>
            </div>
          
        ))}
        </div>
        <button className='bg-primary text-white font-light py-2 px-4 rounded-full mt-4'>Book an Appointment</button>
      </div>
      {/*<RelatedDoctors doctorId={docId} specialty={docInfo.specialty} />*/}
    </div>


  )

}

export default Appointments
