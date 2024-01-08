// import React, { useState } from "react";
// import axios from "axios";
// // import { Arrow2 } from "../Arrow/Arrow2";
// // import { Pencile } from './Pencile'
// import '../../UploadAnExcelFileWithAllTheDesign/SelectFile/SelectFile.css'
// // import '../../UploadAnExcelFileWithAllTheDesign/Pencile/FileUpload.scss'
// // import { StaffTable } from "../HeaderTables/Staff";
// // import { StudentTable } from "../HeaderTables/Student";
// import { useNavigate } from "react-router-dom";
// import { FileUploadCopy } from "./FileUploadCopy";


// export const FileUpload = (props) => {

//     let navigate = useNavigate()

//     const [fileSelected, setFileSelected] = useState();
//     const [fileUpload, setFileUpload] = useState(false);
//     // const [fileName, setFileName] = useState('')

//     // const saveFileSelected = (e) => {
//     //     //in case you want to print the file selected
//     //     //console.log(e.target.files[0]);
//     //     setFileSelected(e.target.files[0]);
//     //     setFileName(e.target.files[0].name)
//     // };

//     const importFile = async (e) => {
//         debugger
//         const formData = new FormData();
//         formData.append("file", fileSelected);
//         try {
//             // For Staff Members:
//             // https://localhost:44367/api/Staff/UploadFileExcel/1
//             // For Students:
//             // https://localhost:44367/api/Students/UploadFileExcel/1
//             setFileUpload(true)
//             if (props.id === "Staff") {
//                 await axios.post("https://localhost:44367/api/Staff/UploadFileExcel", formData);

//                 let btn = document.getElementById('nextButton')
//                 btn.disabled = false
//                 btn.addEventListener('click', () => navigate('../addMajor'))
//             }
//             else
//                 await axios.post("https://localhost:44367/api/Students/UploadFileExcel/1", formData);
//         } catch (ex) {
//             console.log(ex);
//         }
//         finally {
//             setFileUpload(false)
//         }
//     };

//     return (
//         // <>
//         //         <div className="main">
//         //             <form className="form">
//         //                 <Arrow2></Arrow2>
//         //                 <input className="FileUpdateInput" type="file" accept=".xlsx" multiple onChange={saveFileSelected} />
//         //             </form>
//         //             <p className="FileUploadP">{fileName}</p>
//         //         </div>

//         //     {!fileUpload && <button type="submit" className="ButtonUpdate" onClick={importFile} disabled={fileName === '' ? true : false}>Upload</button>}
//         //     {fileUpload && <Pencile></Pencile>}
//         //     <br />

//         //     <div className="instructionDiv">
//         //         <h3>מלאי והעלי קובץ אקסל לפי הכותרות הבאות:</h3>
//         //         {props.id === "Staff" ? <StaffTable></StaffTable> : <StudentTable></StudentTable>}
//         //         <br />
//         //         <h4>בהצלחה רבה והמון סיעתא דשמיא!</h4>
//         //     </div>
//         // </>
//         <FileUploadCopy />
//     );
// };









// // import React, { useState } from "react";
// // import axios from "axios";
// // import { Pencile } from "./Pencile";
// // import { SelectFile } from "../SelectFile/SelectFile.jsx";

// // export const FileUpload = (props) => {

// //     // let navigate = useNavigate()

// //     // const [fileSelected, setFileSelected] = useState();
// //     // const [fileUpload, setFileUpload] = useState(false);
// //     // const [fileName, setFileName] = useState('')

// //     // const saveFileSelected = (e) => {
// //     //     //in case you want to print the file selected
// //     //     //console.log(e.target.files[0]);
// //     //     setFileSelected(e.target.files[0]);
// //     //     setFileName(e.target.files[0].name)
// //     // };

