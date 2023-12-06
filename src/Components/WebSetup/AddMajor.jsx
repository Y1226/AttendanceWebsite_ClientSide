import '../../Style/WebSetupStyle/AddMajorStyle.scss'

import axios from "axios"
import { React, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction"
import Select from 'react-select'

export const AddMajor = () => {

    let majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let other = useRef()
    let [isOtherChecked, setIsOtherChecked] = useState(false)
    let [number, setNumber] = useState(1)
    const listSelectStaff = []

    const [animal, setAnimal] = useState(null)

    
    staff.forEach(e => {
        listSelectStaff.push({ code: e.staffCode, value: e.userFirstName + " " + e.userLastName , label: e.userFirstName + " " + e.userLastName })
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

    const handleChange = (value) => {
        console.log("value:", value);
        alert("code: " + value.code + ", value: " + value.value)
        setAnimal(value);
    };

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

    const SaveMajors = () => {
        debugger
        // let chosenMajor = document.getElementsByClassName('major_checkbox')
        let chosenMajor = document.getElementsByClassName('checkbox')
        // let chosenLabel = document.getElementsByClassName('major_label')
        // let chosenLabel = document.getElementsByClassName('label')
        let chosenLabel = document.getElementsByClassName('divCheckbox')
        let majorList = []
        for (let i = 0; i < chosenLabel.length; i++) {
            debugger
            if(chosenLabel[i].getElementsByClassName('checkbox')[0].checked)
                majorList.push({'major': chosenLabel[i].getElementsByClassName('label')[0].innerHTML})
            // if (chosenLabel[0].checked === true)
            //     majorList.push({'major': chosenLabel[i].innerText})
        }
        // for (let i = 0; i < chosenMajor.length; i++) {
        //     if (chosenMajor[i].checked === true)
        //         majorList.push({'major': chosenLabel[i].innerText})
        // }
        localStorage.setItem('chosenExistingMajor', JSON.stringify(majorList))
        if (other.current.checked) {
            chosenMajor = document.getElementsByClassName('major_new')
            let chosenMajorCoordinator = document.getElementsByClassName('selectCoordinator')
            majorList = {}
            for (let i = 0; i < chosenMajor.length; i++) {
                debugger
                // let majorItem = {}
                majorList[chosenMajor[i].value] = chosenMajorCoordinator[i].value
                // majorList.push(majorItem)
                let index = chosenMajorCoordinator[i].value.split(' ')
                let majorCodeCoordinator = staff.find(x => x.userFirstName === index[0] && x.userLastName === index[1])
                let majorElement = { majorName: chosenMajor[i].value, majorCodeCoordinator: majorCodeCoordinator.staffCode, seminarCode: '1' }
                axios.post('https://localhost:44367/api/Major/AddMajor', majorElement)
            }
            localStorage.setItem('chosenNewMajor', JSON.stringify(majorList))
        }

        navigate('../addCourseToMajor')
    }

    return <>
        <div>
            <div className="title">
                <label className="label" style={{fontSize: '22px'}}>:בחר את המסלולים בסמינר</label>
            </div>
            <br />
            {
                majors.map(x => <>
                    <div className='divCheckbox'>
                    <input className="checkbox" type="checkbox" />
                    <label className="label">{x.majorName}</label>
                    </div>
                    <br />
                </>)
            }
            {/* <input type="checkbox" id="other" ref={other} onChange={() => { setIsOtherChecked(other.current.checked) }}/><label>אחר</label> <br /> */}
            {/* <input type="checkbox" id="other" ref={other} onChange={() => ShowInputs()} /><label>אחר</label> <br /> */}
            <div className='divCheckbox'>
                <input className="checkbox" type="checkbox" ref={other} onChange={() => setIsOtherChecked(other.current.checked)} />
                <label className='label'>אחר</label>
            </div>
            {/*  */}
            {isOtherChecked && [...Array(number)].map((e, i) => {
                return <div key={i} className='spaces'>
                    <div className="col-3 input-effect">
                        <input className="effect-19" type="text" placeholder={"שם מסלול"} onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = "שם מסלול"} />
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
            {isOtherChecked &&
                <div className='spaces'>
                    <div tabindex="0" className="plusButton" onClick={() => { setNumber(number + 1) }}>
                        <svg className="plusIcon" viewBox="0 0 30 30">
                            <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                        </svg>
                    </div>
                    <div tabindex="0" className="plusButton" onClick={() => { if (number > 1) setNumber(number - 1); else setNumber(1) }}>
                        <svg className="plusIcon" viewBox="0 0 30 30">
                            <path d="M13.75 23.75V16.25H6.25V13.25V13.75H23.75V16.25H16.75H13.75Z"></path>
                        </svg>
                    </div>
                </div>
            }
            {/* ****************************************** */}
            {/* <div id="addedInput" hidden>
                <div id="inputPlace"></div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputs()}>+</button>
                <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
            </div> */}
            <button style={{ backgroundColor: 'pink', padding: '5px' }} onClick={() => SaveMajors()}>הבא</button>
        </div>
        {/*  */}
        {/*{[...Array(number)].map((e, i) => {
            return <li key={i}>{i}</li>
        })}
         <input type="button" value="plus" onClick={()=> {setNumber(number+1)}}/>
        <br />
        <input type="button" value="minus" onClick={() => { setNumber(number - 1) }} /> */}
    </>
}