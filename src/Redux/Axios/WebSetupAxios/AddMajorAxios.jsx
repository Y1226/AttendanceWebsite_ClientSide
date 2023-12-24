import axios from "axios"

export const getAllMajors = () => {
    return (axios.get('https://localhost:44367/api/Major/GetAllMajors'));
}

export const getFullStaffDataBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Staff/GetFullStaffDataBySeminarCode/${seminarCode}`));
}