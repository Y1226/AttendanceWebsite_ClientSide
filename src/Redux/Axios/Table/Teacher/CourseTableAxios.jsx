import axios from "axios"

export const GetCoursesByMajorCodeAndCourseGrade = (majorCode, grade) => {
    return (axios.get(`https://localhost:44367/api/Courses/GetCoursesByMajorCodeAndCourseGrade/${majorCode}/${grade}`))
}