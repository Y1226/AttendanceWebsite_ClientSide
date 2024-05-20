// import { useCallback } from "react"
import { useEffect, useState, React, Fragment } from 'react';
import '../../Style/WebSetupStyle/AddCourseToMajorStyle.scss';
import '../../Style/WebSetupStyle/MatchStudentToMajor.scss';
import 'font-awesome/css/font-awesome.min.css';
// import { GetTheMaxNumberOfClassesInSeminarBySeminarCode } from '../../Redux/Axios/Table/Manager/AttendanceReportAxios';
import { useDispatch, useSelector } from 'react-redux';
import { GetTheDataOfTheStudentsMajorsBySeminarCode } from '../../Redux/Axios/WebSetupAxios/MatchStudentAndMajorSelectAxios';
// import { MatchStudentAndMajorSelect } from '../InputAndSelect/MatchStudentAndMajorSelect';
import Select from 'react-select'
import { getMajorBySeminarCode } from '../../Redux/Axios/WebSetupAxios/AddCourseToMajorAxios';
import { FillMajorData } from '../../Redux/Actions/WebSetupActions/AddMajorAction';
import { FillListOfStudentsAndTheirMajors, UpdateStudentsMajorInTheState } from '../../Redux/Actions/WebSetupActions/MatchStudentAndMajorSelectActions';

