export const FillCoursesForMajors = (value) => {
    return { type: 'Fill_Courses_For_Majors', payload: value }
}

export const FillCoursesForMajorsByIndex = (index, value) => {
    return { type: 'Fill_Courses_For_Majors_By_Index', payload: {index: index, value: value}}
}

