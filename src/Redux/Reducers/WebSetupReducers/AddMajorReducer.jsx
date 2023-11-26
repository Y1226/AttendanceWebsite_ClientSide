import produce from 'immer'

const addMajorState = {
    MajorList: [],
    pagePointer: 1
}

export const AddMajorReducer = produce(
    (s,a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                s.MajorList = a.payload;
                break;
            default:
                break;
        }
    },
    addMajorState
)

export default AddMajorReducer