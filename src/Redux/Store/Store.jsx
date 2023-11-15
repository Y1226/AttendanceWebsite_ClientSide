import { combineReducers, createStore } from "redux"
// import NavReducer from "./Reducers/NavReducer"
// import SignInReducer from "./Reducers/SignInReducer"
import StepsReducer from "../Reducers/WebSetupReducers/StepsReducer"
import TeacherTableReducer from "../Reducers/TableReducers/Manager/TeacherTableReducer"
import AttendanceReportReducer from "../Reducers/TableReducers/Manager/AttendanceReportReducer"
import ManagerMajorTableReducer from "../Reducers/TableReducers/Manager/ManagerMajorTableReducer"
import ManagerStudentTableReducer from "../Reducers/TableReducers/Manager/ManagerStudentTableReducer"
import MajorTableReducer from "../Reducers/TableReducers/Teacher/MajorTableReducer"
import SignInReducer from "../Reducers/SignInReducer"
import CourseTableReducer from "../Reducers/TableReducers/Teacher/CourseTableReducer"
import StudentTableReducer from "../Reducers/TableReducers/Teacher/StudentTableReducer"
import PersonalAttendanceReportReducer from "../Reducers/TableReducers/Manager/PersonalAttendanceReportReducer"

const reducers = combineReducers({
    // NavReducer,
    // SignInReducer,
    StepsReducer,
    TeacherTableReducer,
    SignInReducer,
    MajorTableReducer,
    CourseTableReducer,
    StudentTableReducer,
    AttendanceReportReducer,
    ManagerMajorTableReducer,
    ManagerStudentTableReducer,
    PersonalAttendanceReportReducer
})

const store = createStore(reducers)
window.store = store

export default store