import React from 'react'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
      <div>
        <div className='flex items-center justify-center my-8 gap-2 font-medium text-center text-2xl text-gray-500 '>
                <p>CONTACT</p>
                <p className='text-gray-700 font-medium'>US</p>
              </div>
              <div className='my-10 flex items-start md:flex-row gap-12 '>
                <div className='w-full md:max-w-[360px] '><img  src={assets.contact_image} alt="About Us" /></div>
                <div className='flex flex-col justify-center md:w-2/4 text-sm gap-6 text-gray-600 '>
                <div className='font-bold'>
                  OUR OFFICE
                </div>
                <div>
                  54709 Willms Station <br />Suite 350, Washington, USA
                </div>
                <div>
                  <p>Tel: (415) 555‑0132</p>
                  <p>Email: greatstackdev@gmail.com</p>
                </div>
                <div className='font-bold'>
                 Careers at PRESCRIPTO
                </div>
                <div>
                  Learn more about our teams and job openings.
                </div>
                
                  <button className='border border-black px-8 py-6 text-sm hover:bg-black hover:text-white'>Explore Jobs</button>
                
                </div>
              </div>
      </div>
    </div>
  )
}

export default Contact
