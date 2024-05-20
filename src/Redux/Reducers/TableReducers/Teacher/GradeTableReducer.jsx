import produce from 'immer'

const GradeTableState = {
    CurrentGrade: ''
}

export const GradeTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Current-Grade':
                s.CurrentGrade = a.payload;
                break;
            default:
                break;
        }
    },
    GradeTableState
)

export default GradeTableReducer