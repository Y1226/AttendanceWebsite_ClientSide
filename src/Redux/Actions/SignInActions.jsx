export const FillSeminarData = (value) => {
    return {type: 'Fill-Seminar-Data', payload: value}
}

export const FillCurrentUser = (userName, password, seminarCode) => {
    return { type: 'Fill_Current_User', payload: {userName: userName, password: password, seminarCode: seminarCode}}
}

export const FillNewSeminar = (seminarName, seminarEmailAddress, seminarLocationCity) => {
    return { type: 'Fill_New_Seminar', payload: {seminarName:seminarName, seminarEmailAddress:seminarEmailAddress, seminarLocationCity:seminarLocationCity}}
}

export const FinishFillingOutTheDataForANewSeminar = (seminarAddress, seminarPhoneNumber, seminarFaxNumber, seminarLogo, seminarManagerPassword, seminarStatus) => {
    return { type: 'Finish_Filling_Out_The_Data_For_A_New_Seminar', payload: { seminarAddress: seminarAddress, seminarPhoneNumber: seminarPhoneNumber, seminarFaxNumber: seminarFaxNumber, seminarLogo:seminarLogo, seminarManagerPassword: seminarManagerPassword, seminarStatus: seminarStatus }};
}

export const UpdateCurrentSeminarCode = (seminarCode) => {
    return { type: 'Update_Current_Seminar_Code', payload: seminarCode}
}