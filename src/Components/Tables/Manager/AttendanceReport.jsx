import { useEffect, useState } from 'react'
import '../../../Style/Tables/Manager/AttendanceReportStyle.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FillAttendanceForAllStudents } from '../../../Redux/Actions/TableActions/Manager/AttendanceReportAction'
// import { FillAttendanceForCurrentStudent } from '../../../Redux/Actions/TableActions/Manager/PersonalAttendanceReportActions'
import { GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode, GetTheMaxNumberOfClassesInSeminarBySeminarCode } from '../../../Redux/Axios/Table/Manager/AttendanceReportAxios'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getMajorBySeminarCode } from '../../../Redux/Axios/WebSetupAxios/AddCourseToMajorAxios'
// import { LensBlur } from '@mui/icons-material'

const animatedComponents = makeAnimated();

export const AttendanceReport = () => {

    let dispatch = useDispatch()
    let studentsAttendance = useSelector(x => x.AttendanceReportReducer.AttendanceStudentList)
    const currentUser = useSelector(x => x.SignInReducer.CurrentUser)
    const [majors, setMajors] = useState([])
    getMajorBySeminarCode(useSelector(x => x.SignInReducer.CurrentSeminarCode)).then(x => setMajors(x.data))
    const [options, setOptions] = useState([])

    useEffect(() => {
        async function fetchData() {
            await GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode(currentUser.seminarCode).then(x => dispatch(FillAttendanceForAllStudents(x.data)))
        }
        fetchData()
    }, [dispatch, currentUser])

    useEffect(() => {
        const derivedArray = [{value: 'מסלולים', label: 'מסלולים', isDisabled: true}, ...majors.map((item, index) => ({
            value: item.majorName,
            label: item.majorName,
            key: index
        }))];
        
        async function fetchData() {
            return await GetTheMaxNumberOfClassesInSeminarBySeminarCode(currentUser.seminarCode).then(x => {return x.data})
        }

        let numberOfClasses = fetchData()
        debugger
        let array = [numberOfClasses]
        console.log("array: ", array);
        // const numberClasses = [{value: 'מספר כיתה', label: 'מספר כיתה', isDisabled: true}, [...Array(numberOfClasses)].map((item, index) => ({
        //     value: index+1,
        //     label: index+1, 
        //     key: index
        // }))];
        setOptions(derivedArray);
        // setOptions(numberClasses)
    }, [currentUser.seminarCode, majors])

    const openPersonalReport = (x) => {
        localStorage.setItem('currentStudentAttendance', JSON.stringify(x))
        // dispatch(FillAttendanceForCurrentStudent(x))
        window.open('/ChangingReport')
        // window.open('/PersonalAttendanceReport')
    }

    return <div className='cardWrapper'>
        <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            // defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={options}
        />
        {
            studentsAttendance.map((x, y) =>
                <article className="card">
                    <div key={y} className="thumb"></div>
                    <div key={`${y}0`} className="infos">
                        <h2 key={`${y}1`} className="title">{x.studentFirstName} {x.studentLastName}<span className="flag"></span></h2>
                        <h3 key={`${y}2`} className="date">מחזור: {x.studentGrade}</h3>
                        <h3 key={`${y}3`} className="major date">מסלול #1: {x.firstMajorName}</h3>
                        <h3 key={`${y}4`} className="major date">|</h3>
                        <h3 key={`${y}5`} className="major date">מסלול #2: {x.secondMajorName}</h3>
                        <div key={`${y}6`} className="txt">
                            <div className="table-container">
                                <div className="table-horizontal-container">
                                    <table className="unfixed-table">
                                        <thead className="attendanceThead">
                                            <tr>
                                                <th className="attendanceTh">שם קורס</th>
                                                <th className="attendanceTh">שם מורה</th>
                                                <th className="attendanceTh">מספר שעורים</th>
                                                <th className="attendanceTh">מספר שעורים שנכחה</th>
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
                        <h3 className="details" onClick={() => openPersonalReport(x)}>הצג והדפס ⇾</h3>
                    </div>
                </article>
            )}
    </div>
}