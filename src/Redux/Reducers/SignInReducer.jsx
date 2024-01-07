import produce from 'immer'

const SignInState = {
    SeminarList: [],
    CurrentUser: {
        userName: '',
        password: '',
        seminarCode: ''
    },
    NewSeminar: {
        seminarName: '',
        seminarAddress: '',
        seminarLocationCity: '',
        seminarPhoneNumber: '',
        seminarFaxNumber: '',
        seminarEmailAddress: '',
        seminarLogo: '',
        seminarManagerPassword: '',
        seminarStatus: ''
    },
    CurrentSeminarCode: ''
}

export const SignInReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Seminar-Data':
                s.SeminarList = a.payload;
                break;
            case 'Fill_Current_User':
                s.CurrentUser.userName = a.payload.userName;
                s.CurrentUser.password = a.payload.password;
                s.CurrentUser.seminarCode = a.payload.seminarCode;

                s.CurrentSeminarCode = a.payload.seminarCode;
                break;
            case 'Fill_New_Seminar':
                s.NewSeminar.seminarName = a.payload.seminarName;
                s.NewSeminar.seminarEmailAddress = a.payload.seminarEmailAddress;
                s.NewSeminar.seminarLocationCity = a.payload.seminarLocationCity;
                break;
            case 'Finish_Filling_Out_The_Data_For_A_New_Seminar':
                s.NewSeminar.seminarAddress = a.payload.seminarAddress;
                s.NewSeminar.seminarPhoneNumber = a.payload.seminarPhoneNumber;
                s.NewSeminar.seminarFaxNumber = a.payload.seminarFaxNumber;
                s.NewSeminar.seminarLogo = a.payload.seminarLogo;
                s.NewSeminar.seminarManagerPassword = a.payload.seminarManagerPassword;
                s.NewSeminar.seminarStatus = a.payload.seminarStatus;
                break;
            case 'Update_Current_Seminar_Code':
                s.CurrentSeminarCode = a.payload;
                break;
            default:
                break;
        }
    },
    SignInState
)

export default SignInReducer