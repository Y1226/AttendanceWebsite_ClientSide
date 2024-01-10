import produce from 'immer'

const AddTeachersAndStudentsState = {
    FileCounter: 0
}

export const AddTeachersAndStudentsReducer = produce(
    (s,a) => {
        switch (a.type) {
            case 'Fill-File-Counter':
                s.FileCounter = a.payload; 
                break;
        
            default:
                break;
        }
    },
    AddTeachersAndStudentsState
)

export default AddTeachersAndStudentsReducer