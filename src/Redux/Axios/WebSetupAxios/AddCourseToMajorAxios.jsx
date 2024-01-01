import axios from "axios"

export const getMajorBySeminarCode = (seminarCode) => {
    return (axios.get(`https://localhost:44367/api/Major/GetMajorBySeminarCode/${seminarCode}`))
}

export const getMajorByMajorName = (majorName) => {
    return (axios.get(`https://localhost:44367/api/Major/GetMajorByMajorName/${majorName}`));
}

export const addMajor = (majorToAdd) => {
    return (axios.post(`https://localhost:44367/api/Major/AddMajor`, majorToAdd));
}

export const addAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode = (majorCode, courseGrade, courseName, courseTeacherCode) => {
    return (axios.post(`https://localhost:44367/api/MajorCourses/AddAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode/${majorCode}/${courseGrade}/${courseName}/${courseTeacherCode}`));
}