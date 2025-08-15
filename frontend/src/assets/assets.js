import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import logo from './logo.svg'
import profile_pic from './profile_pic.png'
import dropdown_icon from './dropdown_icon.svg'
import group_profiles from './group_profiles.png'
import arrow_icon from './arrow_icon.svg'
import header_image from './header_img.png'
import General_Physician from './General_physician.svg'
import Dermatologist from './Dermatologist.svg'
import Neurologist from './Neurologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import Pediatricians from './Pediatricians.svg'
import Gynecologist from './Gynecologist.svg'
import doc1 from './doc1.png'   
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'   
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png' 
import appointment_img from './appointment_img.png'    
import verified_icon from './verified_icon.svg'  
import info_icon from './info_icon.svg'
import about_image from './about_image.png'
import contact_image from './contact_image.png'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import upload_icon from './upload_icon.png'

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon,
    logo,
    profile_pic,
    dropdown_icon,
    group_profiles,
    arrow_icon,
    header_image,
    General_Physician,
    Dermatologist,
    Neurologist,
    Gastroenterologist,
    Pediatricians,
    Gynecologist,
    doc1,
    doc2,
    doc3,
    doc4,
    doc5,
    doc6,
    doc7,
    doc8,
    doc9,
    doc10,
    appointment_img,
    verified_icon,
    info_icon,
    about_image,
    contact_image,
    menu_icon,
    cross_icon,
    upload_icon

}

export const SpecialityData = [
    {
        Specialty: 'General Physician',
        image: General_Physician
    },
    {
        Specialty: 'Gynecologist',
        image: Gynecologist
    },
    {
        Specialty: 'Dermatologist',
        image: Dermatologist
    },
    {
        Specialty: 'Pediatrician',
        image: Pediatricians
    },
    {
        Specialty: 'Neurologist',
        image: Neurologist
    },
    {
        Specialty: 'Gastroenterologist',
        image: Gastroenterologist
    }
]

export const doctors = [
    {
        id:'doc1',
        name: 'Dr. John Doe',
        degree: 'MBBS, MD',
        image: doc1,
        specialty: 'General Physician',
        location: 'New York, NY',
        rating: 4.5,
        about: 'Dr. John Doe is a highly experienced general physician with over 10 years of practice. He specializes in family medicine and preventive care.',
        fees: 100,
        address:{
            line1: '123 Main St',
            line2: 'Suite 100',
            city: 'New York',
        }
    },
    {
        id:'doc2',
        name: 'Dr. Jane Smith',
        degree: 'MBBS, MD',
        image: doc2,
        specialty: 'Gynecologist',
        location: 'Los Angeles, CA',
        rating: 4.7,
        about: 'Dr. Jane Smith is a board-certified gynecologist with a focus on women\'s health and reproductive medicine.',
        fees: 120,
        address:{
            line1: '456 Elm St',
            line2: 'Suite 200',
            city: 'Los Angeles',
        }
    },
    {
        id:'doc3',
        name: 'Dr. Emily Johnson',
        degree: 'MBBS, MD',
        image: doc3,
        specialty: 'Dermatologist',
        location: 'Chicago, IL',
        rating: 4.6,
        about: 'Dr. Emily Johnson specializes in skin conditions and cosmetic dermatology with over 8 years of experience.',
        fees: 110,
        address:{
            line1: '789 Oak St',
            line2: 'Suite 300',
            city: 'Chicago',
        }
    },
    {
        id:'doc4',
        name: 'Dr. Michael Brown',
        degree: 'MBBS, MD',
        image: doc4,
        specialty: 'Pediatrician',
        location: 'Houston, TX',
        rating: 4.8,
        about: 'Dr. Michael Brown is a dedicated pediatrician with a passion for child health and development.',
        fees: 90,
        address:{
            line1: '321 Pine St',
            line2: 'Suite 400',
            city: 'Houston',
        }
    },
    {
        id:'doc5',
        name: 'Dr. Sarah Wilson',
        degree: 'MBBS, MD',
        image: doc5,
        specialty: 'Neurologist',
        location: 'Phoenix, AZ',
        rating: 4.9,
        about: 'Dr. Sarah Wilson is a renowned neurologist specializing in brain and nervous system disorders.',
        fees: 150,
        address:{
            line1: '654 Maple St',
            line2: 'Suite 500',
            city: 'Phoenix',
        }
    },
    {
        id:'doc6',
        name: 'Dr. David Lee',
        degree: 'MBBS, MD',
        image: doc6,
        specialty: 'Gastroenterologist',
        location: 'Philadelphia, PA',
        rating: 4.4,
        about: 'Dr. David Lee specializes in digestive health and gastrointestinal disorders.',
        fees: 130,
        address:{
            line1: '987 Cedar St',
            line2: 'Suite 600',
            city: 'Philadelphia',
        }
    },
    {
        id:'doc7',
        name: 'Dr. Laura Martinez',
        degree: 'MBBS, MD',
        image: doc7,
        specialty: 'General Physician',
        location: 'San Antonio, TX',
        rating: 4.3,
        about: 'Dr. Laura Martinez is a compassionate general physician with a focus on holistic patient care.',
        fees: 95,
        address:{
            line1: '123 Birch St',
            line2: 'Suite 700',
            city: 'San Antonio',
        }
    },
    {
        id:'doc8',
        name: 'Dr. James Taylor',
        degree: 'MBBS, MD',
        image: doc8,
        specialty: 'Gynecologist',
        location: 'San Diego, CA',
        rating: 4.6,
        about: 'Dr. James Taylor is a skilled gynecologist with expertise in high-risk pregnancies.',
        fees: 125,
        address:{
            line1: '456 Spruce St',
            line2: 'Suite 800',
            city: 'San Diego',
        }
    },
    {
        id:'doc9',
        name: 'Dr. Karen White',
        degree: 'MBBS, MD',
        image: doc9,
        specialty: 'Dermatologist',
        location: 'Delhi, India',
        rating: 4.5,
        about: 'Dr. Karen White is a leading dermatologist with a focus on skin cancer and cosmetic dermatology.',
        fees: 140,
        address:{
            line1: '321 Willow St',
            line2: 'Suite 900',
            city: 'Delhi',
        }
    },
    {
        id:'doc10',
        name: 'Dr. Robert Brown',
        degree: 'MBBS, MD',
        image: doc10,
        specialty: 'Orthopedic Surgeon',
        location: 'Mumbai, India',
        rating: 4.7,
        about: 'Dr. Robert Brown is a highly skilled orthopedic surgeon specializing in joint replacement and sports injuries.',
        fees: 160,
        address:{
            line1: '654 Palm St',
            line2: 'Suite 1000',
            city: 'Mumbai',
        }
    }
]
