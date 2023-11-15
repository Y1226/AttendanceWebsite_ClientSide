import { useNavigate } from 'react-router-dom'
import '../../Style/WebSetupStyle/VerificationStyle.css'
import axios from 'axios'

export const Verification = () => {

    let navigate = useNavigate()

    const Verify = () => {
        debugger
        let addedSeminar = JSON.parse(localStorage.getItem('newSeminar'))
        let code = document.getElementById('verificationCode').value
        if (code === localStorage.getItem('newPassword')) {
            alert(code)
            //if seminar was not added yet then add it
                axios.post('https://localhost:44367/api/Seminar/AddSeminar',addedSeminar)
            //else update the existing seminar
                //axios.update()
            navigate('../addTeachersAndStudents')
        }
    }

    return <>
        <form className="form">
            {/* <span className="close">X</span> */}

            <div className="info">
                <span className="title">Verify It's You!</span>
                <p className="description">A verification code has been sent to your email.</p>
                <p>Save this code as your future password.</p>
            </div>
            {/* <div className="input-fields">
                <input placeholder="____" type="tel" maxLength="4" />
                <input placeholder="" type="tel" maxLength="1" />
                <input placeholder="" type="tel" maxLength="1" />
                <input placeholder="" type="tel" maxLength="1" />
            </div> */}

            <div className="form-card-input-wrapper">
                <div className="form-card-input-bg">
                    <input id='verificationCode' className="form-card-input" placeholder="______" maxLength="6" type="text" />
                </div>
            </div>

            <div className="action-btns">
                <p className="verify" onClick={() => Verify()}>Verify</p>
                <p className="clear" onClick={() => document.getElementById('verificationCode').value = ''}>Clear</p>
            </div>

        </form>
    </>
}