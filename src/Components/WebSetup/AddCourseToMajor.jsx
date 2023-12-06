import axios from "axios"
// import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"

export const AddCourseToMajor = () => {

    let dispatch = useDispatch()
    let majors = JSON.parse(localStorage.getItem('chosenExistingMajor'))
    let majorsNew = Object.keys(JSON.parse(localStorage.getItem('chosenNewMajor')))
    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    //let currentSeminar = JSON.parse(localStorage.getItem('newSeminar')).seminarManagerPassword
    //currentSeminar = axios.get(`getseminarbypassword/${currentSeminar}`).then(x => x.data) //fix to use the store with useSelector.

    const AddInputBox = (x, major) => {
        debugger
        let a, div
        if (x === 13) 
            a = document.getElementsByClassName("addedInput13")
        else
            a = document.getElementsByClassName("addedInput14")
        for (let i = 0; i < a.length; i++) {
            if (a[i].id === major) 
                div = a[i]
        }
        console.log(div)
        // a.forEach(element => {
        //     element === major ? div = element : 
        // });
        let newInput = document.createElement('input')
        // newInput.setAttribute('type', 'text')
        // newInput.setAttribute('class', 'newMajor')
        // newInput.setAttribute('placeholder', 'majorName')
        // a.appendChild(newInput)

        newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('class', 'newMajor')
        newInput.setAttribute('placeholder', 'courseName')
        // a.appendChild(newInput)
        div.appendChild(newInput)

        // <select>
        //     <option hidden>choose</option>
        //     <option>hello</option>
        //     <option>byeby</option>
        // </select>
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
        // a.appendChild(newInput)
        div.appendChild(newInput)

        // a.appendChild(document.createElement('br'))
        div.appendChild(document.createElement('br'))
    }

    // const RemoveInput = () => {
    //     debugger
    //     let newMajors = document.getElementsByClassName('major_new')
    //     newMajors[newMajors.length - 1].remove()
    //     let newSelect = document.getElementsByClassName('selectCoordinator')
    //     newSelect[newSelect.length - 1].remove()
    //     let br = document.getElementsByTagName('br')
    //     // br[br.length - 1].remove()
    // }

    useEffect(() => {
        debugger
        async function fetchData() {
            let m = await axios.get(`https://localhost:44367/api/Major/GetMajorBySeminarCode/1`) //${} - when I know the seminar code.
            dispatch(FillMajorData(m.data))
        }
        fetchData()
        // AddInputBox(13)
        // AddInputBox(14)
    }, [dispatch])

    const AddMajorToDatabase = () => {

        let majorsToAdd = document.getElementsByClassName('majorToAdd')

        for (let i = 0; i < majorsToAdd.length; i++) {
            let major = axios.get(`https://localhost:44367/api/Major/GetMajorByMajorName/${majorsToAdd[i].classList[1]}`).then(x => x)
            console.log(major.data);

        }

        //https://localhost:44367/api/MajorCourses/AddAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode/{MajorCode}/{CourseGrade}/{CourseName}/{CourseTeacherCode}

        // let inputs = document.getElementsByClassName("newMajor")
        // inputs.forEach(element => {
        //     major: {element.value, null, JSON.parse(localStorage.getItem())}
        //     axios.post('https://localhost:44367/api/Major/AddMajor')
        // });
    }

    return <>
        <p>:הכנס שם מסלול</p>
        {/* <p>יג</p> */}
        {
            // majors.forEach(element => {
            //     <h4>{element}</h4>
            // })
            majors.map(x => <>
                <div className={`majorToAdd ${x.major}`}>
                    <h4>{x.major}</h4>
                    <p>יג</p>
                    <div id={x.major} className="addedInput13"></div>
                    <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x.major)}>+</button> <br />
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
                    <p>יד</p>
                    <div id={x.major} className="addedInput14"></div>
                    <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(14, x.major)}>+</button> <br />
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
                </div>
                {/* <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x.major)}>+</button> <br /> */}
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
            </>)
        }
        {
            majorsNew.map(x => <>
                <div className={`majorToAdd ${x}`}>
                    <h4>{x}</h4>
                    <p>יג</p>
                    <div id={x} className="addedInput13"></div>
                    <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x)}>+</button> <br />
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
                    <p>יד</p>
                    <div id={x} className="addedInput14"></div>
                    <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(14, x)}>+</button> <br />
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
                </div>
                {/* <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x)}>+</button> <br /> */}
                {/* <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button> */}
            </>)
        }
        {/* <p>יד</p> */}
        {/* {
            majors.map(x => <>
                <div className={`majorToAdd ${x.major}`}>
                    <h4>{x.major}</h4>
                    <div id={x.major} className="addedInput14"></div>
                </div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x.major)}>+</button> <br />
                <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
            </>)
        }
        {
            majorsNew.map(x => <>
                <div className={`majorToAdd ${x}`}>
                    <h4>{x}</h4>
                    <div id={x} className="addedInput14"></div>
                </div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13, x)}>+</button> <br />
                <button style={{ backgroundColor: 'lightblue', padding: '5px' }} onClick={() => RemoveInput()}>-</button>
            </>)
        } */}
        {/* <input type="text" className="newMajor" name="text4"></input> */}
        <button style={{ backgroundColor: 'deepskyblue', padding: '5px' }} onClick={() => AddMajorToDatabase()}>Add</button>
    </>

}