export const FillStudentData = (value) => {
    return {type: 'Fill-Student-Data', payload: value}
}

export const FillListOfStudentsAndTheirMajors = (value) => {
    return { type: 'Fill_List_Of_Students_And_Their_Majors', payload: value}
}

export const UpdateStudentsMajorInTheState = (e, key, valueKey, studentIndex, isFirstMajor) => {
    return { type: 'Update_Students_Major_In_The_State', payload: {code: e.code, key: key, valueKey: valueKey, studentIndex: studentIndex, isFirstMajor:isFirstMajor}}
}