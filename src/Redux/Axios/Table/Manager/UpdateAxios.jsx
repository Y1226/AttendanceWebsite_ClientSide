import axios from "axios"

export const GetSeminarGradeLastUpdatedBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Seminar/GetSeminarGradeLastUpdatedBySeminarCode/${seminarCode}`))
}

export const UpStudentGradeBySeminarCode = (seminarCode) => {
    return (axios.put(`https://localhost:44367/api/Students/UpStudentGradeBySeminarCode/${seminarCode}`))
}

export const UpdateSeminarGradeLastUpdatedBySeminarCode = (seminarCode) => {
    return (axios.put(`https://localhost:44367/api/Seminar/UpdateSeminarGradeLastUpdatedBySeminarCode/${seminarCode}`))
}