export const MatchStudentToMajorCopyCopy = () => {

    let dispatch = useDispatch()
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    const [data, setData] = useState({})
    const dataWithChanges = useSelector(x => x.MatchStudentToMajorReducer.listOfStudentsAndTheirMajors)
    // const [dataWithChanges, setDataWithChanges] = useState({})
    const initialMajors = useSelector(x => x.AddMajorReducer.MajorList)
    const majors = []
    initialMajors.forEach(e => {
        majors.push({ code: e.majorCode, value: e.majorName, label: e.majorName })
    })

    useEffect(() => {
        async function fetchData() {
            await getMajorBySeminarCode(currentSeminarCode).then(x => dispatch(FillMajorData(x.data)))
        }
        fetchData()
        // debugger
        GetTheDataOfTheStudentsMajorsBySeminarCode(currentSeminarCode).then(x => { dispatch(FillListOfStudentsAndTheirMajors(data)); setData(x.data) })
        // setDataWithChanges(data)
        // let maxNumberOfClassesA = GetTheMaxNumberOfClassesInSeminarByGradeAndSeminarCode('A', currentSeminarCode).then(x => x.data)
        // let maxNumberOfClassesB = GetTheMaxNumberOfClassesInSeminarByGradeAndSeminarCode('B', currentSeminarCode).then(x => x.data)

        //{A: {1: {{id:32156, userFirstName:'Yocheved',userLastName:'Pollack',major1:null},{}},2: []}}
        //{A: {1:[], 2:[]}}
        /*
        id:
        fullName:
        codeMajor1:
        codeMajor2:
         */
    }, [dispatch, currentSeminarCode, data])

    useEffect(() => {
        async function fetchData() {
            await getMajorBySeminarCode(currentSeminarCode).then(x => dispatch(FillMajorData(x.data)))
        }
        fetchData()
    }, [dispatch, currentSeminarCode]);

    // const majors = useSelector(state => state.AddMajorReducer.MajorList);
    // const majors = [{ value: 'AAA', label: 'aaa' }, { value: 'BBB', label: 'bbb' }, { value: 'CCC', label: 'ccc' }]
    const changeAndSaveChanges = (e, key, valueKey, studentIndex, isFirstMajor) => {
        console.log("e: ", e);
        console.log("key: ", key);
        console.log("valueKey: ", valueKey);
        console.log("studentIndex: ", studentIndex);
        debugger
        dispatch(UpdateStudentsMajorInTheState(e, key, valueKey, studentIndex, isFirstMajor))
        console.log(dataWithChanges);
        // console.log("dataWithChanges: ", dataWithChanges);
        // console.log(dataWithChanges[key][valueKey][studentIndex]);
        // if (isFirstMajor === true)
        //     dataWithChanges[key][valueKey][studentIndex].studentFirstMajorCode = e.code
        // else
        //     dataWithChanges[key][valueKey][studentIndex].studentSecondMajorCode = e.code
        // setDataWithChanges(dataWithChanges)
        // console.log("dataWithChanges: ", dataWithChanges);
        debugger
    }


    // const changeAndSaveChanges = () => {
    //     console.log(dataWithChanges);
    //     debugger
    // }

    return <>
        <div className="titleAddCourse">
            <label className="label" style={{ fontSize: '22px' }}>:התאימי תלמידה למסלול</label>
        </div>
        <hr style={{ background: '#607d8b', height: '1px' }} />
        <br />
        <div>
            <section className="container">
                {Object.entries(data).map(([key, value]) =>
                    Object.entries(value).map(([valueKey, valueValue], valueIndex) =>
                        <div key={valueIndex} className="ac">
                            <input className="ac-input" id={`ac-1${valueIndex}`} name={`ac-1${valueIndex}`} type="checkbox" />
                            <label className="ac-label" htmlFor={`ac-1${valueIndex}`}>{key} {valueKey}</label>
                            <article className="ac-text">
                                <div className="ac-sub specificClass">
                                    {valueValue.map((student, studentIndex) =>
                                        <Fragment key={studentIndex}>
                                            <div className='cardStudent'>
                                                { /* Drawing a student profile */}
                                                <div className="img-avatar">
                                                    <svg viewBox="0 0 100 100" fill="white">
                                                        <path d="m38.977 59.074c0 2.75-4.125 2.75-4.125 0s4.125-2.75 4.125 0"></path>
                                                        <path d="m60.477 59.074c0 2.75-4.125 2.75-4.125 0s4.125-2.75 4.125 0"></path>
                                                        <path d="m48.203 69.309c1.7344 0 3.1484-1.4141 3.1484-3.1484 0-0.27734-0.22266-0.5-0.5-0.5-0.27734 0-0.5 0.22266-0.5 0.5 0 1.1836-0.96484 2.1484-2.1484 2.1484s-2.1484-0.96484-2.1484-2.1484c0-0.27734-0.22266-0.5-0.5-0.5-0.27734 0-0.5 0.22266-0.5 0.5 0 1.7344 1.4141 3.1484 3.1484 3.1484z"></path>
                                                        <path d="m35.492 24.371c0.42187-0.35156 0.48047-0.98438 0.125-1.4062-0.35156-0.42188-0.98438-0.48438-1.4062-0.125-5.1602 4.3047-16.422 17.078-9.5312 42.562 0.21484 0.79688 0.85547 1.4062 1.6641 1.582 0.15625 0.035156 0.31641 0.050781 0.47266 0.050781 0.62891 0 1.2344-0.27344 1.6445-0.76562 0.82812-0.98828 2.0039-1.5391 2.793-1.8203 0.56641 1.6055 1.4766 3.3594 2.9727 4.9414 2.2852 2.4219 5.4336 3.9453 9.3867 4.5547-3.6055 4.5-3.8047 10.219-3.8086 10.484-0.011719 0.55078 0.42187 1.0078 0.97656 1.0234h0.023438c0.53906 0 0.98437-0.42969 1-0.97266 0-0.054688 0.17187-4.8711 2.9805-8.7773 0.63281 1.2852 1.7266 2.5 3.4141 2.5 1.7109 0 2.7578-1.2695 3.3398-2.6172 2.8867 3.9258 3.0586 8.8359 3.0586 8.8906 0.015625 0.54297 0.46094 0.97266 1 0.97266h0.023438c0.55078-0.015625 0.98828-0.47266 0.97656-1.0234-0.007812-0.26953-0.20703-6.0938-3.9141-10.613 7.0781-1.3086 10.406-5.4219 11.969-8.9766 1.0508 0.98828 2.75 2.1992 4.793 2.1992 0.078126 0 0.15625 0 0.23828-0.003906 0.47266-0.023438 1.5781-0.074219 3.4219-4.4219 1.1172-2.6406 2.1406-6.0117 2.8711-9.4922 4.8281-22.945-4.7852-30.457-9.1445-32.621-12.316-6.1172-22.195-3.6055-28.312-0.42188-0.48828 0.25391-0.67969 0.85938-0.42578 1.3477s0.85938 0.67969 1.3477 0.42578c5.7031-2.9688 14.934-5.3047 26.5 0.4375 7.1875 3.5703 9 11.586 9.2539 17.684 0.49609 11.93-4.2617 23.91-5.7344 25.062h-0.015626c-1.832 0-3.4102-1.5742-4.0352-2.2852 0.28906-0.99609 0.44531-1.8672 0.52734-2.5117 0.62891 0.16797 1.2812 0.27344 1.9727 0.27344 0.55469 0 1-0.44922 1-1 0-0.55078-0.44531-1-1-1-7.3203 0-10.703-13.941-10.734-14.082-0.097656-0.40625-0.4375-0.71094-0.85156-0.76172-0.43359-0.050781-0.82031 0.16406-1.0117 0.53906-1.8984 3.7188-1.4297 6.7539-0.67969 8.668-6.2383-2.2852-8.9766-8.6914-9.0078-8.7617-0.17969-0.43359-0.62891-0.68359-1.1016-0.60156-0.46094 0.082032-0.80469 0.47266-0.82422 0.94141-0.14062 3.3359 0.67188 5.75 1.5 7.3164-8.3125-2.4297-10.105-11.457-10.184-11.875-0.097656-0.51562-0.57422-0.86328-1.0898-0.8125-0.51953 0.054687-0.90625 0.50391-0.89062 1.0234 0.41406 13.465-1.8516 17.766-3.2383 19.133-0.66406 0.65625-1.1992 0.67188-1.2383 0.67188-0.53906-0.050781-1.0156 0.31641-1.0938 0.85156-0.078125 0.54688 0.29688 1.0547 0.84375 1.1328 0.03125 0.003906 0.11328 0.015625 0.23828 0.015625 0.36719 0 1.1016-0.09375 1.9414-0.66406 0.050781 0.38672 0.125 0.81641 0.21875 1.2656-1.0273 0.35156-2.6211 1.0781-3.7812 2.4648-0.015625 0.019532-0.054687 0.066406-0.15625 0.046875-0.039062-0.007812-0.13281-0.039062-0.16406-0.15234-2.1875-8.1094-5.7148-28.309 8.8867-40.496zm12.711 51.828c-1.0039 0-1.5898-1.207-1.8672-2.0117 0.48047 0.023438 0.95703 0.050781 1.4531 0.050781 0.74219 0 1.4453-0.035156 2.1289-0.082031-0.24219 0.83594-0.76172 2.043-1.7148 2.043zm-13.148-30.664c1.9531 3.6211 5.6367 7.9102 12.305 8.6992 0.43359 0.046875 0.83984-0.18359 1.0234-0.57422 0.18359-0.39062 0.089844-0.85938-0.22656-1.1523-0.074219-0.070312-1.2734-1.2227-1.9688-3.6367 2 2.6094 5.3359 5.6836 10.305 6.5664 0.42187 0.070312 0.83594-0.125 1.0469-0.49219 0.21094-0.36719 0.16406-0.82812-0.11719-1.1484-0.023437-0.027344-1.9414-2.2969-1.2891-5.8906 1.2227 3.5508 3.7461 9.2227 7.8945 11.551-0.03125 0.55859-0.14844 1.668-0.55078 3.0156-0.085937 0.13672-0.125 0.28516-0.13672 0.44531-1.3008 3.8906-5.0039 9.3281-15.547 9.3281-5.375 0-9.4414-1.418-12.086-4.2109-3.5664-3.7656-3.332-8.8477-3.332-8.8984v-0.011719c1.5898-2.7227 2.5-7.3203 2.6797-13.59z"></path>
                                                    </svg>
                                                </div>
                                                <h1>{student.studentFullName}</h1>
                                                <label className='titleMajor'>מסלול ראשון:</label>
                                                <div className='selectMajor'>
                                                    <Select
                                                        placeholder='בחר מסלול ראשון'
                                                        maxMenuHeight={150}
                                                        options={majors}
                                                        menuPosition='fixed'
                                                        defaultValue={majors.filter(x => x.code === student.studentFirstMajorCode)}
                                                        onChange={(e) => { changeAndSaveChanges(e, key, valueKey, studentIndex, true) }}
                                                    ></Select>
                                                </div>
                                                <label className='titleMajor'>מסלול שני:</label>
                                                <div className='selectMajor'>
                                                    <Select 
                                                        placeholder='בחר מסלול שני'
                                                        maxMenuHeight={150}
                                                        options={majors}
                                                        menuPosition='fixed'
                                                        defaultValue={majors.filter(x => x.code === student.studentSecondMajorCode)}
                                                        onChange={(e) => { changeAndSaveChanges(e, key, valueKey, studentIndex, false) }}
                                                    ></Select>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )}
                                </div>
                            </article>
                        </div>
                    )
                )}
            </section>


        </div>
        <div className="plusButton div_next" style={{ marginBottom: '50px' }}>
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
    </>

}