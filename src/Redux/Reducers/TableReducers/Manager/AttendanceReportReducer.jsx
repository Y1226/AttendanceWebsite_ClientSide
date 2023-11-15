import produce from 'immer'

const AttendanceReportState = {
    AttendanceStudentList: []
}

export const AttendanceReportReducer = produce(
    (s, a) => {
        switch (a.type) {
            case 'Fill-Attendance-For-All-Students':
                s.AttendanceStudentList = a.payload; 
                break;
        
            default:
                break;
        }
    },
    AttendanceReportState
)

export default AttendanceReportReducer