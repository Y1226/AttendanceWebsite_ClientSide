import { useNavigate } from 'react-router-dom'
import '../../Style/WebSetupStyle/RemainingDetails.scss'
// import emailjs from 'emailjs-com'
import { useRef, useState } from 'react'
// import { UploadLogo } from './UploadLogo'
// import { FileUpload } from '../File Upload/FileUpload'
import { getPasswordLottery, uploadALogo } from '../../Redux/Axios/SignInAxios'
import { useDispatch, useSelector } from 'react-redux'
import { FinishFillingOutTheDataForANewSeminar } from '../../Redux/Actions/SignInActions'
import '../../Style/WebSetupStyle/AddMajorStyle.scss'
import '../File Upload/FileUpload.css'
import { IsTheCharacterInputANumber } from '../../Redux/Actions/IntegrityChecks'


export const RemainingDetails = () => {
    const newSeminar = useSelector(x => x.SignInReducer.NewSeminar)
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const [fileSelected, setFileSelected] = useState();
    const [fileName, setFileName] = useState('')
    const [password, setPassword] = useState()

    const seminarAddress = useRef()
    const seminarPhoneNumber = useRef()
    const seminarFaxNumber = useRef()

    getPasswordLottery().then(x => setPassword(x.data))

    //Don't delete
    //---------------------------
    // const sendEmail = (e) => {
    //     e.preventDefault()
    //     localStorage.setItem('newPassword',password)
    //     navigate('../verification')
    //     debugger
    //     emailjs.sendForm('service_cow3pg5','template_ktdlaq1',e.target,'6Er4YSAntswoE2pQP').then(res => console.log(res)).catch(err => console.log(err))
    // }

    const saveFileSelected = (e) => {
        //in case you want to print the file selected
        //console.log(e.target.files[0]);
        setFileSelected(e.target.files[0]);
        setFileName(e.target.files[0].name)
    };

    const Next = async () => {
        debugger
        const formData = new FormData();
        formData.append("file", fileSelected);
        try {
            await uploadALogo(formData);
        } catch (ex) {
            console.log(ex);
        }
        finally {
            dispatch(FinishFillingOutTheDataForANewSeminar(seminarAddress.current.value, seminarPhoneNumber.current.value, seminarFaxNumber.current.value, fileName, password, true))
            navigate('../verification')
            alert(password)
        }

    }

    return <>
        {/* <UploadLogo></UploadLogo> */}
        <div className="detailsForm">
            <div className='detailsFormContent'>
                {/*----- Don't delete -----*/}
                <form /*onSubmit={sendEmail}*/>
                    <h2 className='title_h2'>:הכנס את המידע הנותר</h2>
                    <hr style={{ background: '#607d8b', height: '1px', marginRight: '15px', marginLeft: '15px' }} />
                    <input type="text" value={newSeminar.seminarName} id="SeminarName" name='userName' readOnly /><br />
                    <input type="text" value={newSeminar.seminarEmailAddress} id="SeminarEmail" name='email' readOnly /><br />
                    <input type="text" placeholder="כתובת" id="SeminarAddress" ref={seminarAddress} /><br />
                    <input type="text" value={newSeminar.seminarLocationCity} id="SeminarCity" readOnly /><br />
                    <input type="text" placeholder="טלפון" id="SeminarPhoneNumber" ref={seminarPhoneNumber} onKeyDown={(e) => { if (IsTheCharacterInputANumber(e)) e.preventDefault() }} /><br />
                    <input type="text" placeholder="פקס" id="SeminarFaxNumber" ref={seminarFaxNumber} onKeyDown={(e) => { if (IsTheCharacterInputANumber(e)) e.preventDefault() }} /><br />
                    {/* <input type="text" value={password} id="password" name='password' hidden readOnly /><br /> */}
                    {/* We need to add validation */}

                    {/* <FileUpload /> */}
                    <h3 className='titleAboveTheLogo'>:בחר את הלוגו של הסמינר</h3>
                    <div className="FileUploadMain">
                        <form className="FileUploadForm">
                            <div className='FileUploadSvgDiv'>
                                <svg viewBox="0 -20 640 512" fill="white" height="90%">
                                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z">
                                    </path>
                                </svg>
                            </div>
                            <input className="FileUploadInput" type="file" accept="image/*" multiple onChange={saveFileSelected} />
                        </form>
                        <p className="FileUploadP">{fileName}</p>
                    </div>

                    {/* Next button */}
                    <div className="plusButton div_next" style={{ marginBottom: '50px' }} onClick={Next}>
                        <svg className="arrow" viewBox="0 0 20 20">
                            <path d="M18.271,9.212H3.615l4.184-4.184c0.306-0.306,0.306-0.801,0-1.107c-0.306-0.306-0.801-0.306-1.107,0
                            L1.21,9.403C1.194,9.417,1.174,9.421,1.158,9.437c-0.181,0.181-0.242,0.425-0.209,0.66c0.005,0.038,0.012,0.071,0.022,0.109
                            c0.028,0.098,0.075,0.188,0.142,0.271c0.021,0.026,0.021,0.061,0.045,0.085c0.015,0.016,0.034,0.02,0.05,0.033l5.484,5.483
                            c0.306,0.307,0.801,0.307,1.107,0c0.306-0.305,0.306-0.801,0-1.105l-4.184-4.185h14.656c0.436,0,0.788-0.353,0.788-0.788
                            S18.707,9.212,18.271,9.212z">
                            </path>
                        </svg>
                        <label className="text_next">הבא</label>
                    </div>

                </form>
            </div>
        </div>


        {/* <div className='spaces'>
            <div className="col-3 input-effect">
                <input
                    className="effect-19"
                    type="text"
                    placeholder="שם המסלול"
                    // onChange={(e) => handleInputChange(index, e.target.value)}
                    // onFocus={(e) => e.target.placeholder = ""}
                    // onBlur={(e) => e.target.placeholder = "שם המסלול"}
                    readOnly
                />
                <label>שם המסלול</label>
                <span className="focus-border">
                    <i></i>
                </span>
            </div>
        </div> */}
    </>

}