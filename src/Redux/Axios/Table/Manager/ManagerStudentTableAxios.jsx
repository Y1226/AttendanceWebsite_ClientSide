import axios from "axios"

export const GetFullStudentsDataBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetFullStudentsDataBySeminarCode/${seminarCode}`));
}