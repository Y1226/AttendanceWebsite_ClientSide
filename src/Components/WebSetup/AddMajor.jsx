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

    const options = [
        { code: 1, value: 'chocolate', label: 'Chocolate' },
        { code: 2, value: 'strawberry', label: 'Strawberry' },
        { code: 3, value: 'vanilla', label: 'Vanilla' }
    ]
    const [animal, setAnimal] = useState(null)
    const [addMajor, setAddMajor] = useState("שם מסלול")

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

    const ShowInputs = () => {
        setIsOtherChecked(other.current.checked)
        let checked = document.getElementById('other').checked
        let otherInput = document.getElementById('addedInput')
        if (checked === true) {
            otherInput.removeAttribute('hidden')
            AddInputs()
        }
        else {
            otherInput.setAttribute('hidden', true)
            RemoveInput()
        }
    }

    const AddInputs = () => {
        let a = document.getElementById("inputPlace")
        let newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('class', 'major_new')
        newInput.setAttribute('placeholder', 'שם מסלול')
        a.appendChild(newInput)

        newInput = document.createElement('select')
        newInput.setAttribute('class', 'selectCoordinator')
        let newOption = document.createElement('option')
        newOption.setAttribute('hidden', true)
        newOption.text = 'בחרי רכזת מסלול'
        newInput.appendChild(newOption)
        for (let i = 0; i < staff.length; i++) {
            newOption = document.createElement('option')
            newOption.text = staff[i].userFirstName + staff[i].userLastName
            newInput.appendChild(newOption)
        }
        a.appendChild(newInput)
        a.appendChild(document.createElement('br'))
    }

    const RemoveInput = () => {
        debugger
        let newMajors = document.getElementsByClassName('major_new')
        newMajors[newMajors.length - 1].remove()
        let newSelect = document.getElementsByClassName('selectCoordinator')
        newSelect[newSelect.length - 1].remove()
        let br = document.getElementsByTagName('br')
        br[br.length - 1].remove()
    }

    const SaveMajors = () => {
        debugger
        let chosenMajor = document.getElementsByClassName('major_checkbox')
        let chosenLabel = document.getElementsByClassName('major_label')
        let majorList = []
        for (let i = 0; i < chosenMajor.length; i++) {
            if (chosenMajor[i].checked === true)
                majorList.push(chosenLabel[i].innerText)
        }
        localStorage.setItem('chosenExistingMajor', majorList)
        if (other.current.checked === true) {
            chosenMajor = document.getElementsByClassName('major_new')
            majorList = []
            for (let i = 0; i < chosenMajor.length; i++) {
                majorList.push(chosenMajor[i].value) //add as an object {maslulName: rakezet}.
            }
            localStorage.setItem('chosenNewMajor', majorList)
        }

        navigate('../addCourseToMajor')
    }

    return <>
        <div>
            <h1>:בחר את המסלולים בסמינר</h1>
            {
                majors.map(x => <>
                    <input className="major_checkbox" type="checkbox" />
                    <label className="major_label">{x.majorName}</label>
                    <br />
                </>)
            }
            {/* <input type="checkbox" id="other" ref={other} onChange={() => { setIsOtherChecked(other.current.checked) }}/><label>אחר</label> <br /> */}
            <input type="checkbox" id="other" ref={other} onChange={() => ShowInputs()} /><label>אחר</label> <br />
            {/*  */}
            {isOtherChecked &&
                <div>
                    <div className='plusMinus'>
                        <div className="col-3 input-effect">
                            <input className="effect-19" type="text" placeholder={addMajor} onFocus={() => setAddMajor("")} onBlur={() => setAddMajor("שם מסלול")} />
                            <label>שם מסלול</label>
                            <span className="focus-border">
                                <i></i>
                            </span>
                        </div>
                        <div className='SelectComponent'>
                            <Select placeholder="בחרי רכזת מסלול" value={animal} onChange={handleChange} options={options} />
                        </div>
                    </div>
                    <div className='plusMinus'>
                        <div tabindex="0" className="plusButton">
                            <svg className="plusIcon" viewBox="0 0 30 30">
                                <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                            </svg>
                        </div>
                        <div tabindex="0" className="plusButton">
                            <svg className="plusIcon" viewBox="0 0 30 30">
                                <path d="M13.75 23.75V16.25H6.25V13.25V13.75H23.75V16.25H16.75H13.75Z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            }
            <div id="addedInput" hidden>
                <div id="inputPlace"></div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputs()}>+</button>
                <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
            </div>
            <button style={{ backgroundColor: 'pink', padding: '5px' }} onClick={() => SaveMajors()}>הבא</button>
        </div>
        {/*  */}
        {/* {[...Array(number)].map((e, i) => {
            return <li key={i}>{i}</li>
        })}
        <input type="button" value="plus" onClick={()=> {setNumber(number+1)}}/>
        <br />
        <input type="button" value="minus" onClick={() => { setNumber(number - 1) }} /> */}
    </>
}