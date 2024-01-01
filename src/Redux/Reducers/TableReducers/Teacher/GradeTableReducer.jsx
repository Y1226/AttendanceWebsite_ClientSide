import produce from 'immer'

const GradeTableState = {
    CurrentGrade: ''
}

export const GradeTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case '':
                break;
            default:
                break;
        }
    },
    GradeTableState
)

export default GradeTableReducer