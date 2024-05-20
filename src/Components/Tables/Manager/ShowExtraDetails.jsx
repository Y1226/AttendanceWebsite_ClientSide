import '../../../Style/Tables/Manager/ShowExtraDetails.scss'
import '../../../Style/Tables/Manager/ChangingTable.scss'

export const ShowExtraDetails = (props) => {

    debugger

    return <>
        {/* <tr><th className='majorName'>{props.MajorName}</th></tr> */}
        {/* <table>  */}
        {/* className="unfixed-table" */}
        {/* <thead className="attendanceThead tHead">
                <tr>
                    <th className="attendanceTh currentTableTh">Course Name</th>
                    <th className="attendanceTh">Number of Lessons</th>
                    <th className="attendanceTh">Number of Attended Lessons</th>
                    <th className="attendanceTh">%</th>
                    <th className="attendanceTh">Passed</th>
                </tr>
            </thead>
            <tbody> */}
        {
            props.MajorDetails.map(u => <>
                <li className="table-row tableLI">
                    <div className="col col-1" data-label="שם קורס">{u.courseName}</div>
                    <div className="col col-2" data-label="מספר שיעורים">{u.numberOfHoursTheCourseTookPlace}</div>
                    <div className="col col-3" data-label="מספר שיעורי נוכחות">{u.numberOfHoursTheStudentAttendedTheCourse}</div>
                    <div className="col col-4" data-label="%">{u.numberOfHoursTheCourseTookPlace === 0 ? 0 : parseInt((100 / u.numberOfHoursTheCourseTookPlace) * u.numberOfHoursTheStudentAttendedTheCourse)}</div>
                    <div className="col col-5" data-label="עברה">{(100 / u.numberOfHoursTheCourseTookPlace) * u.numberOfHoursTheStudentAttendedTheCourse < 85 ? 'Ⅹ' : ''}</div>
                </li>
                <div className="panel">
                    {/* <tr> */}
                    <p>
                        {/* <table> */}
                        {/* <thead className="attendanceThead"> */}
                        {/* <div className="container"> */}
                            {/* <ul className="responsive-table rts"> */}
                                <li className="tableLI ths">
                                    <div className="small">תאריך</div>
                                    <div className="small">מספר שעור</div>
                                    <div className="small">נוכחות</div>
                                </li>
                            {/* </ul> */}
                        {/* </div> */}
                        {/*  */}
                        {/* <tr>
                                        <th className="attendanceTh">date</th>
                                        <th className="attendanceTh">lessonNumber</th>
                                        <th className="attendanceTh">attendance</th>
                                    </tr> */}
                        {/* </thead> */}
                        {/* <tbody> */}
                        {
                            u.detailOnTheStudentAttendedTheCourse.map(d =>
                            <>
                            {
                                !d.attendance &&
                                    <>
                                        <li className="tbs">
                                        <div className="small" data-label="Date">{d.date ? d.date.split('T')[0] : ''}</div>
                                            <div className="small" data-label="LessonNumber">{d.lessonNumber}</div>
                                            <div className="small" data-label="Attendance">{'✕'}</div>
                                        </li>
                                        {/*  */}
                                        {/* <td className="attendanceTd">{d.date.split('T')[0]}</td>
                                                        <td className="attendanceTd">{d.lessonNumber}</td>
                                                        <td className="attendanceTd">{'✕'}</td> */}
                                        {/* <td className="attendanceTd">{d.attendance === true ? '✓' : '✕'}</td> */}
                                    </>
                            }
                                </>
                            )
                        }
                        {/* </tbody> */}
                        {/* </table> */}
                    </p>
                    {/* </tr> */}
                </div>
            </>
            )
        }
        {/* </tbody>
        </table> */}
    </>
}