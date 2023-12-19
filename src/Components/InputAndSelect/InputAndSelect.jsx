import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction";
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction";
import Select from 'react-select'
import '../../Style/WebSetupStyle/AddMajorStyle.scss'
import { FillCoursesForMajors, FillCoursesForMajorsByIndex } from "../../Redux/Actions/WebSetupActions/AddCourseToMajorAction";

export const InputAndSelect = (props) => {
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    // let c = useSelector(x => x.AddCourseToMajorReducer.CoursesForMajorsAccordingToYearbooks)
    let dispatch = useDispatch()
    const listSelectStaff = []
    const [selectValues, setSelectValues] = useState([{ majorName: '', routeCoordinator: null }]);

    staff.forEach(e => {
        listSelectStaff.push({ code: e.staffCode, value: e.userFirstName + " " + e.userLastName, label: e.userFirstName + " " + e.userLastName })
    })

    

    console.log("selectValues: ", selectValues);

    const handleAnothersChange = (index, selectedOption) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], routeCoordinator: selectedOption };
        setSelectValues(updatedValues);
    };

    const handleInputChange = (index, majorName) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], majorName };
        setSelectValues(updatedValues);
    };

    const handleAddSelect = () => {
        setSelectValues([...selectValues, { majorName: '', routeCoordinator: null }]);
    };

    const handleDeleteSelect = (index) => {
        const updatedValues = selectValues.filter((_, i) => i !== index);
        setSelectValues(updatedValues);
    };

    
    // console.log("c: ", c);

    useEffect(() => {
        async function fetchData() {
            let m = await axios.get('https://localhost:44367/api/Major/GetAllMajors')
            dispatch(FillMajorData(m.data))
            let s = await axios.get(`https://localhost:44367/api/Staff/GetFullStaffDataBySeminarCode/1`) //${} - when I know the seminar code.
            dispatch(FillStaffData(s.data))
        }
        fetchData()
        function handleSubmit() {
            const selectedItems = []
            selectValues.forEach(element => {
                if (!(element.majorName === '' && element.routeCoordinator === null))
                    selectedItems.push(element);
            });
            selectedItems.sort((a, b) => a.majorName > b.majorName ? 1 : -1)
            console.log(selectedItems);
            debugger
            dispatch(FillCoursesForMajorsByIndex(props.index, selectedItems))
        };
        handleSubmit()
    }, [dispatch, selectValues, props.index])

    return <>
        {selectValues.map((value, index) => (
            <div key={index} className='spaces'>
                <div className="col-3 input-effect">
                    <input
                        className="effect-19"
                        type="text"
                        placeholder="track name"
                        value={value.majorName}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onFocus={(e) => e.target.placeholder = ""}
                        onBlur={(e) => e.target.placeholder = "track name"}
                    />
                    <label>track name</label>
                    <span className="focus-border">
                        <i></i>
                    </span>
                </div>
                <div className='SelectComponent'>
                    <Select
                        placeholder="Select route coordinator"
                        maxMenuHeight={130}
                        value={value.routeCoordinator}
                        onChange={(selectedOption) => handleAnothersChange(index, selectedOption)}
                        options={listSelectStaff}
                    />
                </div>
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
        <div tabIndex="0" className="plusButton plus" onClick={handleAddSelect}>
            <svg className="plusIcon" viewBox="0 0 30 30">
                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
            </svg>
        </div>
        {/* <div className="plusButton div_next" style={{ marginBottom: '50px' }} onClick={handleSubmit}>
            <svg className="arrow" viewBox="0 0 20 20">
                <path d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0
                            L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109
                            c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483
                            c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788
                            S18.707,9.212,18.271,9.212z">
                </path>
            </svg>
            <label className="text_next">הבא</label>
        </div> */}
    </>
}
