import axios from "axios"

export const getStaffMemberByStaffID = (userID) => {
    return (axios.get(`https://localhost:44367/api/Staff/GetStaffMemberByStaffID/${userID}`))
}

export const getMajorsBySeminarAndTeacherCode = (seminarCode, staffCode) => {
    return (axios.get(`https://localhost:44367/api/Major/GetMajorsBySeminarAndTeacherCode/${seminarCode}/${staffCode}`))
}