import { useEffect } from 'react';
import '../../Style/Tables/Manager/Update.scss'
import { FileUpload } from '../UploadAnExcelFileWithAllTheDesign/Pencile/FileUpload';
// import { useNavigate } from 'react-router-dom';
// import '../../Style/WebSetupStyle/AddTeachersStyle.scss'

export const AddTeachersAndStudents = () => {

    // let navigate = useNavigate()

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
            <button className='tablinks disabledUpdateButton' disabled id='nextButton'>הבא</button>
        </div>
        <div id='Staff' className='tabcontent'>
            <FileUpload id="Staff"></FileUpload>
        </div>
        <div id='Students' className='tabcontent'>
            <FileUpload id="Students"></FileUpload>
        </div>

    </>
}