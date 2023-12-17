import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillMajorData } from '../../../Redux/Actions/TableActions/Teacher/MajorTableActions';
import { useNavigate } from "react-router-dom";

export const MajorTable = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let majors = useSelector(x => x.MajorTableReducer.MajorList)

    useEffect(() => {
        async function fetchData() {
            debugger
            let currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
            let s = await axios.get(`https://localhost:44367/api/Staff/GetStaffMemberByStaffID/${currentUser.userName}`)
            console.log(s.data);
            let m = await axios.get(`https://localhost:44367/api/Major/GetMajorsBySeminarAndTeacherCode/${currentUser.seminarCode}/${s.data.staffCode}`)
            dispatch(FillMajorData(m.data))
        }
        fetchData()
    },[dispatch])

    const GoToGrades = (x) => {
        debugger
        localStorage.setItem("CurrentMajor", JSON.stringify(x))
        navigate('../GradeTable')
    }

    return <>
    <div className="wrapFrame">
        <div className="frame">
            <div className="list">
                <div className="headStudentTable">
                    <div className="title">:בחר מסלול</div>
                    {/* <div className="title">Choose a major:</div> */}
                </div>
                <ul className="StudentTableUl">
                    {
                        majors.map((x, y) => <li className="StudentTableLi" key={y}>
                            <label htmlFor={y} className="chooseStyle" onClick={() => GoToGrades(x)}>{x.majorName}</label>
                        </li>
                        )
                    }
                </ul>
            </div>

        </div>
        </div>
    </>
}