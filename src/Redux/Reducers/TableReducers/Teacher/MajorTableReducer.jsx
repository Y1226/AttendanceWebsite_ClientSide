import produce from 'immer'

const MajorTableState = {
    MajorList: [],
    CurrentMajor: {
        majorCode: '',
        majorName: '',
        majorCodeCoordinator: '',
        seminarCode: ''
    }
}

export const MajorTableReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Major-Data':
                debugger
                s.MajorList = a.payload;
                break;
            case 'Fill-Current-Major':
                const { majorCode, majorName, majorCodeCoordinator, seminarCode } = a.payload;
                s.CurrentMajor = { majorCode, majorName, majorCodeCoordinator, seminarCode };
                break;
            default:
                break;
        }
    },
    MajorTableState
)

export default MajorTableReducer