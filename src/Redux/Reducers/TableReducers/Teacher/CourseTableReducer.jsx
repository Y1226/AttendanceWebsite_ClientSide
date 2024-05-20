import produce from 'immer'

const CourseTableState = {
    CourseList: [],
    CurrentCourse: {}
}

export const CourseTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Course-Data':
                s.CourseList = a.payload;
                break;
            case 'Fill-Current-Course-Data':
                s.CurrentCourse = a.payload;
                break;
            default:
                break;
        }
    },
    CourseTableState
)

export default CourseTableReducer