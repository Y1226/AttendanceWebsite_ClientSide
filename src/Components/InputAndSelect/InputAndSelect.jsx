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

export const InputAndSelect = (props) => {
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    let dispatch = useDispatch()
    const listSelectStaff = []
    const [selectValues, setSelectValues] = useState([{ courseName: '', routeCoordinator: null }]);

    staff.forEach(e => {
        listSelectStaff.push({ code: e.staffCode, value: e.userFirstName + " " + e.userLastName, label: e.userFirstName + " " + e.userLastName })
    })

    const handleAnothersChange = (index, selectedOption) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], routeCoordinator: selectedOption };
        setSelectValues(updatedValues);
    };

    const handleInputChange = (index, courseName) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], courseName };
        setSelectValues(updatedValues);
    };

    const handleAddSelect = () => {
        setSelectValues([...selectValues, { courseName: '', routeCoordinator: null }]);
    };

    const handleDeleteSelect = (index) => {
        const updatedValues = selectValues.filter((_, i) => i !== index);
        setSelectValues(updatedValues);
    };

    useEffect(() => {
        async function fetchData() {
            await GetAllMajors().then(x => dispatch(FillMajorData(x.data)))
            await GetFullStaffDataBySeminarCode(currentSeminarCode).then(x => dispatch(FillStaffData(x.data)))
        }
        fetchData()
        function handleSubmit() {
            const selectedItems = []
            selectValues.forEach(element => {
                if (!(element.courseName === '' || element.routeCoordinator === null))
                    selectedItems.push(element);
            });
            selectedItems.sort((a, b) => a.courseName > b.courseName ? 1 : -1)
            console.log(selectedItems);
            debugger
            dispatch(FillCoursesForMajorsByIndex(props.index, selectedItems))
        };
        handleSubmit()
    }, [dispatch, selectValues, props.index, currentSeminarCode])

    return <>
        <div className="inputAndSelect">
        {selectValues.map((value, index) => (
            <div key={index} className='spaces'>
                
                {/* Enter a course name */}
                <div className="col-3 input-effect">
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
                </div>

                {/* Teacher selection */}
                <div className='SelectComponent'>
                    <Select
                        placeholder="בחר מורה"
                        maxMenuHeight={130}
                        value={value.routeCoordinator}
                        onChange={(selectedOption) => handleAnothersChange(index, selectedOption)}
                        options={listSelectStaff}
                    />
                </div>

                {/* Delete button */}
                <button className="plusButton" style={{ flexDirection: 'column' }} onClick={() => handleDeleteSelect(index)}>
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
                </button>

            </div>
        ))}
        </div>

        {/* Add button */}
        <div tabIndex="0" className="plusButton plus" onClick={handleAddSelect}>
            <svg className="plusIcon" viewBox="0 0 30 30">
                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </svg>
        </div>
    </>
}
