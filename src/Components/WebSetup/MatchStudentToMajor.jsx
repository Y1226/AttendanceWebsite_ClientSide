// import { useCallback } from "react"
import { useEffect, useState } from 'react';
import '../../Style/WebSetupStyle/AddCourseToMajorStyle.scss'
import 'font-awesome/css/font-awesome.min.css';
import { GetTheMaxNumberOfClassesInSeminarBySeminarCode } from '../../Redux/Axios/Table/Manager/AttendanceReportAxios';
import { useSelector } from 'react-redux';
import { GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode } from '../../Redux/Axios/WebSetupAxios/MatchStudentAndMajorSelectAxios';
import { MatchStudentAndMajorSelect } from '../InputAndSelect/MatchStudentAndMajorSelect';


export const MatchStudentToMajor = () => {

    let currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    const [studentsA, setStudentsA] = useState([]);
    const [studentsB, setStudentsB] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let maxNumOfClasses = await GetTheMaxNumberOfClassesInSeminarBySeminarCode(currentSeminarCode).then(x => x.data)
            const studentsArrayA = []

            await Promise.all(
                Array.from({ length: maxNumOfClasses }, (_, index) => index).map(async (x) => {
                    const studentsPerClass = await GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode('A', x + 1, currentSeminarCode).then((x) => x.data);
                    studentsArrayA.push({ class: `A${x + 1}`, stds: studentsPerClass });
                })
            );
            setStudentsA(studentsArrayA);
            console.log(studentsArrayA);

            const studentsArrayB = []
            await Promise.all(
                Array.from({ length: maxNumOfClasses }, (_, index) => index).map(async (x) => {
                    const studentsPerClass = await GetAllStudentsByStudentGradeAndStudentClassNumberAndSeminarCode('B', x + 1, currentSeminarCode).then((x) => x.data);
                    studentsArrayB.push({ class: `B${x + 1}`, stds: studentsPerClass });
                })
            );
            setStudentsB(studentsArrayB);
            console.log(studentsArrayB);
        }
        fetchData()
        // console.log(students);
    },[currentSeminarCode])
    
    return <>
        <div className="titleAddCourse">
            <label className="label" style={{ fontSize: '22px' }}>:התאימי תלמידה למסלול</label>
        </div>
        <hr style={{ background: '#607d8b', height: '1px' }} />
        <br />
        {
            studentsA.map((value, index) => (
                <section key={index} className="container">
                    <input className="ac-input" id={`ac-1${index}`} name={`ac-1${index}`} type="checkbox" />
                    <label className="ac-label" htmlFor={`ac-1${index}`}>יג{index + 1}</label>
                    <article className="ac-text">
                        <div className="ac-sub">
                            <MatchStudentAndMajorSelect students={studentsA[studentsA.findIndex(student => student.class === `A${index+1}`)].stds} />
                        </div>
                    </article>
                </section >
            ))
        }
        {
            studentsB.map((value, index) => (
                <section key={index} className="container">
                    <input className="ac-input" id={`ac-2${index}`} name={`ac-2${index}`} type="checkbox" />
                    <label className="ac-label" htmlFor={`ac-2${index}`}>יד{index + 1}</label>
                    <article className="ac-text">
                        <div className="ac-sub">
                            <MatchStudentAndMajorSelect students={studentsB[studentsB.findIndex(student => student.class === `B${index+1}`)].stds} />
                        </div>
                    </article>
                </section >
            ))
        }
        <div className="plusButton div_next" style={{ marginBottom: '50px' }} /*onClick={handleSubmit}*/>
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