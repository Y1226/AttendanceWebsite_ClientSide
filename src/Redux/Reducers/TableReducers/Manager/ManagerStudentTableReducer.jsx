import produce from 'immer'

const ManagerStudentTableState = {
    StudentList: []
}

export const ManagerStudentTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Student-Data':
                s.StudentList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    ManagerStudentTableState
)

export default ManagerStudentTableReducer