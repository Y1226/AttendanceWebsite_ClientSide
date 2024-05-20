import axios from "axios"

export const GetCoursesByMajorCodeAndByCourseGradeAndByTeacherCode = (majorCode, grade, teacherCode) => {
    return (axios.get(`https://localhost:44367/api/Courses/GetCoursesByMajorCodeAndByCourseGradeAndByTeacherCode/${majorCode}/${grade}/${teacherCode}`))
}