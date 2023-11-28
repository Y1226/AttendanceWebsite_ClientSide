// import '../../Style/WebSetupStyle/AddMajorStyle.scss'

import axios from "axios"
import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"
import { FillStaffData } from "../../Redux/Actions/TableActions/Manager/TeacherTableAction"

export const AddMajor = () => {

    let majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let other = useRef()

    useEffect(() => {
        async function fetchData() {
            let m = await axios.get('https://localhost:44367/api/Major/GetAllMajors')
            dispatch(FillMajorData(m.data))
            let s = await axios.get(`https://localhost:44367/api/Staff/GetFullStaffDataBySeminarCode/1`) //${} - when I know the seminar code.
            dispatch(FillStaffData(s.data))
        }
        fetchData()
    }, [dispatch])

    const ShowInputs = () => {
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
            newOption.text = staff[i].userFirstName + ' ' + staff[i].userLastName
            newInput.appendChild(newOption)
        }
        a.appendChild(newInput)
        a.appendChild(document.createElement('br'))
    }

    const RemoveInput = () => {
        debugger
        try {
            let newMajors = document.getElementsByClassName('major_new')
            newMajors[newMajors.length - 1].remove()
            let newSelect = document.getElementsByClassName('selectCoordinator')
            newSelect[newSelect.length - 1].remove()
            let br = document.getElementsByTagName('br')
            br[br.length - 1].remove()
        } catch (error) {
            return 0
        }
    }

    const SaveMajors = () => {
        let chosenMajor = document.getElementsByClassName('major_checkbox')
        let chosenLabel = document.getElementsByClassName('major_label')
        let majorList = []
        for (let i = 0; i < chosenMajor.length; i++) {
            if (chosenMajor[i].checked === true)
                majorList.push(chosenLabel[i].innerText)
        }
        localStorage.setItem('chosenExistingMajor', majorList)
        if (other.current.checked === true) {
            // if (document.getElementById('other').checked === true) {
            chosenMajor = document.getElementsByClassName('major_new')
            let chosenMajorCoordinator = document.getElementsByClassName('selectCoordinator')
            majorList = {}
            for (let i = 0; i < chosenMajor.length; i++) {
                majorList[chosenMajor[i].value] = chosenMajorCoordinator[i].value
                let index = chosenMajorCoordinator[i].value.split(' ')
                let majorCodeCoordinator = staff.find(x => x.userFirstName === index[0] && x.userLastName === index[1])
                let majorElement = {majorName: chosenMajor[i].value, majorCodeCoordinator: majorCodeCoordinator.staffCode, seminarCode: '1'}
                axios.post('https://localhost:44367/api/Major/AddMajor', majorElement)
            }
            localStorage.setItem('chosenNewMajor', JSON.stringify(majorList))
        }

        navigate('../addCourseToMajor')
    }

    return <div>
        <h1>:בחר את המסלולים בסמינר</h1>
        {
            majors.map(x => <>
                <input className="major_checkbox" type="checkbox" />
                <label className="major_label">{x.majorName}</label>
                <br />
            </>)
        }
        <input type="checkbox" id="other" ref={other} onChange={() => ShowInputs()} /><label>אחר</label> <br />
        <div id="addedInput" hidden>
            <div id="inputPlace"></div>
            <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputs()}>+</button>
            <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
        </div>
        <button style={{ backgroundColor: 'pink', padding: '5px' }} onClick={() => SaveMajors()}>הבא</button>
    </div>
}