import produce from 'immer'

const PersonalAttendanceReportState = {
    AttendanceForCurrentStudent: {}
}

export const PersonalAttendanceReportReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Attendance-For-Current-Student':
                s.AttendanceForCurrentStudent = a.payload; 
                break;
        
            default:
                break;
        }
    },
    PersonalAttendanceReportState
)

export default PersonalAttendanceReportReducer