import produce from 'immer'

const ManagerMajorTableState = {
    MajorList: []
}

export const ManagerMajorTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                s.MajorList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    ManagerMajorTableState
)

export default ManagerMajorTableReducer