import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillCourseData } from '../../../Redux/Actions/TableActions/Teacher/CourseTableAction';
import { useNavigate } from "react-router-dom";
import { GetCoursesByMajorCodeAndCourseGrade } from "../../../Redux/Axios/Table/Teacher/CourseTableAxios";

export const CourseTable = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let courses = useSelector(x => x.CourseTableReducer.CourseList)
    const currentMajor = useSelector(x => x.MajorTableReducer.CurrentMajor)
    const currentGrade = useSelector(x => x.GradeTableReducer.CurrentGrade)

    useEffect(() => {
        async function fetchData() {
            let m
            if (currentGrade === 'A')
                m = await GetCoursesByMajorCodeAndCourseGrade(currentMajor.majorCode, 'A')
            else
                m = await GetCoursesByMajorCodeAndCourseGrade(currentMajor.majorCode, 'B')
            dispatch(FillCourseData(m.data))
        }
        fetchData()
    }, [dispatch, currentMajor, currentGrade])

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
                        <div className="title" style={{ fontSize: '2rem' }}>:בחר קורס</div>
                        {/* <div className="title" style={{ fontSize: '2rem' }}>Choose a course:</div> */}
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