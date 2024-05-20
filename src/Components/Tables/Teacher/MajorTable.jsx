import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillCurrentMajor, FillMajorData } from '../../../Redux/Actions/TableActions/Teacher/MajorTableActions';
import { useNavigate } from "react-router-dom";
import { getMajorsBySeminarAndTeacherCode, getStaffMemberByStaffIDAndSeminarCode } from "../../../Redux/Axios/Table/Teacher/MajorTableAxios";

export const MajorTable = () => {

    let dispatch = useDispatch()
    let navigate = useNavigate()
    let majors = useSelector(x => x.MajorTableReducer.MajorList)
    const currentUser = useSelector(x => x.SignInReducer.CurrentUser)
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)

    useEffect(() => {
        async function fetchData() {
            let s = await getStaffMemberByStaffIDAndSeminarCode(currentUser.userName, currentSeminarCode)
            await getMajorsBySeminarAndTeacherCode(currentUser.seminarCode, s.data.staffCode).then(x => {dispatch(FillMajorData(x.data)); debugger})
        }
        fetchData()
        // debugger
        // console.log(majors);
    },[dispatch, currentUser, currentSeminarCode])

    const GoToGrades = (x) => {
        debugger
        dispatch(FillCurrentMajor(x))
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