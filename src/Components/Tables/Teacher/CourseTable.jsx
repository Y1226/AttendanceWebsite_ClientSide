import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillCourseData } from '../../../Redux/Actions/TableActions/Teacher/CourseTableAction';
import { useNavigate } from "react-router-dom";

export const CourseTable = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let courses = useSelector(x => x.CourseTableReducer.CourseList)

    useEffect(() => {
        async function fetchData() {
            debugger
            let currentMajor = JSON.parse(localStorage.getItem("CurrentMajor"))
            let currentGrade = JSON.parse(localStorage.getItem("Grade"))
            let m
            // let s = await axios.get(`https://localhost:44367/api/Staff/GetStaffMemberByStaffID/${currentUser.userName}`)
            // console.log(s.data);
            if (currentGrade === 'A')
                m = await axios.get(`https://localhost:44367/api/Courses/GetCoursesByMajorCodeAndCourseGrade/${currentMajor.majorCode}/A`)
            else
                m = await axios.get(`https://localhost:44367/api/Courses/GetCoursesByMajorCodeAndCourseGrade/${currentMajor.majorCode}/B`)

            dispatch(FillCourseData(m.data))
        }
        fetchData()
    }, [dispatch])

    const GetStudents = (x) => {
        debugger
        localStorage.setItem("CurrentCourse", JSON.stringify(x))
        navigate('../studentTable')
    }

    return <>
        <div className="wrapFrame">
            <div className="frame">
                <div className="list">
                    <div className="headStudentTable">
                        <div className="title" style={{ textDecorationLine: 'underline' }}>{JSON.parse(localStorage.getItem('CurrentMajor')).majorName}</div>
                        <div className="title" style={{ fontSize: '2rem' }}>Choose a course:</div>
                    </div>
                    <ul className="StudentTableUl">
                        {
                            courses.map((x, y) => <li className="StudentTableLi" key={y}>
                                <label htmlFor={y} className="chooseStyle" onClick={() => GetStudents(x)}>{x.courseName}</label>
                            </li>
                            )
                        }
                    </ul>
                </div>

            </div>
        </div>
    </>
}