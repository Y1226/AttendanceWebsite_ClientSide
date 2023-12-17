import '../../Style/WebSetupStyle/AddMajorStyle.scss'

import axios from "axios"
import { React, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction"
import Select from 'react-select'

export const AddMajor = () => {
    debugger
    let majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let other = useRef()
    let [isOtherChecked, setIsOtherChecked] = useState(false)
    const listSelectStaff = []
    const [majorsToSelect, setMajorsToSelect] = useState([])

    // majors.forEach(e => {
    //     majorsToSelect.push({nameMajor: e.majorName, statusMajor: true })
    // })

    staff.forEach(e => {
        listSelectStaff.push({ code: e.staffCode, value: e.userFirstName + " " + e.userLastName, label: e.userFirstName + " " + e.userLastName })
    })

    useEffect(() => {
        async function fetchData() {
            let m = await axios.get('https://localhost:44367/api/Major/GetAllMajors')
            dispatch(FillMajorData(m.data))
            let s = await axios.get(`https://localhost:44367/api/Staff/GetFullStaffDataBySeminarCode/1`) //${} - when I know the seminar code.
            dispatch(FillStaffData(s.data))
        }
        fetchData()
    }, [dispatch])

    // const handleChange = (value) => {
    //     debugger
    //     console.log("value:", value);
    //     alert("code: " + value.code + ", value: " + value.value)
    //     setAnimal(value);
    // };

    // const ShowInputs = () => {
    //     setIsOtherChecked(other.current.checked)
    //     let checked = document.getElementById('other').checked
    //     let otherInput = document.getElementById('addedInput')
    //     if (checked === true) {
    //         otherInput.removeAttribute('hidden')
    //         AddInputs()
    //     }
    //     else {
    //         otherInput.setAttribute('hidden', true)
    //         RemoveInput()
    //     }
    // }

    // const AddInputs = () => {
    //     let a = document.getElementById("inputPlace")
    //     let newInput = document.createElement('input')
    //     newInput.setAttribute('type', 'text')
    //     newInput.setAttribute('class', 'major_new')
    //     newInput.setAttribute('placeholder', 'שם מסלול')
    //     a.appendChild(newInput)

    //     newInput = document.createElement('select')
    //     newInput.setAttribute('class', 'selectCoordinator')
    //     let newOption = document.createElement('option')
    //     newOption.setAttribute('hidden', true)
    //     newOption.text = 'בחרי רכזת מסלול'
    //     newInput.appendChild(newOption)
    //     for (let i = 0; i < staff.length; i++) {
    //         newOption = document.createElement('option')
    //         newOption.text = staff[i].userFirstName + ' ' + staff[i].userLastName
    //         newInput.appendChild(newOption)
    //     }
    //     a.appendChild(newInput)
    //     a.appendChild(document.createElement('br'))
    // }

    //     const RemoveInput = () => {
    //         debugger
    //         let newMajors = document.getElementsByClassName('major_new')
    //         newMajors[newMajors.length - 1].remove()
    //         let newSelect = document.getElementsByClassName('selectCoordinator')
    //         newSelect[newSelect.length - 1].remove()
    //         let br = document.getElementsByTagName('br')
    //         br[br.length - 1].remove()
    //     }

    // const createElementsForOther = (number) => {
    //     // var elementsOther = [];
    //     for (let i = 0; i < number; i++) {
    //         elementsOther.push(
    //             <div key={i} className='spaces'>
    //                 <div className="col-3 input-effect">
    //                     <input className="effect-19" type="text" placeholder={"שם מסלול"} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "שם מסלול"} />
    //                     <label>שם מסלול</label>
    //                     <span className="focus-border">
    //                         <i></i>
    //                     </span>
    //                 </div>
    //                 <div className='SelectComponent'>
    //                     <Select placeholder="בחרי רכזת מסלול" maxMenuHeight={130} onChange={handleChange} options={listSelectStaff} />
    //                 </div>
    //             </div>
    //         );
    //     }
    //     return elementsOther;
    // }

    const SaveMajors = () => {
        // let chosenMajor = document.getElementsByClassName('major_checkbox')
        let chosenMajor = document.getElementsByClassName('checkbox')
        // let chosenLabel = document.getElementsByClassName('major_label')
        // let chosenLabel = document.getElementsByClassName('label')
        let chosenLabel = document.getElementsByClassName('divCheckbox')
        let majorList = []
        for (let i = 0; i < chosenLabel.length; i++) {
            if (chosenLabel[i].getElementsByClassName('checkbox')[0].checked)
                majorList.push({ 'major': chosenLabel[i].getElementsByClassName('label')[0].innerHTML })
            // if (chosenLabel[0].checked === true)
            //     majorList.push({'major': chosenLabel[i].innerText})
        }
        // for (let i = 0; i < chosenMajor.length; i++) {
        //     if (chosenMajor[i].checked === true)
        //         majorList.push({'major': chosenLabel[i].innerText})
        // }
        localStorage.setItem('chosenExistingMajor', JSON.stringify(majorList))
        // ===================================================================
        debugger
        if (other.current.checked) {
            chosenMajor = document.getElementsByClassName('spaces')
            let chosenMajorCoordinator = document.getElementsByClassName('selectCoordinator')
            majorList = {}
            for (let i = 0; i < chosenMajor.length; i++) {
                debugger
                // let majorItem = {}
                majorList[chosenMajor[i].value] = chosenMajorCoordinator[i].value
                // majorList.push(majorItem)
                let index = chosenMajorCoordinator[i].value.split(' ')
                let majorCodeCoordinator = staff.find(x => x.userFirstName === index[0] && x.userLastName === index[1])
                let majorElement = { majorName: `N'${chosenMajor[i].value}'`, majorCodeCoordinator: majorCodeCoordinator.staffCode, seminarCode: '1' }
                axios.post('https://localhost:44367/api/Major/AddMajor', majorElement)
            }
            localStorage.setItem('chosenNewMajor', JSON.stringify(majorList))
        }

        navigate('../addCourseToMajor')
    }

    const [selectValues, setSelectValues] = useState([{ selectValue: null, inputValue: '' }]);

    const handleChange = (index, selectedOption) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], selectValue: selectedOption };
        setSelectValues(updatedValues);
    };

    const handleInputChange = (index, inputValue) => {
        const updatedValues = [...selectValues];
        updatedValues[index] = { ...updatedValues[index], inputValue };
        setSelectValues(updatedValues);
    };

    const handleAddSelect = () => {
        setSelectValues([...selectValues, { selectValue: null, inputValue: '' }]);
    };

    const handleDeleteSelect = (index) => {
        const updatedValues = selectValues.filter((_, i) => i !== index);
        setSelectValues(updatedValues);
    };

    const handleSubmit = () => {
        const dictionary = {};
        selectValues.forEach((value, index) => {
            dictionary[`select${index}`] = value.selectValue;
            dictionary[`input${index}`] = value.inputValue;
        });
        console.log(dictionary);
        console.log(selectValues);
        SaveMajors();
    };

    return <>
        <div>
            <div className="titleAddMajor">
                <label className="label" style={{ fontSize: '22px' }}>:בחר את המסלולים בסמינר</label>
            </div>
            <hr style={{ background: '#607d8b', height: '1px' }} />
            <br />
            {majors.map((value, index) => (
                <div key={index} className='divCheckbox'>
                    <input className="checkbox" type="checkbox" />
                    <label className="label">{value.majorName}</label>
                </div>
            ))}
            <div className='divCheckbox'>
                <input className="checkbox" type="checkbox" ref={other} onChange={() => { setIsOtherChecked(other.current.checked); if (!isOtherChecked) setSelectValues([{ selectValue: null, inputValue: '' }]) }} />
                <label className='label'>אחר</label>
            </div>
        </div>
        <div>
            {isOtherChecked && selectValues.map((value, index) => (
                <div key={index} className='spaces'>
                    <div className="col-3 input-effect">
                        <input
                            className="effect-19"
                            type="text"
                            placeholder="track name"
                            value={value.inputValue}
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
                            value={value.selectValue}
                            onChange={(selectedOption) => handleChange(index, selectedOption)}
                            options={listSelectStaff}
                        />
                    </div>
                    <button className="plusButton" style={{ flexDirection: 'column' }} onClick={() => handleDeleteSelect(index)}>
                        <svg className="bin-top" viewBox="0 0 39 7">
                            <line y1="5" x2="39" y2="5" stroke-width="4"></line>
                            <line x1="12" y1="1.5" x2="26.0357" y2="1.5" stroke-width="3"></line>
                        </svg>
                        <svg className="bin-bottom" viewBox="0 0 33 39">
                            <mask>
                                <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                            </mask>
                            <path d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"></path>
                            <path d="M12 6L12 29" stroke-width="4"></path>
                            <path d="M21 6V29" stroke-width="4"></path>
                        </svg>
                    </button>
                </div>
            ))}
            <br />
            {isOtherChecked &&
                <div tabindex="0" className="plusButton plus" onClick={handleAddSelect}>
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
            {/* <button onClick={handleSubmit}>Submit</button> */}
        </div >
    </>
}

