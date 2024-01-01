// import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FillMajorData } from "../../Redux/Actions/WebSetupActions/AddMajorAction"
import '../../Style/WebSetupStyle/AddCourseToMajorStyle.scss'
import { InputAndSelect } from "../InputAndSelect/InputAndSelect"
import 'font-awesome/css/font-awesome.min.css';
import { addAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode, addMajor, getMajorByMajorName, getMajorBySeminarCode } from "../../Redux/Axios/WebSetupAxios/AddCourseToMajorAxios"
import { useNavigate } from "react-router-dom"


export const AddCourseToMajor = () => {

    let dispatch = useDispatch()
    let majors = []//JSON.parse(localStorage.getItem('chosenExistingMajor'))
    let majorsNew = []//Object.keys(JSON.parse(localStorage.getItem('chosenNewMajor')))
    let selectedMajors = JSON.parse(localStorage.getItem('selectedMajors'))
    let arrayCourses = useSelector(x => x.AddCourseToMajorReducer.CoursesForMajorsAccordingToYearbooks)
    let navigate = useNavigate()

    // console.log("selectedMajors: ", selectedMajors);

    let staff = useSelector(x => x.TeacherTableReducer.StaffList)
    const currentSeminarCode = useSelector(x => x.SignInReducer.currentSeminarCode)
    //let currentSeminar = JSON.parse(localStorage.getItem('newSeminar')).seminarManagerPassword
    //currentSeminar = axios.get(`getseminarbypassword/${currentSeminar}`).then(x => x.data) //fix to use the store with useSelector.

    //const [major, setMajor] = useState()

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
            await getMajorBySeminarCode(currentSeminarCode).then(x => dispatch(FillMajorData(x.data)))
        }
        fetchData()
        // AddInputBox(13)
        // AddInputBox(14)
    }, [dispatch, currentSeminarCode])

    const handleSubmit = async () => {
        for (let index = 0; index < selectedMajors.length; index++) {
            let element = selectedMajors[index];
            let currentMajor = await getMajorByMajorName(element.majorName).then(x => x.data)
            if (currentMajor === '') {
                let majorToAdd = {
                    // "majorCode": 0,
                    "majorName": element.majorName,
                    "majorCodeCoordinator": element.routeCoordinator.code,
                    "seminarCode": 1 //need to check what seminar code
                }
                currentMajor = await addMajor(majorToAdd).then(x => x.data);
            }

            //Year A 
            if (arrayCourses[index * 2] !== null)
                for (let x = 0; x < arrayCourses[index * 2].length; x++) {
                    let currentCourse = arrayCourses[index * 2][x];
                    await addAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode(currentMajor.majorCode, 'A',currentCourse.courseName, currentCourse.routeCoordinator.code)
                }

            //Year B
            if (arrayCourses[(index * 2) + 1] !== null)
                for (let x = 0; x < arrayCourses[(index * 2) + 1].length; x++) {
                    let currentCourse = arrayCourses[(index * 2) + 1][x];
                    await addAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode(currentMajor.majorCode, 'B', currentCourse.courseName, currentCourse.routeCoordinator.code)
                }
        };
        navigate('../../managerNav/teacherTable')
    }

    // const AddMajorToDatabase = () => {
    //     let majorsToAdd = document.getElementsByClassName('majorToAdd')
    //     // fetch('http://localhost:8080/posts')
    //     // .then(function(response){ return response.json(); })
    //     // .then(function(data) {
    //     //     const items = data;
    //     //     console.log(items)
    //     // })
    //     for (let i = 0; i < majorsToAdd.length; i++) {
    //         axios.get(`https://localhost:44367/api/Major/GetMajorByMajorName/${majorsToAdd[i].classList[1]}`)
    //             .then(x => {
    //                 let major = x.data;
    //                 console.log(major);
    //             })

    //     }

    //     //https://localhost:44367/api/MajorCourses/AddAMajorCoursesByMajorCodeAndCourseGradeAndCourseNameAndCourseTeacherCode/{MajorCode}/{CourseGrade}/{CourseName}/{CourseTeacherCode}

    //     // let inputs = document.getElementsByClassName("newMajor")
    //     // inputs.forEach(element => {
    //     //     major: {element.value, null, JSON.parse(localStorage.getItem())}
    //     //     axios.post('https://localhost:44367/api/Major/AddMajor')
    //     // });
    // }

    return <>
        <div className="titleAddCourse">
            <label className="label" style={{ fontSize: '22px' }}>:הכנס את הקורסים למסלולים בסמינר</label>
        </div>
        <hr style={{ background: '#607d8b', height: '1px' }} />
        <br />
        {selectedMajors.map((value, index) => (
            <section key={index} className="container">
                <div className="ac">
                    <input className="ac-input" id={`ac-1${index}`} name={`ac-1${index}`} type="checkbox" />
                    <label className="ac-label" htmlFor={`ac-1${index}`}>{value.majorName}</label>
                    <article className="ac-text">
                        <div className="ac-sub">
                            <input className="ac-input" id={`ac-2${index}`} name={`ac-2${index}`} type="checkbox" />
                            <label className="ac-label" htmlFor={`ac-2${index}`}>יג</label>
                            <article className="ac-sub-text">
                                <InputAndSelect index={index * 2} />
                            </article>
                        </div>
                        <div className="ac-sub">
                            <input className="ac-input" id={`ac-3${index}`} name={`ac-3${index}`} type="checkbox" />
                            <label className="ac-label" htmlFor={`ac-3${index}`}>יד</label>
                            <article className="ac-sub-text">
                                <InputAndSelect index={(index * 2) + 1} />
                            </article>
                        </div>
                    </article>
                </div>
            </section >
        ))}
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

        {/* <button type="submit" onClick={() => { debugger; }}>Submit</button> */}
        {/*  */}
        {/*  */}
        {/*  */}
        {/* <p>:הכנס שם מסלול</p> */}
        {/* <p>יג</p> */}
        {
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
        {/* <button style={{ backgroundColor: 'deepskyblue', padding: '5px' }} onClick={() => AddMajorToDatabase()}>Add</button> */}



        {/* <div class="ac">

                <input class="ac-input" id="ac-4" name="ac-4" type="checkbox" />
                <label class="ac-label" for="ac-4">Item 2</label>

                <article class="ac-text">

                    <div class="ac-sub">
                        <input class="ac-input" id="ac-5" name="ac-5" type="checkbox" />
                        <label class="ac-label" for="ac-5">I also love regular donuts</label>
                        <article class="ac-sub-text">
                            <p>But not only is the sea such a foe to man who is an alien to it, but it is also a fiend to its own off-spring; worse than the Persian host who murdered his own guests; sparing not the creatures which itself hath spawned. Like a savage tigress that tossing in the jungle overlays her own cubs, so the sea dashes even the mightiest whales against the rocks, and leaves them there side by side with the split wrecks of ships. No mercy, no power but its own controls it. Panting and snorting like a mad battle steed that has lost its rider, the masterless ocean overruns the globe.</p>

                            <p>Consider the subtleness of the sea; how its most dreaded creatures glide under water, unapparent for the most part, and treacherously hidden beneath the loveliest tints of azure. Consider also the devilish brilliance and beauty of many of its most remorseless tribes, as the dainty embellished shape of many species of sharks. Consider, once more, the universal cannibalism of the sea; all whose creatures prey upon each other, carrying on eternal war since the world began.</p>
                        </article>
                    </div>

                    <div class="ac-sub">
                        <input class="ac-input" id="ac-6" name="ac-6" type="checkbox" />
                        <label class="ac-label" for="ac-6">They are also delicious</label>
                        <article class="ac-sub-text">
                            <p>My younger brother was in London when the Martians fell at Woking. He was a medical student working for an imminent examination, and he heard nothing of the arrival until Saturday morning.  The morning papers on Saturday contained, in addition to lengthy special articles on the planet Mars, on life in the planets, and so forth, a brief and vaguely worded telegram, all the more striking for its brevity.</p>

                            <p>The Martians, alarmed by the approach of a crowd, had killed a number of people with a quick-firing gun, so the story ran.  The telegram concluded with the words: "Formidable as they seem to be, the Martians have not moved from the pit into which they have fallen, and, indeed, seem incapable of doing so.  Probably this is due to the relative strength of the earth's gravitational energy."  On that last text their leader-writer expanded very comfortingly.</p>
                        </article>
                    </div>

                </article>

            </div> */}
    </>

}