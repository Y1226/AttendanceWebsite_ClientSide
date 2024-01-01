import axios from "axios"

export const GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/AttendencePerCourse/GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode/${seminarCode}`))
}