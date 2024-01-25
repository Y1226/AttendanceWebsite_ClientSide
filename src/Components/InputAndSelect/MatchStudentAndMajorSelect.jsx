import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction";
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction";
import Select from 'react-select'
import '../../Style/WebSetupStyle/AddMajorStyle.scss'
import './InputAndSelect.scss'
import { FillCoursesForMajorsByIndex } from "../../Redux/Actions/WebSetupActions/AddCourseToMajorAction";
import { GetAllMajors } from "../../Redux/Axios/Table/Manager/ManagerMajorTableAxios";
import { GetFullStaffDataBySeminarCode } from "../../Redux/Axios/Table/Manager/TeacherTableAxios";
import { GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode } from "../../Redux/Axios/WebSetupAxios/MatchStudentAndMajorSelectAxios";
import { FillStudentData } from "../../Redux/Actions/WebSetupActions/MatchStudentAndMajorSelectActions";
import { getMajorBySeminarCode } from "../../Redux/Axios/WebSetupAxios/AddCourseToMajorAxios";

export const MatchStudentAndMajorSelect = (props) => {

    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    const majors = useSelector(x => x.AddMajorReducer.MajorList)
    const listSelectMajors = []
    let dispatch = useDispatch()

    useEffect(() => {
        async function fetchData() {
            await getMajorBySeminarCode(currentSeminarCode).then(x => dispatch(FillMajorData(x.data)))
        }
        fetchData()
    },[])

    // let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    // let students = useSelector(x => x.MatchStudentAndMajorSelectReducer.StudentsList)
    // let dispatch = useDispatch()
    // const listSelectStaff = []
    // const [selectValues, setSelectValues] = useState([{ courseName: '', routeCoordinator: null }]);
    // const a = props.students
    majors.forEach(e => {
        listSelectMajors.push({ code: e.majorCode, value: e.majorName, label: e.majorName })
    })

    // const handleAnothersChange = (index, selectedOption) => {
    //     const updatedValues = [...selectValues];
    //     updatedValues[index] = { ...updatedValues[index], routeCoordinator: selectedOption };
    //     setSelectValues(updatedValues);
    // };

    // const handleInputChange = (index, courseName) => {
    //     const updatedValues = [...selectValues];
    //     updatedValues[index] = { ...updatedValues[index], courseName };
    //     setSelectValues(updatedValues);
    // };

    // const handleAddSelect = () => {
    //     setSelectValues([...selectValues, { courseName: '', routeCoordinator: null }]);
    // };

    // const handleDeleteSelect = (index) => {
    //     const updatedValues = selectValues.filter((_, i) => i !== index);
    //     setSelectValues(updatedValues);
    // };

    // useEffect(() => {
    //     async function fetchData() {
    //         await GetAllMajors().then(x => dispatch(FillMajorData(x.data)))
    //         await GetFullStaffDataBySeminarCode(currentSeminarCode).then(x => dispatch(FillStaffData(x.data)))
    //         await GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode(props.studentGrade, props.studentClassNumber, props.seminarCode)
    //             .then(x => dispatch(FillStudentData(x.data)))
    //     }
    //     fetchData()
    // }, [dispatch, selectValues, props.index, currentSeminarCode, props.studentGrade, props.studentClassNumber, props.seminarCode])

    // function handleSubmit() {
    //     const selectedItems = []
    //     selectValues.forEach(element => {
    //         if (!(element.courseName === '' || element.routeCoordinator === null))
    //             selectedItems.push(element);
    //     });
    //     selectedItems.sort((a, b) => a.courseName > b.courseName ? 1 : -1)
    //     console.log(selectedItems);
    //     debugger
    //     dispatch(FillCoursesForMajorsByIndex(props.index, selectedItems))
    // };
    // handleSubmit()

    return <>
        <div className="inputAndSelect">
            {/* {console.log(a)} */}
            {props.students.map((value, index) => (<>
                <h1>{value.userFirstName} {value.userLastName}</h1>
                <div className='SelectComponent'>
                    <Select
                        placeholder="בחר מסלול א"
                        maxMenuHeight={130}
                        // value={value.routeCoordinator}
                        // onChange={(selectedOption) => handleAnothersChange(index, selectedOption)}
                        options={listSelectMajors}
                    />
                    <Select
                        placeholder="בחר מסלול ב"
                        maxMenuHeight={130}
                        // value={value.routeCoordinator}
                        // onChange={(selectedOption) => handleAnothersChange(index, selectedOption)}
                        options={listSelectMajors}
                    />
                </div>
            </>))}
        </div>
    </>
}

{/* Enter a course name */ }
{/* <div className="col-3 input-effect">
                    <input
                        className="effect-19"
                        type="text"
                        placeholder="שם הקורס"
                        value={value.courseName}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "שם הקורס"}
                    />
                    <label>שם הקורס</label>
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div> */}
{/* <div className="col-3 input-effect">
                    <input
                        className="effect-19"
                        type="text"
                        placeholder="שם הקורס"
                        value={value.courseName}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "שם הקורס"}
                    />
                    <label>שם הקורס</label>
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div> */}

{/* Teacher selection */ }
{/* <div className='SelectComponent'>
                    <Select
                        placeholder="בחר מורה"
                        maxMenuHeight={130}
                        value={value.routeCoordinator}
                        onChange={(selectedOption) => handleAnothersChange(index, selectedOption)}
                        options={listSelectStaff}
                    />
                </div> */}

{/* Delete button */ }
{/* <button className="plusButton" style={{ flexDirection: 'column' }} onClick={() => handleDeleteSelect(index)}>
                    <svg className="bin-top" viewBox="0 0 39 7">
                        <line y1="5" x2="39" y2="5" strokeWidth="4"></line>
                        <line x1="12" y1="1.5" x2="26.0357" y2="1.5" strokeWidth="3"></line>
                    </svg>
                    <svg className="bin-bottom" viewBox="0 0 33 39">
                        <mask>
                            <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                        </mask>
                        <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                        <path d="M12 6L12 29" strokeWidth="4"></path>
                        <path d="M21 6V29" strokeWidth="4"></path>
                    </svg>
                </button> */}
