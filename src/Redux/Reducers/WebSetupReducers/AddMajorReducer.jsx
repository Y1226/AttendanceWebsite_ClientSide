import produce from 'immer'

const addMajorState = {
    pagePointer: 1
}

export const AddMajorReducer = produce(
    (s,a) => {
        switch (a.type) {
            case '':
                
                break;
            default:
                break;
        }
    },
    addMajorState
)

export default AddMajorReducer