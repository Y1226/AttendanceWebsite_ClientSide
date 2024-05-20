import axios from "axios"

export const getStaffMemberByStaffIDAndSeminarCode = (userID, seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Staff/getStaffMemberByStaffIDAndSeminarCode/${userID}/${seminarCode}`))
}

export const getMajorsBySeminarAndTeacherCode = (seminarCode, staffCode) => {
    return (axios.get(`https://localhost:44367/api/Major/GetMajorsBySeminarAndTeacherCode/${seminarCode}/${staffCode}`))
}