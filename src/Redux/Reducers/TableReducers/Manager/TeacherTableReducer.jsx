import produce from 'immer'

const TeacherTableState = {
    StaffList: []
}

export const TeacherTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Staff-Data':
                debugger
                s.StaffList = a.payload; 
                debugger
                break;
        
            default:
                break;
        }
    },
    TeacherTableState
)

export default TeacherTableReducer