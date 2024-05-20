import '../../Style/WebSetupStyle/AddMajorStyle.scss'
import { React, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FillCurrentComponent, FillMajorsWithoutDistinct, FillSelectedMajorsData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction"
import Select from 'react-select'
import { FillCoursesForMajors } from '../../Redux/Actions/WebSetupActions/AddCourseToMajorAction'
import { GetAllMajors, GetAllMajorsWithoutDistinct, GetFullStaffDataBySeminarCode } from '../../Redux/Axios/WebSetupAxios/AddMajorAxios'
import { FillMajorData } from '../../Redux/Actions/TableActions/Teacher/MajorTableActions'

export const AddMajor = () => {
    let initialMajors = useSelector(x => x.ManagerMajorTableReducer.MajorsToSelect)
    let currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let other = useRef()
    let [isOtherChecked, setIsOtherChecked] = useState(false)
    const listSelectStaff = []
    // const majorsWithoutDistinct = useSelector(x => x.AddMajorReducer.MajorsWithoutDistinct)
    const [majors, setMajors] = useState([])

    staff.forEach(e => {
        debugger
        listSelectStaff.push({ code: e.staffCode, value: e.userFirstName + " " + e.userLastName, label: e.userFirstName + " " + e.userLastName })
    })

    useEffect(() => {
        async function fetchData() {
            await GetAllMajors().then(x => dispatch(FillMajorData(x.data)));
            await GetFullStaffDataBySeminarCode(currentSeminarCode).then(x => dispatch(FillStaffData(x.data)))
            await GetAllMajorsWithoutDistinct().then(x => dispatch(FillMajorsWithoutDistinct(x.data)))
            debugger
        }
        fetchData()
    }, [dispatch, currentSeminarCode])

    useEffect(() => {
        const derivedArray = initialMajors.map((item) => ({
            majorName: item.majorName,
            routeCoordinator: null
        }));
        setMajors(derivedArray);
    }, [initialMajors])

    // --------------------------------------------------------------------
    // const [majors, setMajors] = useState([
    //     { majorName: 'Major 1', routeCoordinator: null },
    //     { majorName: 'Major 2', routeCoordinator: null },
    //     { majorName: 'Major 3', routeCoordinator: null },
    // ]);

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (index) => {
        debugger
        if (selectedCheckboxes.includes(index)) {
            setSelectedCheckboxes(selectedCheckboxes.filter((checkbox) => checkbox !== index));
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, index]);
        }
    };

    const handleChange = (index, selectedOption) => {
        debugger
        const updatedMajors = [...majors];
        updatedMajors[index].routeCoordinator = selectedOption;
        setMajors(updatedMajors);
    };

    //Other
    const [selectValues, setSelectValues] = useState([{ majorName: '', routeCoordinator: null }]);

    const handleAnothersChange = (index, selectedOption) => {
        debugger
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], routeCoordinator: selectedOption };
        setSelectValues(updatedValues);
    };

    const handleInputChange = (index, majorName) => {
        debugger
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], majorName };
        setSelectValues(updatedValues);
    };

    const handleAddSelect = () => {
        debugger
        setSelectValues([...selectValues, { majorName: '', routeCoordinator: null }]);
    };

    const handleDeleteSelect = (index) => {
        debugger
        const updatedValues = selectValues.filter((_, i) => i !== index);
        setSelectValues(updatedValues);
    };

    const handleSubmit = () => {
        debugger
        const selectedMajors = selectedCheckboxes.map((index) => ({
            majorName: majors[index].majorName,
            routeCoordinator: majors[index].routeCoordinator ? majors[index].routeCoordinator : null,
        }));
        const selectedItems = []
        selectedMajors.forEach(element => {
            if (element.routeCoordinator !== null)
                selectedItems.push(element)
        });
        debugger
        selectValues.forEach(element => {
            debugger
            if (!(element.majorName === '' || element.routeCoordinator === null))
                selectedItems.push(element);
        });
        selectedItems.sort((a, b) => a.majorName > b.majorName ? 1 : -1)
        console.log(selectedItems);

        dispatch(FillSelectedMajorsData(selectedItems))
        dispatch(FillCoursesForMajors([...Array(selectedItems.length * 2)].map(() => null)))
        window.location.href === 'http://localhost:3000/managerNav/update' ?
            dispatch(FillCurrentComponent('Courses')) : navigate('../addCourseToMajor')
    };

    return <>
        <div>
            <div className="titleAddMajor">
                <label className="label" style={{ fontSize: '22px' }}>:בחר את המסלולים בסמינר</label>
            </div>
            <hr style={{ background: '#607d8b', height: '1px' }} />
            <br />
            {  window.location.href !== 'http://localhost:3000/managerNav/update' &&
                <div>
                {majors.map((value, index) => (
                    <div key={index} className='divCheckbox'>
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={selectedCheckboxes.includes(index)}
                            // checked={majorsWithoutDistinct[value.majorName]?.includes(currentSeminarCode) }
                            onChange={() => handleCheckboxChange(index)}
                        />
                        <label className="label">{value.majorName}</label>
                        <br />
                        {selectedCheckboxes.includes(index) && (
                            <div className='selectOfListMajors'>
                                <Select
                                    placeholder="בחר מורה"
                                    maxMenuHeight={130}
                                    menuPosition='fixed'
                                    value={value.routeCoordinator}
                                    onChange={(selectedOption) => handleChange(index, selectedOption)}
                                    options={listSelectStaff}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>}
            <div className='divCheckbox'>
                <input className="checkbox" type="checkbox" ref={other} onChange={() => { debugger; setIsOtherChecked(other.current.checked); if (!isOtherChecked) setSelectValues([{ majorName: '', routeCoordinator: null }]) }} />
                <label className='label'>אחר</label>
            </div>
        </div>
        <div>
            {isOtherChecked && selectValues.map((value, index) => (
                <div key={index} className='spaces'>
                    <div className="col-3c input-effect">
                        <input
                            className="effect-19"
                            type="text"
                            placeholder="שם המסלול"
                            value={value.majorName}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onFocus={(e) => e.target.placeholder = ""}
                            onBlur={(e) => e.target.placeholder = "שם המסלול"}
                        />
                        <label>שם המסלול</label>
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <div className='SelectComponent'>
                        <Select
                            placeholder="בחר מורה"
                            maxMenuHeight={130}
                            menuPosition='fixed'
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
            <br />
            {isOtherChecked &&
                <div tabIndex="0" className="plusButton plus" onClick={handleAddSelect}>
                    <svg className="plusIcon" viewBox="0 0 30 30">
                        <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                    </svg>
                </div>}
            <br />
            <div className="plusButton div_next" style={{ marginBottom: '50px' }} onClick={handleSubmit}>
                <svg className="arrow" viewBox="0 0 20 20">
                    <path d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0
                            L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109
                            c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483
                            c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788
                            S18.707,9.212,18.271,9.212z">
                    </path>
                </svg>
                <label className="text_next">הבא</label>
            </div>
        </div >
    </>
}