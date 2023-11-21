import React, { useState } from "react";
import '../../UploadAnExcelFileWithAllTheDesign/SelectFile/SelectFile.css'
// import { Arrow2 } from "../Arrow/Arrow2.jsx";

export const SelectFile = (props) => {

    // const [fileName, setFileName] = useState("")

    return <>
        {/* <Arrow2></Arrow2> */}
        <div className="main">
            {/* <form> */}
                {/* <div className="rainy-weather ">
                <div className="cloud-main"></div>
                <div className="cloud-center"></div>
                <div className="cloud-left"></div>
            </div> */}
                {/* <Arrow2></Arrow2> */}
                <input type="file" multiple onChange={(e) => { props.setFileName(e.target.files[0].name) }} />
                {/* <br /> */}
                {/* <br /><br /> */}
            {/* </form> */}
            <p>{props.fileName}</p>
        </div>
    </>
}