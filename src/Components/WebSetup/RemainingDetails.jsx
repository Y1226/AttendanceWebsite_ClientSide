import { useNavigate } from 'react-router-dom'
import '../../Style/WebSetupStyle/RemainingDetails.scss'
// import emailjs from 'emailjs-com'
import axios from 'axios'
import { useRef, useState } from 'react'
// import { UploadLogo } from './UploadLogo'
import { FileUpload } from '../File Upload/FileUpload'
// import $ from 'jquery'

export const RemainingDetails = () => {

    let navigate = useNavigate()
    const[code, setCode] = useState()

    const seminarAddress = useRef()
    const seminarPhoneNumber = useRef()
    const seminarFaxNumber = useRef()

    axios.get('https://localhost:44367/api/Seminar/GetPasswordLottery').then(x => {setCode(x.data);console.log(x.data);debugger})
    // axios.get('https://localhost:44367/api/Seminar/passwordLottery').then(x => {setCode(x.data);console.log(x.data);debugger})

    // const sendEmail = (e) => {
    //     e.preventDefault()
    //     localStorage.setItem('newPassword',code)
    //     navigate('../verification')
    //     debugger
    //     emailjs.sendForm('service_cow3pg5','template_ktdlaq1',e.target,'6Er4YSAntswoE2pQP').then(res => console.log(res)).catch(err => console.log(err))
    // }

    const VerifyCode = () => {
        let newSeminar = JSON.parse(localStorage.getItem('newSeminar'))
        localStorage.setItem('newPassword',code)
        localStorage.setItem('newSeminar', JSON.stringify({
            ...newSeminar,
            seminarAddress: seminarAddress.current.value,
            seminarPhoneNumber: seminarPhoneNumber.current.value,
            seminarFaxNumber: seminarFaxNumber.current.value,
            seminarManagerPassword: code,
            seminarStatus: true
        }))
        navigate('../verification')
        alert(code)
    }

    return <>
        {/* <UploadLogo></UploadLogo> */}
        <FileUpload />
        <div className="detailsForm">
            <div className='detailsFormContent'>
                <form /*onSubmit={sendEmail}*/>
                    <h2>Enter remaining info:</h2><br />
                    <input type="text" value={JSON.parse(localStorage.getItem('newSeminar')).seminarName} id="SeminarName" name='userName' readOnly /><br />
                    <input type="text" value={JSON.parse(localStorage.getItem('newSeminar')).SeminarEmailAddress} id="SeminarEmail" name='email' readOnly /><br />
                    <input type="text" placeholder="SeminarAddress" id="SeminarAddress"  ref={seminarAddress}/><br />
                    {/* <input type="text" style={{ width: '20vh' }} placeholder="#" id="number" /> */}
                    <input type="text" style={{ width: '25vh' }} value={JSON.parse(localStorage.getItem('newSeminar')).seminarLocationCity} id="SeminarCity" readOnly /><br />
                    <input type="text" placeholder="SeminarPhoneNumber" id="SeminarPhoneNumber" ref={seminarPhoneNumber}/><br />
                    <input type="text" placeholder="SeminarFaxNumber" id="SeminarFaxNumber" ref={seminarFaxNumber}/><br />
                    <input type="text" value={code} id="password" name='code' hidden readOnly /><br />
                    <input type='submit' value='NEXT' /*readOnly*/ onClick={() => VerifyCode()} />
                </form>
            </div>
        </div>
    </>

}