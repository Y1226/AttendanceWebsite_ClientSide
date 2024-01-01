import axios from "axios"

export const getUsersByUserIDAndMajorCode = (majorCode) => {
    return (axios.get(`https://localhost:44367/api/User/GetUsersByUserIDAndMajorCode/${majorCode}`))
}

export const getAllStudentsByStudentMajorCode = (majorCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetAllStudentsByStudentMajorCode/${majorCode}`))
}

export const addingAttendanceToTheCourse = (object) => {
    return (axios.post('https://localhost:44367/api/AttendencePerCourse/AddingAttendanceToTheCourse', object))
}