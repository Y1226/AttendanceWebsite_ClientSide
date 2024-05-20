import produce from 'immer'

const ManagerNavState = {
    CurrentSeminar: {
        seminarName: '',
        seminarAddress: '',
        seminarLocationCity: '',
        seminarPhoneNumber: '',
        seminarFaxNumber: '',
        seminarEmailAddress: '',
        seminarLogo: '',
        seminarManagerPassword: '',
        seminarStatus: ''
    }
}

export const ManagerNavReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill_Current_Seminar':
                s.CurrentSeminar.seminarName = a.payload.seminarName;
                s.CurrentSeminar.seminarEmailAddress = a.payload.seminarEmailAddress;
                s.CurrentSeminar.seminarLocationCity = a.payload.seminarLocationCity;
                s.CurrentSeminar.seminarAddress = a.payload.seminarAddress;
                s.CurrentSeminar.seminarPhoneNumber = a.payload.seminarPhoneNumber;
                s.CurrentSeminar.seminarFaxNumber = a.payload.seminarFaxNumber;
                s.CurrentSeminar.seminarLogo = a.payload.seminarLogo;
                s.CurrentSeminar.seminarManagerPassword = a.payload.seminarManagerPassword;
                s.CurrentSeminar.seminarStatus = a.payload.seminarStatus;
                break;
            default:
                break;
        }
    },
    ManagerNavState
)

export default ManagerNavReducer