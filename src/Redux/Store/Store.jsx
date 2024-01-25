import { combineReducers, createStore } from "redux"
// import NavReducer from "./Reducers/NavReducer"
// import SignInReducer from "./Reducers/SignInReducer"
import StepsReducer from "../Reducers/WebSetupReducers/StepsReducer"
import TeacherTableReducer from "../Reducers/TableReducers/Manager/TeacherTableReducer"
import AttendanceReportReducer from "../Reducers/TableReducers/Manager/AttendanceReportReducer"
import ManagerMajorTableReducer from "../Reducers/TableReducers/Manager/ManagerMajorTableReducer"
import ManagerStudentTableReducer from "../Reducers/TableReducers/Manager/ManagerStudentTableReducer"
import MajorTableReducer from "../Reducers/TableReducers/Teacher/MajorTableReducer"
import GradeTableReducer from "../Reducers/TableReducers/Teacher/GradeTableReducer"
import SignInReducer from "../Reducers/SignInReducer"
import CourseTableReducer from "../Reducers/TableReducers/Teacher/CourseTableReducer"
import StudentTableReducer from "../Reducers/TableReducers/Teacher/StudentTableReducer"
import PersonalAttendanceReportReducer from "../Reducers/TableReducers/Manager/PersonalAttendanceReportReducer"
import AddCourseToMajorReducer from '../Reducers/WebSetupReducers/AddCourseToMjorReducer'
import AddTeachersAndStudentsReducer from '../Reducers/WebSetupReducers/AddTeachersAndStudentsReducer'
import MatchStudentAndMajorSelectReducer from '../Reducers/WebSetupReducers/MatchStudentAndMajorSelectReducer'
import AddMajorReducer from '../Reducers/WebSetupReducers/AddMajorReducer'

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
    PersonalAttendanceReportReducer,
    AddCourseToMajorReducer,
    GradeTableReducer,
    AddTeachersAndStudentsReducer,
    MatchStudentAndMajorSelectReducer,
    AddMajorReducer
})

const store = createStore(reducers)
window.store = store

export default store