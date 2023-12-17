import $ from 'jquery'
import '../../../Style/Tables/Manager/PersonalAttendanceReport.scss'
import { useEffect, useRef } from 'react'
import { ShowExtraDetails } from './ShowExtraDetails'
import { useReactToPrint } from 'react-to-print'

export const PersonalAttendanceReport = () => {

    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'attendance',
        // onAfterPrint: () => alert('success')
    })
    
    // let currentStudentAttendance = useSelector(x => x.PersonalAttendanceReportReducer.AttendanceForCurrentStudent)
    let x = JSON.parse(localStorage.getItem('currentStudentAttendance'))

    useEffect(() => {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            debugger
            $(acc[i]).click(function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            })
        }
    }, [])

    return <div ref={componentRef} className="letter">
        <h2 className="title">{x.studentFirstName} {x.studentLastName}<span className="flag"></span></h2>
        <h3 className="date">מחזור: {x.studentGrade}</h3>
        <h3 className="major date">מסלול #1: {x.firstMajorName}</h3>
        <h3 className="major date">|</h3>
        <h3 className="major date">מסלול #2: {x.secondMajorName}</h3>
        {/* <div className="txt"> */}
            <div className="wrapAttendanceTable">
                {/* <div className="table-horizontal-container"> */}
                    <ShowExtraDetails MajorDetails={x.detailsForTheFirstMajor} MajorName={x.firstMajorName}></ShowExtraDetails>
                    <ShowExtraDetails MajorDetails={x.detailsForTheSecondMajor} MajorName={x.secondMajorName}></ShowExtraDetails>
                {/* </div> */}
            </div>
        {/* </div> */}
        <button onClick={handlePrint}>הדפס</button>
    </div>
}