import produce from 'immer'

const TeacherTableState = {
    StaffList: []
}

export const TeacherTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Staff-Data':
                s.StaffList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    TeacherTableState
)

export default TeacherTableReducer