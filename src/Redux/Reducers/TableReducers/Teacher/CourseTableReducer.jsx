import produce from 'immer'

const CourseTableState = {
    CourseList: []
}

export const CourseTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Course-Data':
                s.CourseList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    CourseTableState
)

export default CourseTableReducer