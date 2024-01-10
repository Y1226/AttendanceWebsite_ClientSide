import DownloadToExcel from '../../Tables/Manager/DownloadToExcel'
import '../Pencile/FileUpload.scss'

export const StaffTable = () => {

    const selectedColumns = [
        'userFirstName', 
        'userLastName', 
        'userId', 
        'userEnglishDateOfBirth', 
        'userHebrewDateOfBirth', 
        'userAddress', 
        'userLocationCity', 
        'userHomePhoneNumber', 
        'userCellPhoneNumber', 
        'staffMemberPosition', 
        'userPassword', 
        'staffEmploymentStartDate'
      ];

    return <DownloadToExcel selectedColumns={selectedColumns} table={selectedColumns} type={'staffData.xlsx'}></DownloadToExcel>
    
    
    
    //<table className="instructionTable">
    //     <thead>
    //         <tr>
    //             <th>תעודת זהות</th>
    //             <th>שם פרטי</th>
    //             <th>שם משפחה</th>
    //             <th>טלפון בית</th>
    //             <th>פלאפון</th>
    //             <th>כתובת</th>
    //             <th>עיר</th>
    //             <th>משרה</th>
    //             <th>תאריך תחילת עבודה</th>
    //             <th className="instructionButton"
    //                 onClick={() => {
    //                     navigator.clipboard.writeText(
    //                         'תעודת זהות	שם פרטי	שם משפחה	טלפון בית	פלאפון	כתובת	עיר	משרה	תאריך תחילת עבודה')
    //                 }}
    //             >העתק</th>
    //         </tr>
    //     </thead>
    // </table>
}