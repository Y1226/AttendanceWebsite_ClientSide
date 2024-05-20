import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillCourseData, FillCurrentCourseData } from '../../../Redux/Actions/TableActions/Teacher/CourseTableAction';
import { useNavigate } from "react-router-dom";
import { GetCoursesByMajorCodeAndByCourseGradeAndByTeacherCode } from "../../../Redux/Axios/Table/Teacher/CourseTableAxios";
import { getStaffMemberByStaffIDAndSeminarCode } from "../../../Redux/Axios/Table/Teacher/MajorTableAxios";

export const CourseTable = () => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let courses = useSelector(x => x.CourseTableReducer.CourseList)
    const currentMajor = useSelector(x => x.MajorTableReducer.CurrentMajor)
    const currentGrade = useSelector(x => x.GradeTableReducer.CurrentGrade)
    const currentUser = useSelector(x => x.SignInReducer.CurrentUser)
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)

    useEffect(() => {
        async function fetchData() {
            let s = await getStaffMemberByStaffIDAndSeminarCode(currentUser.userName, currentSeminarCode)
            let m
            if (currentGrade === 'A')
                m = await GetCoursesByMajorCodeAndByCourseGradeAndByTeacherCode(currentMajor.majorCode, 'A', s.data.staffCode)
            else
                m = await GetCoursesByMajorCodeAndByCourseGradeAndByTeacherCode(currentMajor.majorCode, 'B', s.data.staffCode)
            dispatch(FillCourseData(m.data))
        }
        fetchData()
    }, [dispatch, currentMajor, currentGrade, currentSeminarCode, currentUser.userName])

    const GetStudents = (x) => {
        // debugger
        dispatch(FillCurrentCourseData(x))
        navigate('../studentTable')
    }

    return <>
        <div className="wrapFrame">
            <div className="frame">
                <div className="list">
                    <div className="headStudentTable">
                        <div className="title" style={{ textDecorationLine: 'underline' }}>{currentMajor.majorName}</div>
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