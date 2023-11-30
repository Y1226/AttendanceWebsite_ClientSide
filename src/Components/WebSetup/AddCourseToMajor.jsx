import axios from "axios"
import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"

export const AddCourseToMajor = () => {

    let dispatch = useDispatch()
    let majors = useSelector(x => x.ManagerMajorTableReducer.MajorList)
    let currentSeminar = JSON.parse(localStorage.getItem('newSeminar')).seminarManagerPassword
    currentSeminar = axios.get(`getseminarbypassword/${currentSeminar}`).then(x => x.data) //fix to use the store with useSelector.

    const AddInputBox = useCallback((x) => {
        debugger
        let a
        let teachers = axios.get(`getteacherbyseminarcode/${currentSeminar}`).then(x => x.data) //change to useSelector
        if (x === 13)
            a = document.getElementById("addedInput13")
        else
            a = document.getElementById("addedInput14")
        let newInput = document.createElement('input')
        // newInput.setAttribute('type', 'text')
        // newInput.setAttribute('class', 'newMajor')
        // newInput.setAttribute('placeholder', 'majorName')
        // a.appendChild(newInput)

        newInput = document.createElement('input')
        newInput.setAttribute('type', 'text')
        newInput.setAttribute('class', 'newMajor')
        newInput.setAttribute('placeholder', 'courseName')
        a.appendChild(newInput)

        // <select>
        //     <option hidden>choose</option>
        //     <option>hello</option>
        //     <option>byeby</option>
        // </select>
        let select = document.createElement('select')
        newInput = document.createElement('option')
        newInput.setAttribute('hidden', true)
        newInput.innerHTML = 'בחר מורה לקורס'
        select.appendChild(newInput)
        for (let i = 0; i < teachers.length; i++) {
            newInput = document.createElement('option')
            newInput.innerHTML = teachers[i].userFirstName + ' ' + teachers[i].userLastName
        }
        a.appendChild(select)

        a.appendChild(document.createElement('br'))
    }, [currentSeminar])

    useEffect(() => {
        debugger
        async function fetchData() {
            let m = await axios.get(`https://localhost:44367/api/Major/GetMajorBySeminarCode/1`) //${} - when I know the seminar code.
            dispatch(FillMajorData(m.data))
        }
        fetchData()
        // AddInputBox(13)
        // AddInputBox(14)
    }, [AddInputBox, dispatch])

    const AddMajorToDatabase = () => {

        //https://localhost:44367/api/MajorCourses/AddAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode/{MajorCode}/{CourseGrade}/{CourseName}/{CourseTeacherCode}

        // let inputs = document.getElementsByClassName("newMajor")
        // inputs.forEach(element => {
        //     major: {element.value, null, JSON.parse(localStorage.getItem())}
        //     axios.post('https://localhost:44367/api/Major/AddMajor')
        // });
    }

    return <>
        <p>:הכנס שם מסלול</p>
        <p>יג</p>
        {
            majors.map(x => <> 
                <h4>{x.majorName}</h4>
                <div id="addedInput13"></div>
                <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(13)}>+</button> <br />
            </>)
        }
        <p>יד</p>
        {
            majors.map(x => <h4>
                {x.majorName}
            </h4>)
        }
        {/* <input type="text" className="newMajor" name="text4"></input> */}
        <div id="addedInput14"></div>
        <button style={{ backgroundColor: 'darkslateblue', padding: '5px' }} onClick={() => AddInputBox(14)}>+</button>
        <button style={{ backgroundColor: 'deepskyblue', padding: '5px' }} onClick={() => AddMajorToDatabase()}>Add</button>
    </>

}




// import { useEffect } from 'react'
// // import '../../Style/WebSetupStyle/AddCourseToMajorStyle.scss'

// export const AddCourseToMajor = () => {

//     const AddInputBox = (numberBox) => {

//         let a = document.getElementById(`addedInput${numberBox}`)
//         let newInput = document.createElement('input')
//         newInput.setAttribute('type', 'text')
//         a.appendChild(newInput)
//         a.appendChild(document.createElement('br'))
//     }

//     useEffect(() => {
//         var acc = document.getElementsByClassName("accordion");
//         var i;

//         for (i = 0; i < acc.length; i++) {
//             debugger
//             acc[i].addEventListener("click", function () {
//                 this.classList.toggle("active");
//                 var panel = this.nextElementSibling;
//                 if (panel.style.maxHeight) {
//                     panel.style.maxHeight = null;
//                 } else {
//                     panel.style.maxHeight = panel.scrollHeight + "0px";
//                 }
//             })
//         }
//     }, [])

//     return <>
//         <button className="accordion">מסלול א</button>
//         <div className="panel">
//             <p>:הכנס שם קורס</p>
//             <input type="text" name='text1'></input>
//             <div id="addedInput1"></div>
//             <button onClick={() => AddInputBox('1')}>+</button>
//         </div>

//         <button className="accordion">מסלול ב</button>
//         <div className="panel">
//             <p>:הכנס שם קורס</p>
//             <input type="text" name='text2'></input>
//             <div id="addedInput2"></div>
//             <button onClick={() => AddInputBox('2')}>+</button>
//         </div>

//         <button className="accordion">מסלול ג</button>
//         <div className="panel">
//             <p>:הכנס שם קורס</p>
//             <input type="text" name='text3'></input>
//             <div id="addedInput3"></div>
//             <button onClick={() => AddInputBox('3')}>+</button>
//         </div>
//     </>
// }