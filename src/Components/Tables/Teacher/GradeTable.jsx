// import { useEffect } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import { FillMajorData } from '../../../Redux/Actions/TableActions/Teacher/MajorTableActions';
import '../../../Style/Tables/Teacher/GradeTableStyle.css'
import { useNavigate } from "react-router-dom";

export const GradeTable = () => {

    // let dispatch = useDispatch()
    let navigate = useNavigate()

    // useEffect(() => {
    //     async function fetchData() {
    //         debugger
    //         let currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
    //         let s = await axios.get(`https://localhost:44367/api/Staff/GetStaffMemberByStaffID/${currentUser.userName}`)
    //         console.log(s.data);
    //         let m = await axios.get(`https://localhost:44367/api/Major/GetMajorsBySeminarAndTeacherCode/${currentUser.seminarCode}/${s.data.staffCode}`)
    //         dispatch(FillMajorData(m.data))
    //     }
    //     fetchData()
    // }, [dispatch])

    const GoToCourse = (x) => {
        debugger
        localStorage.setItem("Grade", JSON.stringify(x))
        navigate('../CourseTable')
    }

    return <>
        <div className="wrapFrame">
            <div className="frame">
                <div className="list">
                    <div className="headStudentTable">
                        <div className="title">:בחר שנתון</div>
                        {/* <div className="title">Choose a Grade:</div> */}
                    </div>
                    <div className="StudentTableUl">
                        <p className="chooseStyle" onClick={() => GoToCourse('A')}>שנה א</p><br />
                        <p className="chooseStyle" onClick={() => GoToCourse('B')}>שנה ב</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}