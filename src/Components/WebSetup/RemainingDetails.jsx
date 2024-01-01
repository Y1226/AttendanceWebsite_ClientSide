import { useNavigate } from 'react-router-dom'
import '../../Style/WebSetupStyle/RemainingDetails.scss'
// import emailjs from 'emailjs-com'
import { useRef, useState } from 'react'
// import { UploadLogo } from './UploadLogo'
import { FileUpload } from '../File Upload/FileUpload'
import { getPasswordLottery } from '../../Redux/Axios/SignInAxios'
import { useDispatch, useSelector } from 'react-redux'
import { FinishFillingOutTheDataForANewSeminar } from '../../Redux/Actions/SignInActions'

export const RemainingDetails = () => {
    const newSeminar = useSelector(x => x.SignInReducer.NewSeminar)
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const[password, setPassword] = useState()

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

    const VerifyCode = () => {
        dispatch(FinishFillingOutTheDataForANewSeminar(seminarAddress.current.value, seminarPhoneNumber.current.value, seminarFaxNumber.current.value, password, true))
        navigate('../verification')
        alert(password)
    }

    return <>
        {/* <UploadLogo></UploadLogo> */}
        <FileUpload />
        <div className="detailsForm">
            <div className='detailsFormContent'>
                {/*----- Don't delete -----*/}
                <form /*onSubmit={sendEmail}*/>
                    <h2>:הכנס את המידע הנותר</h2><br />
                    <input type="text" value={newSeminar.seminarName} id="SeminarName" name='userName' readOnly /><br />
                    <input type="text" value={newSeminar.SeminarEmailAddress} id="SeminarEmail" name='email' readOnly /><br />
                    <input type="text" placeholder="כתובת" id="SeminarAddress"  ref={seminarAddress}/><br />
                    <input type="text" value={newSeminar.seminarLocationCity} id="SeminarCity" readOnly /><br />
                    <input type="text" placeholder="טלפון" id="SeminarPhoneNumber" ref={seminarPhoneNumber}/><br />
                    <input type="text" placeholder="פקס" id="SeminarFaxNumber" ref={seminarFaxNumber}/><br />
                    <input type="text" value={password} id="password" name='password' hidden readOnly /><br />
                    {/* We need to add validation */}
                    <input type='submit' value='הבא' /*readOnly*/ onClick={() => VerifyCode()} />
                </form>
            </div>
        </div>
    </>

}