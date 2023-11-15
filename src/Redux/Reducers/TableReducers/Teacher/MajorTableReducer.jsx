import produce from 'immer'

const MajorTableState = {
    MajorList: []
}

export const MajorTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                s.MajorList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    MajorTableState
)

export default MajorTableReducer