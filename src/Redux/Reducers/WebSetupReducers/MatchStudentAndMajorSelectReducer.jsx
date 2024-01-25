import produce from 'immer'

const MatchStudentAndMajorSelectState = {
    StudentsList: []
}

export const MatchStudentAndMajorSelectReducer = produce(
    (s,a) => {
        switch (a.type) {
            case 'Fill-Student-Data':
                s.StudentsList = a.payload;
                break;
            default:
                break;
        }
    },
    MatchStudentAndMajorSelectState
)

export default MatchStudentAndMajorSelectReducer