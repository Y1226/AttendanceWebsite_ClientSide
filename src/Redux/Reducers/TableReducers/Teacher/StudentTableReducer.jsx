import produce from 'immer'

const StudentTableState = {
    StudentUserList: [],
    StudentList: [],
    StudentMajorData: []
}

export const StudentTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Student-Data':
                s.StudentList = a.payload; 
                break;
            case 'Fill-StudentUser-Data':
                s.StudentUserList = a.payload; 
                break;
            case 'Fill-StudentMajor-Data':
                s.StudentMajorData = a.payload; 
                break;
            default:
                break;
        }
    },
    StudentTableState
)

export default StudentTableReducer