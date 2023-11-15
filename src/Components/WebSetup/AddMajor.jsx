// import '../../Style/WebSetupStyle/AddMajorStyle.scss'

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

export const AddMajor = () => {

    let majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    let navigate = useNavigate()

    const ShowInputs = () => {
        let checked = document.getElementById('other').checked
        let otherInput = document.getElementById('addedInput')
        if (checked === true)
            otherInput.removeAttribute('hidden')
        else
            otherInput.setAttribute('hidden', true)

    }

    const AddInputs = () => {
        let a = document.getElementById("inputPlace")
        let newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('class', 'newMajor')
        newInput.setAttribute('placeholder', 'שם מסלול')
        a.appendChild(newInput)

        a.appendChild(document.createElement('br'))
    }

    const SaveMajors = () => {
        
        navigate('../addCourseToMajor')
    }

    return <div>
        <h1>:בחר את המסלולים בסמינר</h1>
        {
            majors.map(x => <>
                <input type="checkbox" />
                <label>{x.majorName}</label>
                <br />
            </>)
        }
        <input type="checkbox" id="other" onChange={() => ShowInputs()} /><label>אחר</label> <br />
        <div id="addedInput" hidden>
            <input type="text" placeholder="שם מסלול" />
            <div id="inputPlace"></div>
            <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputs()}>+</button>
        </div>
        <button style={{ backgroundColor: 'pink', padding: '5px' }} onClick={() => SaveMajors()}>הבא</button>
    </div>
}