import { useEffect, useRef } from 'react'
import '../../../Style/Tables/Manager/ChangingTable.scss'
import { useReactToPrint } from 'react-to-print'
import { ShowExtraDetails } from './ShowExtraDetails'
import $ from 'jquery'

export const ChangingTable = () => {

  let x = JSON.parse(localStorage.getItem('currentStudentAttendance'))

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'attendance',
    // onAfterPrint: () => alert('success')
  })

  useEffect(() => {
    var acc = document.getElementsByClassName("table-row");
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


  return <>
    <div className="letter">
      <button className='printButton fa-print' onClick={handlePrint}>
        <svg width="36" height="36" fill="currentColor" class="bi bi-printer" viewBox="0 0 16 16">
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z" />
        </svg>
      </button>
      <div ref={componentRef}>
      <div className='imgDiv'>
				<img className='img' src="https://localhost:44367/Logos/LogoSharansky.gif" alt="LogoSharansky" />
			</div>
        <h2 className="title mtp tableh2">{x.studentFirstName} {x.studentLastName}<span className="flag"></span></h2>
        <h3 className="date mtp">מחזור: {x.studentGrade}</h3>
        <h3 className="major date mtp">מסלול #1: {x.firstMajorName}</h3>
        <h3 className="major date mtp">|</h3>
        <h3 className="major date mtp">מסלול #2: {x.secondMajorName}</h3>
        {/* Table */}
        <div className="container">
          <ul className="responsive-table">
            <li className="tableLI table-header">
              <div className="col col-1">שם קורס</div>
              <div className="col col-2">מספר שעורים</div>
              <div className="col col-3">מספר שעורים שנכחה</div>
              <div className="col col-4">%</div>
              <div className="col col-5">עברה</div>
            </li>

            <ShowExtraDetails MajorDetails={x.detailsForTheFirstMajor} MajorName={x.firstMajorName}></ShowExtraDetails>
            <ShowExtraDetails MajorDetails={x.detailsForTheSecondMajor} MajorName={x.secondMajorName}></ShowExtraDetails>
          </ul>
        </div>




      </div>

    </div>

  </>
}