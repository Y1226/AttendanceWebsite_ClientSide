import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillMajorData } from '../../../Redux/Actions/TableActions/Teacher/MajorTableActions';
import { useNavigate } from "react-router-dom";
import { getMajorsBySeminarAndTeacherCode, getStaffMemberByStaffID } from "../../../Redux/Axios/Table/Teacher/MajorTableAxios";

export const MajorTable = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let majors = useSelector(x => x.MajorTableReducer.MajorList)
    const currentUser = useSelector(x => x.SignInReducer.CurrentUser)

    useEffect(() => {
        async function fetchData() {
            let s = await getStaffMemberByStaffID(currentUser.userName)
            await getMajorsBySeminarAndTeacherCode(currentUser.seminarCode, s.data.staffCode).then(dispatch(x => FillMajorData(x.data)))
        }
        fetchData()
    },[dispatch, currentUser])

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