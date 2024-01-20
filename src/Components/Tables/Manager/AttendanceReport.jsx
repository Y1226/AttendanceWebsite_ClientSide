import { useEffect, useState } from 'react'
import '../../../Style/Tables/Manager/AttendanceReportStyle.scss'
import { useDispatch, useSelector } from 'react-redux'
import { FillAttendanceForAllStudents } from '../../../Redux/Actions/TableActions/Manager/AttendanceReportAction'
// import { FillAttendanceForCurrentStudent } from '../../../Redux/Actions/TableActions/Manager/PersonalAttendanceReportActions'
import { GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode, GetTheMaxNumberOfClassesInSeminarBySeminarCode } from '../../../Redux/Axios/Table/Manager/AttendanceReportAxios'
import Select from 'react-select';
import { getMajorBySeminarCode } from '../../../Redux/Axios/WebSetupAxios/AddCourseToMajorAxios'


export const AttendanceReport = () => {
    
    const compare = (a, b) => {
        let firtsName = a.studentFirstName + " " + a.studentLastName;
        let secondName = b.studentFirstName + " " + b.studentLastName;
        if (firtsName === secondName) return 0;
        return firtsName > secondName ? 1 : -1;
    }

    let dispatch = useDispatch()
    let studentsAttendance = useSelector(x => x.AttendanceReportReducer.AttendanceStudentList)
    studentsAttendance.sort((a, b) => compare(a, b))
    const [featuredStudents, setFeaturedStudents] = useState(studentsAttendance)
    const currentUser = useSelector(x => x.SignInReducer.CurrentUser)
    const [majors, setMajors] = useState([])
    getMajorBySeminarCode(useSelector(x => x.SignInReducer.CurrentSeminarCode)).then(x => setMajors(x.data))
    const [numberOfClasses, setNumberOfClasses] = useState(3)
    const [options, setOptions] = useState([])

    useEffect(() => {
        async function fetchData() {
            await GetTheAttendanceForAllStudentsWithMoreDetailsBySeminarCode(currentUser.seminarCode).then(x => dispatch(FillAttendanceForAllStudents(x.data)))
        }
        fetchData()
    }, [dispatch, currentUser])

    useEffect(() => {
        const cycleClasses = [{ type: "grade", value: 'שנתון', label: 'שנתון', isDisabled: true }]
        cycleClasses.push({ type: "grade", value: "A", label: "שנה א" })
        cycleClasses.push({ type: "grade", value: "B", label: "שנה ב" })
        cycleClasses.push({ type: "grade", value: "C", label: "שנה ג" })

        const derivedArray = [{ type: "major", value: 'מסלולים', label: 'מסלולים', isDisabled: true }, ...majors.map((item, index) => ({
            type: "major",
            value: item.majorName,
            label: item.majorName,
            key: index
        }))];

        GetTheMaxNumberOfClassesInSeminarBySeminarCode(currentUser.seminarCode).then(x => { setNumberOfClasses(x.data) })
        debugger

        const numberClasses = [{ type: "classNumber", value: 'מספר כיתה', label: 'מספר כיתה', isDisabled: true }, ...Array(numberOfClasses).fill(0).map((item, index) => ({
            type: "classNumber",
            value: index + 1,
            label: index + 1,
            key: index
        }))];

        setOptions([...cycleClasses, ...numberClasses, ...derivedArray])
    }, [majors, currentUser.seminarCode, numberOfClasses])

    const filteringSuitableStudents = (selectedOptions) => {
        debugger

        let selectGrade = selectedOptions.filter(x => x.type === 'grade')
        let selectClassNumber = selectedOptions.filter(x => x.type === 'classNumber')
        let selectMajor = selectedOptions.filter(x => x.type === 'major')

        const setStudent = new Set()
        let arrayStudents = new Array()

        if (selectGrade.length !== 0) {
            for (let index = 0; index < selectGrade.length; index++) {
                const element = selectGrade[index];
                studentsAttendance.filter(x => { if (x.studentGrade === element.value) setStudent.add(x) })
            }
            arrayStudents = Array.from(setStudent)
        }

        if (setStudent.size === 0 && selectClassNumber.length !== 0) {
            for (let index = 0; index < selectClassNumber.length; index++) {
                const element = selectClassNumber[index];
                studentsAttendance.filter(x => { if (x.studentClassNumber === element.value) setStudent.add(x) })
                arrayStudents = Array.from(setStudent)
            }
        }
        else if (selectClassNumber.length !== 0) {
            for (let index = 0; index < selectClassNumber.length; index++) {
                const element = selectClassNumber[index];
                arrayStudents = arrayStudents.filter(x => (x.studentClassNumber === element.value))
            }
        }

        if (setStudent.size === 0 && selectMajor.length !== 0) {
            for (let index = 0; index < selectMajor.length; index++) {
                const element = selectMajor[index];
                studentsAttendance.filter(x => { if (x.firstMajorName === element.value || x.secondMajorName === element.value) setStudent.add(x) })
                arrayStudents = Array.from(setStudent)
            }
        }
        else if (selectMajor.length !== 0) {
            for (let index = 0; index < selectMajor.length; index++) {
                const element = selectMajor[index];
                arrayStudents = arrayStudents.filter(x => (x.firstMajorName === element.value || x.secondMajorName === element.value))
            }
        }

        setFeaturedStudents(arrayStudents)
    }

    const openPersonalReport = (x) => {
        localStorage.setItem('currentStudentAttendance', JSON.stringify(x))
        // dispatch(FillAttendanceForCurrentStudent(x))
        window.open('/ChangingReport')
        // window.open('/PersonalAttendanceReport')
    }
    
    return <div className='cardWrapper'>
        <Select
            isMulti
            closeMenuOnSelect={false}
            options={options}
            onChange={filteringSuitableStudents}
        />
        {
            featuredStudents.map((x, y) =>
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