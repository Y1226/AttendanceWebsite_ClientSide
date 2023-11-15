import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillStudentUserData } from '../../../Redux/Actions/TableActions/Teacher/StudentTableAction';
import { FillStudentData } from '../../../Redux/Actions/TableActions/Teacher/StudentTableAction';
import "../../../Style/Tables/Teacher/StudentTableStyle.scss"
import { useNavigate } from "react-router-dom";
// import { AddToClass } from "../../Classes/AddToClass";
// import { useNavigate } from "react-router-dom";

export const StudentTable = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let users = useSelector(x => x.StudentTableReducer.StudentUserList)
    let students = useSelector(x => x.StudentTableReducer.StudentList)
    let studentCodes = []
    let studentAttendance = []

    //The school year starts from September, check what month we're in and set min year accordingly.
    let minDate = new Date().getMonth() < 9 ? new Date().getFullYear() - 1 : new Date().getFullYear()

    useEffect(() => {
        let currentMajor = JSON.parse(localStorage.getItem("CurrentMajor"))
        async function fetchData() {
            debugger
            await axios.get(`https://localhost:44367/api/User/GetUsersByUserIDAndMajorCode/${currentMajor.majorCode}`).then(x => dispatch(FillStudentUserData(x.data)))
            await axios.get(`https://localhost:44367/api/Students/GetAllStudentsByStudentMajorCode/${currentMajor.majorCode}`).then(x => dispatch(FillStudentData(x.data)))
        }
        fetchData()
    }, [dispatch])


    for (let i = 0; i < students.length; i++) {
        debugger
        studentCodes.push(students[i].studentCode)
    }
    for (let i = 0; i < users.length; i++) {
        studentAttendance.push(false)
    }



    const SubmitAttendance = async () => {
        let currentMajor = JSON.parse(localStorage.getItem('CurrentMajor'))
        let object = {
            SeminarCode: currentMajor.seminarCode,
            MajorCode: currentMajor.majorCode,
            ListStudentCodes: studentCodes,
            ListAttendanceOfStudents: studentAttendance,
            LessonDate: document.getElementById('lessonDate').value,
            LessonNumber: document.getElementById('lessonNumber').value
        }
        console.log(object);
        debugger
        await axios.post('https://localhost:44367/api/AttendencePerCourse/AddingAttendanceToTheCourse', object)
        navigate('../majorTable')
    }

    const AddAttendance = (y) => {
        debugger
        if (studentAttendance[y])
            studentAttendance[y] = false
        else
            studentAttendance[y] = true
    }

    return <>
        <div className="wrapFrame">
            <div className="frame">
                <div className="list">
                    <div className="headStudentTable">
                        <div className="title" style={{ textDecorationLine: 'underline' }}>{JSON.parse(localStorage.getItem('CurrentCourse')).courseName}</div>
                        <input type="date" id="lessonDate" className="subtitle" onKeyDown={(e) => e.preventDefault()}
                            defaultValue={new Date().toISOString().split("T")[0]}
                            min={`${minDate}-09-01`} max={new Date().toISOString().split("T")[0]}></input>
                            <br></br>
                        {/* <p className="subtitle" id="lessonNumber">Lesson #5</p> */}
                        <select className="subtitle" id="lessonNumber">
                        <option value="1" className="subtitle">Lesson #1</option>
                        <option value="2" className="subtitle">Lesson #2</option>
                        <option value="3" className="subtitle">Lesson #3</option>
                        <option value="4" className="subtitle">Lesson #4</option>   
                        <option value="5" className="subtitle">Lesson #5</option>
                        <option value="6" className="subtitle">Lesson #6</option>
                        <option value="7" className="subtitle">Lesson #7</option>
                        <option value="8" className="subtitle">Lesson #8</option>
                    </select>
                    </div>
                    <ul className="StudentTableUl">
                        {
                            users.map((x, y) => <li className="StudentTableLi" key={y}>
                                <input className="StudentTableInput" type="checkbox" id={y} name={x.userId} />
                                <label htmlFor={y} className="text">{x.userFirstName} {x.userLastName} </label>
                                <label htmlFor={y} className="button" value={false} onClick={() => AddAttendance(y)}></label>
                                <div className="wrapper">
                                    <svg version="1.1" id={y} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 98.5 98.5" enableBackground="new 0 0 98.5 98.5" xmlSpace="preserve">
                                        <path className="checkmark" fill="none" strokeWidth="8" strokeMiterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4
                                C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"/>
                                    </svg>
                                </div>
                            </li>
                            )
                        }
                    </ul>
                    <input type="button" value="SUBMIT" className="StudentTableButton" name="submit" onClick={() => SubmitAttendance()}></input>
                </div>

            </div>
        </div>
    </>
}