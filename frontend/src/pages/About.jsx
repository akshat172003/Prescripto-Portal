import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='flex items-center justify-center my-8 gap-2 font-medium text-center text-2xl text-gray-500 '>
        <p>ABOUT</p>
        <p className='text-gray-700 font-medium'>US</p>
      </div>
      <div className='my-10 flex items-start md:flex-row gap-12 '>
        <div className='w-full md:max-w-[360px] '><img  src={assets.about_image} alt="About Us" /></div>
        <div className='flex flex-col justify-center md:w-2/4 text-sm gap-6 text-gray-600 '>
        <div>
          Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
        </div>
        <div>
          Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
        </div>
        <div>
          <p className='text-gray-800 font-bold'>Our Vision</p>
          <div className='mt-4'>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it
          </div>
          </div>
        </div>
      </div>

      <div className='my-4'>
        <p>WHY <span className='font-bold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-6 text-gray-600 my-4'>
        <div className='border px-10 md-px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'>
          <b>Efficiency:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md-px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'>
          <b>Convenience:</b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md-px-16 py-8 md:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300'>
          <b>Personalization:</b>
          <p>Tailored recommendations and reminders to help you stay on top of your health.</p> 
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default About
