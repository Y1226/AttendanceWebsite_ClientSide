import { useEffect } from 'react'
import '../../../Style/Tables/Manager/AttendanceReportStyle.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FillAttendanceForAllStudents } from '../../../Redux/Actions/TableActions/Manager/AttendanceReportAction'
// import { FillAttendanceForCurrentStudent } from '../../../Redux/Actions/TableActions/Manager/PersonalAttendanceReportActions'
import axios from 'axios'

export const AttendanceReport = () => {

    let dispatch = useDispatch()
    let studentsAttendance = useSelector(x => x.AttendanceReportReducer.AttendanceStudentList)

    useEffect(() => {
        async function fetchData() {
            let currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
            let s = await axios.get(`https://localhost:44367/api/AttendencePerCourse/GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode/${currentUser.seminarCode}`)
            dispatch(FillAttendanceForAllStudents(s.data))
        }
        fetchData()
    }, [dispatch])

    const openPersonalReport = (x) => {
        localStorage.setItem('currentStudentAttendance', JSON.stringify(x))
        // dispatch(FillAttendanceForCurrentStudent(x))
        window.open('/ChangingReport')
        // window.open('/PersonalAttendanceReport')
    }

    return <div className='cardWrapper'>
        {
            studentsAttendance.map((x, y) =>
                <article className="card">
                    <div key={y} className="thumb"></div>
                    <div key={`${y}0`} className="infos">
                        <h2 key={`${y}1`} className="title">{x.studentFirstName} {x.studentLastName}<span className="flag"></span></h2>
                        <h3 key={`${y}2`} className="date">Grade: {x.studentGrade}</h3>
                        <h3 key={`${y}3`} className="major date">Major #1: {x.firstMajorName}</h3>
                        <h3 key={`${y}4`} className="major date">|</h3>
                        <h3 key={`${y}5`} className="major date">Major #2: {x.secondMajorName}</h3>
                        <div key={`${y}6`} className="txt">
                            <div className="table-container">
                                <div className="table-horizontal-container">
                                    <table className="unfixed-table">
                                        <thead className="attendanceThead">
                                            <tr>
                                                <th className="attendanceTh">Course Name</th>
                                                <th className="attendanceTh">Teachers Name</th>
                                                <th className="attendanceTh">Number of Lessons</th>
                                                <th className="attendanceTh">Number of Attended Lessons</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                x.detailsForTheFirstMajor.map(u =>
                                                    <tr>
                                                        <td className="attendanceTd">{u.courseName}</td>
                                                        <td className="attendanceTd">{u.courseTeacherFirstName} {u.courseTeacherLastName}</td>
                                                        <td className="attendanceTd">{u.numberOfHoursTheCourseTookPlace}</td>
                                                        <td className="attendanceTd">{u.numberOfHoursTheStudentAttendedTheCourse}</td>
                                                    </tr>
                                                )
                                            }
                                            {
                                                x.detailsForTheSecondMajor.map(u =>
                                                    <tr>
                                                        <td className="attendanceTd">{u.courseName}</td>
                                                        <td className="attendanceTd">{u.courseTeacherFirstName} {u.courseTeacherLastName}</td>
                                                        <td className="attendanceTd">{u.numberOfHoursTheCourseTookPlace}</td>
                                                        <td className="attendanceTd">{u.numberOfHoursTheStudentAttendedTheCourse}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <h3 className="details" onClick={() => openPersonalReport(x)}>View and Print ⇾</h3>
                    </div>
                </article>
            )}
    </div>
}