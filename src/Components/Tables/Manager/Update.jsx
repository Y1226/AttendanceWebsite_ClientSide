import { useEffect } from 'react';
import '../../../Style/Tables/Manager/Update.scss'
// import { FileUpload } from '../../UploadAnExcelFileWithAllTheDesign/Pencile/FileUpload';
import { FileUploadCopy } from '../../UploadAnExcelFileWithAllTheDesign/Pencile/FileUploadCopy';
import { AddMajor } from '../../WebSetup/AddMajor';
import { MatchStudentToMajor } from '../../WebSetup/MatchStudentToMajor';
import { useSelector } from "react-redux"
import { AddCourseToMajor } from '../../WebSetup/AddCourseToMajor';
// import './upload.css'
// import { Pencil } from './Pencil';

export const Update = () => {

    const currentComponent = useSelector(x => x.AddMajorReducer.CurrentComponent)

    useEffect(() => {
        document.getElementsByClassName('tabcontent')[0].style.display = 'block'
        document.getElementsByClassName('tablinks')[0].className += ' active'
    },[])

    const OpenASelectionOption = (evt, optionID) => {
        debugger
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName('tabcontent')
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = 'none';
        }
        tablinks = document.getElementsByClassName('tablinks')
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '')
        }
        document.getElementById(optionID).style.display = 'block'
        evt.currentTarget.className += ' active'
    }

    return <>
        <div className='tab'>
            <button className='tablinks updateButton' onClick={(e) => OpenASelectionOption(e, 'Staff')}>אנשי צוות</button>
            <button className='tablinks updateButton' onClick={(e) => OpenASelectionOption(e, 'Students')}>תלמידות</button>
            <button className='tablinks updateButton' onClick={(e) => OpenASelectionOption(e, 'majors')}>מסלולים</button>
            <button className='tablinks updateButton' onClick={(e) => OpenASelectionOption(e, 'matchStudentToMajor')}>התאמת תלמידות למסלולים</button>
        </div>
        <div id='Staff' className='tabcontent xl'>
            <FileUploadCopy id="Staff"></FileUploadCopy>
        </div>
        <div id='Students' className='tabcontent xl'>
            <FileUploadCopy id="Students"></FileUploadCopy>
        </div>
        <div id='majors' className='tabcontent component'>
            {currentComponent === '' || currentComponent === 'Majors' ? <AddMajor></AddMajor> : <AddCourseToMajor></AddCourseToMajor>}
        </div>
        <div id='matchStudentToMajor' className='tabcontent component'>
            <MatchStudentToMajor></MatchStudentToMajor>
        </div>
    </>
};