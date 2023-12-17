import React, { useState } from "react";
import axios from "axios";
import { Arrow2 } from '../UploadAnExcelFileWithAllTheDesign/Arrow/Arrow2';
import { Pencile } from '../UploadAnExcelFileWithAllTheDesign/Pencile/Pencile'
// import '../../UploadAnExcelFileWithAllTheDesign/SelectFile/SelectFile.css'
// import '../../UploadAnExcelFileWithAllTheDesign/Pencile/FileUpload.scss'
// import { StaffTable } from "../HeaderTables/Staff";
// import { StudentTable } from "../HeaderTables/Student";


export const UploadLogo = (props) => {
    const [fileSelected, setFileSelected] = useState();
    const [fileUpload, setFileUpload] = useState(false);
    const [fileName, setFileName] = useState('')

    const saveFileSelected = (e) => {
        //in case you want to print the file selected
        //console.log(e.target.files[0]);
        setFileSelected(e.target.files[0]);
        setFileName(e.target.files[0].name)
    };

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
            await axios.post("https://localhost:44367/api/Seminar/UploadALogo", formData);
        } catch (ex) {
            console.log(ex);
        }
        finally {
            setFileUpload(false)
        }
    };

    return (
        <>
            {/* <SelectFile></SelectFile> */}
                <div className="main">
                    <form className="form">
                        <Arrow2></Arrow2>
                        <input className="FileUpdateInput" type="file" multiple onChange={saveFileSelected} />
                    </form>
                    <p className="FileUploadP">{fileName}</p>
                </div>
                
            {!fileUpload && <button type="submit" className="ButtonUpdate" onClick={importFile} disabled={fileName === '' ? true : false}>העלה</button>}
            {fileUpload && <Pencile></Pencile>}
            <br />

            
        </>
    );
};









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


