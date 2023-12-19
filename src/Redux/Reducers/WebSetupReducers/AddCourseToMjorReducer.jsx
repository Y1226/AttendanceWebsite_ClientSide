import produce from 'immer'

const AddCourseToMajorState = {
    MajorList: [],
    CoursesForMajorsAccordingToYearbooks: []
}

export const AddCourseToMajorReducer = produce(
    (s,a) => {
        switch (a.type) {
            case 'Fill_Courses_For_Majors':
                s.CoursesForMajorsAccordingToYearbooks= a.payload;
                break;
            case 'Fill_Courses_For_Majors_By_Index':
                s.CoursesForMajorsAccordingToYearbooks[a.payload.index] = a.payload.value;
                break;
            default:
                break;
        }
    },
    AddCourseToMajorState
)

export default AddCourseToMajorReducer