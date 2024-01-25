import axios from "axios"

export const GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode = (studentGrade, studentClassNumber, seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode/${studentGrade}/${studentClassNumber}/${seminarCode}`))
}