import axios from "axios"

export const getAllSeminars = () => {
    return (axios.get('https://localhost:44367/api/Seminar/GetAllSeminars'))
} 

export const loginToTheSystem = (password, seminarCode, identificationNumber) => {
    return (axios.get(`https://localhost:44367/api/Login/LoginToTheSystem/${password}/${seminarCode}/${identificationNumber}`));
}

export const getPasswordLottery = () => {
    return (axios.get('https://localhost:44367/api/Seminar/GetPasswordLottery'));
}

export const addSeminar = (newSeminar) => {
    return (axios.post('https://localhost:44367/api/Seminar/AddSeminar', newSeminar));
}