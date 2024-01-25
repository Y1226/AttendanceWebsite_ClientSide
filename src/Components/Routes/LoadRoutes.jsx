import { Route, Routes } from "react-router-dom"
// import EnhancedTable from "../Tables/TeacherTable"
// import { Steps } from "../WebSetup/Steps"
// import { AddMajor } from "../WebSetup/AddMajor"
// import { AddCourseToMajor } from "../WebSetup/AddCourseToMajor"
// import { AddTeachers } from "../WebSetup/AddTeachers"
// import { AddStudents } from "../WebSetup/AddStudents"
// import { MatchTeacherToCourse } from "../WebSetup/MatchTeacherToCourse"
// import { CheckStudentMajor } from "../WebSetup/CheckStudentMajor"
import { ManagerNav } from "../NavBar/ManagerNav"
import TeacherTable from "../Tables/Manager/TeacherTable"
import { SignInForm } from "../SignIn/SignInForm"
import { UserNav } from "../NavBar/UserNav"
import { MajorTable } from "../Tables/Teacher/MajorTable"
import { CourseTable } from "../Tables/Teacher/CourseTable"
import { StudentTable } from "../Tables/Teacher/StudentTable"
import { ManagerStudentTable } from "../Tables/Manager/ManagerStudentTable"
import { ManagerMajorTable } from "../Tables/Manager/ManagerMajorTable"
import { AttendanceReport } from "../Tables/Manager/AttendanceReport"
import { GradeTable } from "../Tables/Teacher/GradeTable"
import { PersonalAttendanceReport } from "../Tables/Manager/PersonalAttendanceReport"
import { ChangingTable } from "../Tables/Manager/ChangingTable"
import { Update } from "../Tables/Manager/Update"
import { Pencil } from "../Tables/Manager/Pencil"
import { RemainingDetails } from "../WebSetup/RemainingDetails"
import { MoreInfoNav } from "../NavBar/MoreInfoNav"
import { Verification } from "../WebSetup/Verification"
import { MatchStudentToMajor } from "../WebSetup/MatchStudentToMajor"
import { AddMajor } from "../WebSetup/AddMajor"
import { AddTeachersAndStudents } from "../WebSetup/AddTeachersAndStudents"
import { AddCourseToMajor } from "../WebSetup/AddCourseToMajor"

export const LoadRoutes = () => {
    return <Routes>
        {/* <Route path='/' element={<Steps></Steps>}>
            <Route path='one' element={<AddMajor></AddMajor>}></Route>
            <Route path='two' element={<AddCourseToMajor></AddCourseToMajor>}></Route>
            <Route path='three' element={<AddTeachers></AddTeachers>}></Route>
            <Route path='four' element={<AddStudents></AddStudents>}></Route>
            <Route path='five' element={<MatchTeacherToCourse></MatchTeacherToCourse>}></Route>
            <Route path='six' element={<CheckStudentMajor></CheckStudentMajor>}></Route>
        </Route> */}
        <Route path="/" element={<SignInForm></SignInForm>}></Route>
        <Route path="/managerNav" element={<ManagerNav></ManagerNav>}>
            <Route path="teacherTable" element={<TeacherTable></TeacherTable>}></Route>
            <Route path="attendanceReport" element={<AttendanceReport></AttendanceReport>}></Route>
            <Route path="managerMajorTable" element={<ManagerMajorTable></ManagerMajorTable>}></Route>
            <Route path="managerStudentTable" element={<ManagerStudentTable></ManagerStudentTable>}></Route>
            <Route path="update" element={<Update></Update>}>
                <Route path="pencil" element={<Pencil></Pencil>}></Route>
            </Route>
        </Route>
        <Route path="/teacherNav" element={<UserNav></UserNav>}>
            <Route path="majorTable" element={<MajorTable></MajorTable>}></Route>
            <Route path="gradeTable" element={<GradeTable></GradeTable>}></Route>
            <Route path="courseTable" element={<CourseTable></CourseTable>}></Route>
            <Route path="studentTable" element={<StudentTable></StudentTable>}></Route>
        </Route>
        <Route path="/PersonalAttendanceReport" element={<PersonalAttendanceReport></PersonalAttendanceReport>}></Route>
        <Route path="/ChangingReport" element={<ChangingTable></ChangingTable>}></Route>
        <Route path="/moreInfoNav" element={<MoreInfoNav></MoreInfoNav>}>
            <Route path="remainingDetails" element={<RemainingDetails></RemainingDetails>}></Route>
            <Route path="verification" element={<Verification></Verification>}></Route>
            <Route path="matchStudentToMajor" element={<MatchStudentToMajor></MatchStudentToMajor>}></Route>
            <Route path="addMajor" element={<AddMajor></AddMajor>}></Route>
            <Route path="addCourseToMajor" element={<AddCourseToMajor></AddCourseToMajor>}></Route>
            <Route path="addTeachersAndStudents" element={<AddTeachersAndStudents></AddTeachersAndStudents>}></Route>
        </Route>
        {/* <Route path="/" element={<EnhancedTable></EnhancedTable>}></Route> */}
    </Routes>
}