// //     // const importFile = async (e) => {
// //     //     debugger
// //     //     const formData = new FormData();
// //     //     formData.append("file", fileSelected);
// //     //     try {
// //     //         // For Staff Members:
// //     //         // https://localhost:44367/api/Staff/UploadFileExcel/1
// //     //         // For Students:
// //     //         // https://localhost:44367/api/Students/UploadFileExcel/1
// //     //         setFileUpload(true)
// //     //         if (props.id === "Staff") {
// //     //             await axios.post("https://localhost:44367/api/Staff/UploadFileExcel", formData);

// //     //             let btn = document.getElementById('nextButton')
// //     //             btn.disabled = false
// //     //             btn.addEventListener('click', () => navigate('../addMajor'))
// //     //         }
// //     //         else
// //     //             await axios.post("https://localhost:44367/api/Students/UploadFileExcel/1", formData);
// //     //     } catch (ex) {
// //     //         console.log(ex);
// //     //     }
// //     //     finally {
// //     //         setFileUpload(false)
// //     //     }
// //     // };

// //     return (
// //         // <>
// //         //         <div className="main">
// //         //             <form className="form">
// //         //                 <Arrow2></Arrow2>
// //         //                 <input className="FileUpdateInput" type="file" accept=".xlsx" multiple onChange={saveFileSelected} />
// //         //             </form>
// //         //             <p className="FileUploadP">{fileName}</p>
// //         //         </div>

// //         //     {!fileUpload && <button type="submit" className="ButtonUpdate" onClick={importFile} disabled={fileName === '' ? true : false}>Upload</button>}
// //         //     {fileUpload && <Pencile></Pencile>}
// //         //     <br />

// //         //     <div className="instructionDiv">
// //         //         <h3>מלאי והעלי קובץ אקסל לפי הכותרות הבאות:</h3>
// //         //         {props.id === "Staff" ? <StaffTable></StaffTable> : <StudentTable></StudentTable>}
// //         //         <br />
// //         //         <h4>בהצלחה רבה והמון סיעתא דשמיא!</h4>
// //         //     </div>
// //         // </>
// //         <FileUploadCopy />
// //     );
// // };









// // // import React, { useState } from "react";
// // // import axios from "axios";
// // // import { Pencile } from "./Pencile";
// // // import { SelectFile } from "../SelectFile/SelectFile.jsx";

// // // export const FileUpload = (props) => {
// // //     const [fileName, setFileName] = useState('');
// // //     const [fileUpload, setFileUpload] = useState(false)

// // //     // const saveFileSelected = (e) => {
// // //     //     //in case you wan to print the file selected
// // //     //     //console.log(e.target.files[0]);
// // //     //     setFileSelected(e.target.files[0]);
// // //     // };

// // //     const importFile = async (e) => {
// // //         // if (fileName !== '') {
// // //         debugger
// // //         const formData = new FormData();
// // //         formData.append("file", fileName);
// // //         try {
// // //             setFileUpload(true)
// // //             if (props.id === "Staff")
// // //                 // For Staff Members:
// // //                 // https://localhost:44367/api/Staff/UploadFileExcel/1
// // //                 await axios.post("https://localhost:44367/api/Staff/UploadFileExcel/1", formData);
// // //             else
// // //                 // For Students:
// // //                 // https://localhost:44367/api/Students/UploadFileExcel/1
// // //                 await axios.post("https://localhost:44367/api/Students/UploadFileExcel/1", formData);
// // //         } catch (ex) {
// // //             console.log(ex);
// // //         }
// // //         finally {
// // //             setFileUpload(false)
// // //         }
// // //         // }
// // //     };

// // //     return (
// // //         <>
// // //             {/* <input type="file" onChange={saveFileSelected} />
// // //             <input type="button" value="upload" /> */}
// // //             <SelectFile fileName={fileName} setFileName={setFileName}></SelectFile>
// // //             {!fileUpload && <button type="submit" onClick={(e) => importFile(e)}>Upload</button>}
// // //             {fileUpload && <Pencile></Pencile>}

// // //         </>
// // //     );
// // // };