/*
<input type="checkbox" id="other" ref={other} onChange={() => { setIsOtherChecked(other.current.checked) }}/><label>אחר</label> <br />
<input type="checkbox" id="other" ref={other} onChange={() => ShowInputs()} /><label>אחר</label> <br /> 
  
{isOtherChecked && [...Array(number)].map((e, i) => {
                return <div key={i} className='spaces'>
                    <div className="col-3 input-effect">
                        <input className="effect-19 newMajorName" type="text" placeholder={"שם מסלול"} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "שם מסלול"} />
                        <label>שם מסלול</label>
                        <span className="focus-border">
                            <i></i>
                        </span>
                    </div>
                    <div className='SelectComponent'>
                        <Select placeholder="בחרי רכזת מסלול" maxMenuHeight={130} onChange={handleChange} options={listSelectStaff} />
                    </div>
                </div>
            })}
{isOtherChecked && createElementsForOther(number)}
{isOtherChecked &&
                <div className='spaces'>
                    <div tabindex="0" className="plusButton" onClick={() => { setNumber(number + 1); arrOtherCodesCoordinator.push(null) }}>
                        <svg className="plusIcon" viewBox="0 0 30 30">
                            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                        </svg>
                    </div>
                    <div tabindex="0" className="plusButton" onClick={() => { if (number > 1) setNumber(number - 1); else setNumber(1); arrOtherCodesCoordinator.pop() }}>
                        <svg className="plusIcon" viewBox="0 0 30 30">
                            <path d="M13.75 23.75V16.25H6.25V13.25V13.75H23.75V16.25H16.75H13.75Z"></path>
                        </svg>
                    </div>
                </div>
            }


<div id="addedInput" hidden>
                <div id="inputPlace"></div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputs()}>+</button>
                <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
            </div>
<button style={{ backgroundColor: 'pink', padding: '5px' }} onClick={() => SaveMajors()}>הבא</button>
{[...Array(number)].map((e, i) => {
            return <li key={i}>{i}</li>
        })}
         <input type="button" value="plus" onClick={()=> {setNumber(number+1)}}/>
        <br />
        <input type="button" value="minus" onClick={() => { setNumber(number - 1) }} />
<button onClick={() => handleDeleteSelect(index)}>Delete Select</button>
<button onClick={handleAddSelect}>Add Select</button>

 */