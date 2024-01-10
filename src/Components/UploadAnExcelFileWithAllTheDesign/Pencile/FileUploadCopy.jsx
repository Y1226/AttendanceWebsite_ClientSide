import React, { useState } from "react";
import { Pencile } from './Pencile'
import '../../UploadAnExcelFileWithAllTheDesign/SelectFile/SelectFile.css'
// import '../../UploadAnExcelFileWithAllTheDesign/Pencile/FileUpload.scss'
import { StaffTable } from "../HeaderTables/Staff";
import { StudentTable } from "../HeaderTables/Student";
// import { useNavigate } from "react-router-dom";
import '../../File Upload/FileUpload.css'
import { UploadFileExcel } from "../../../Redux/Axios/FileUpload/FileUploadAxios";
import { useDispatch, useSelector } from "react-redux";
import { FillFileCounter } from "../../../Redux/Actions/WebSetupActions/AddTeachersAndStudentsActions";
// import '../../File Upload/FileUpload.css'


export const FileUploadCopy = (props) => {

    // let navigate = useNavigate()
    let dispatch = useDispatch()

    const [fileSelected, setFileSelected] = useState();
    const [fileUpload, setFileUpload] = useState(false);
    const [fileName, setFileName] = useState('')
    const currentSeminarCode = useSelector(x => x.SignInReducer.CurrentSeminarCode)
    const fileCounter = useSelector(x => x.AddTeachersAndStudentsReducer.FileCounter)

    const importFile = async (e) => {
        debugger
        const formData = new FormData();
        formData.append("file", fileSelected);
        try {
            // For Staff Members:
            // https://localhost:44367/api/Staff/UploadFileExcel/1
            // For Students:
            // https://localhost:44367/api/Students/UploadFileExcel/1
            setFileUpload(true)
            if (props.id === "Staff") {
                fileCounter === 0 ? dispatch(FillFileCounter(1)) :
                    fileCounter === 2 ? dispatch(FillFileCounter(3)) :
                        fileCounter === 3 ? dispatch(FillFileCounter(3)) :
                            dispatch(FillFileCounter(1))
                debugger
                await UploadFileExcel('Staff', currentSeminarCode, formData)
            }
            else {
                fileCounter === 0 ? dispatch(FillFileCounter(2)) :
                    fileCounter === 1 ? dispatch(FillFileCounter(3)) :
                        fileCounter === 3 ? dispatch(FillFileCounter(3)) :
                            dispatch(FillFileCounter(2))
                await UploadFileExcel('Students', currentSeminarCode, formData)
            }
        } catch (ex) {
            console.log(ex);
        }
        finally {
            setFileUpload(false)
        }
    };

    return (
        <>
            <div className="FileUploadMain">
                <form className="FileUploadForm">
                    <div className='FileUploadSvgDiv'>
                        <svg viewBox="0 -20 640 512" fill="white" height="90%">
                            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z">
                            </path>
                        </svg>
                    </div>
                    <input className="FileUploadInput" type="file" accept=".xlsx" multiple onChange={(e) => { setFileSelected(e.target.files[0]); setFileName(e.target.files[0].name) }} />
                </form>
                <p className="FileUploadP">{fileName}</p>
            </div>
            {!fileUpload && <button className="FileUploadButton" type="submit" disabled={fileName === ''} onClick={importFile}>העלה</button>}
            {fileUpload && <Pencile></Pencile>}
            <br />

            <div className="instructionDiv">
                <h3>מלאי והעלי קובץ אקסל לפי הכותרות הבאות:</h3>
                {props.id === "Staff" ? <StaffTable></StaffTable> : <StudentTable></StudentTable>}
                <h4>בהצלחה רבה והמון סיעתא דשמיא!</h4>
            </div>
        </>
    );
};

// FileUploadCopy.defaultProps = {
//     id: "Staff"
// }









// import React, { useState } from "react";
// import axios from "axios";
// import { Pencile } from "./Pencile";
// import { SelectFile } from "../SelectFile/SelectFile.jsx";

// export const FileUpload = (props) => {
//     const [fileName, setFileName] = useState('');
//     const [fileUpload, setFileUpload] = useState(false)

//     // const saveFileSelected = (e) => {
//     //     //in case you wan to print the file selected
//     //     //console.log(e.target.files[0]);
//     //     setFileSelected(e.target.files[0]);
//     // };

//     const importFile = async (e) => {
//         // if (fileName !== '') {
//         debugger
//         const formData = new FormData();
//         formData.append("file", fileName);
//         try {
//             setFileUpload(true)
//             if (props.id === "Staff")
//                 // For Staff Members:
//                 // https://localhost:44367/api/Staff/UploadFileExcel/1
//                 await axios.post("https://localhost:44367/api/Staff/UploadFileExcel/1", formData);
//             else
//                 // For Students:
//                 // https://localhost:44367/api/Students/UploadFileExcel/1
//                 await axios.post("https://localhost:44367/api/Students/UploadFileExcel/1", formData);
//         } catch (ex) {
//             console.log(ex);
//         }
//         finally {
//             setFileUpload(false)
//         }
//         // }
//     };

//     return (
//         <>
//             {/* <input type="file" onChange={saveFileSelected} />
//             <input type="button" value="upload" /> */}
//             <SelectFile fileName={fileName} setFileName={setFileName}></SelectFile>
//             {!fileUpload && <button type="submit" onClick={(e) => importFile(e)}>Upload</button>}
//             {fileUpload && <Pencile></Pencile>}

//         </>
//     );
// };


