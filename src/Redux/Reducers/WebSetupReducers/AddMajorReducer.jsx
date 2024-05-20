import produce from 'immer'

const addMajorState = {
    MajorList: [],
    SelectedMajors: [],
    CurrentComponent: '',
    MajorsWithoutDistinct: [],
    pagePointer: 1
}

export const AddMajorReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                s.MajorList = a.payload;
                break;
            case 'Fill-Selected-Majors-Data':
                s.SelectedMajors = a.payload;
                break;
            case 'Fill-Current-Component':
                s.CurrentComponent = a.payload;
                break;
            case 'Fill-Majors-Without-Distinct':
                s.MajorsWithoutDistinct = a.payload;
                break;
            default:
                break;
        }
    },
    addMajorState
)

export default AddMajorReducer