import produce from 'immer'

const UpdateState = {
    SeminarGradeLastUpdated: ''
}

export const UpdateReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Grade-Last-Updated':
                s.SeminarGradeLastUpdated = a.payload; 
                break;
        
            default:
                break;
        }
    },
    UpdateState
)

export default UpdateReducer