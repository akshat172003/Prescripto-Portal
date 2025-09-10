import { createContext } from 'react';

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currency='₹'

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        return age
    }
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

    const value = {
        calculateAge,
        formatDateTime,
        currency
    }
    
    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
    
}

export default AppContextProvider