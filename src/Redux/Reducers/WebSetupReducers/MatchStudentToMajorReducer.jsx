import produce from 'immer'

const MatchStudentToMajorState = {
    listOfStudentsAndTheirMajors: {}
}

export const MatchStudentToMajorReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill_List_Of_Students_And_Their_Majors':
                s.listOfStudentsAndTheirMajors = a.payload;
                break;
            case 'Update_Students_Major_In_The_State':
                const { key, valueKey, studentIndex, code, isFirstMajor } = a.payload;
                s.listOfStudentsAndTheirMajors[key][valueKey][studentIndex][isFirstMajor ? 'studentFirstMajorCode' : 'studentSecondMajorCode'] = code
                break;
            default:
                break;
        }
    }, MatchStudentToMajorState
)

export default MatchStudentToMajorReducer