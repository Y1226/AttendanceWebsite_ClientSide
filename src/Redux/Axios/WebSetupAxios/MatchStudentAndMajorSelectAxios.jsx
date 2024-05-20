import axios from "axios"

export const GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode = (studentGrade, studentClassNumber, seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode/${studentGrade}/${studentClassNumber}/${seminarCode}`))
}

export const GetTheMaxNumberOfClassesInSeminarByGradeAndSeminarCode = (grade, seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetTheMaxNumberOfClassesInSeminarByGradeAndSeminarCode/${grade}/${seminarCode}`))
}

export const GetTheDataOfTheStudentsMajorsBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Students/GetTheDataOfTheStudentsMajorsBySeminarCode/${seminarCode}`))
}

export const MatchingStudentToMajors = (studentId, studentFirstMajorCode, studentSecondMajorCode, seminarCode) => {
    return (axios.put(`https://localhost:44367/api/Students/MatchingStudentToMajors/${studentId}/${studentFirstMajorCode}/${studentSecondMajorCode}/${seminarCode}`))
}