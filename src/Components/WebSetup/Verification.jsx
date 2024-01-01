import { useNavigate } from 'react-router-dom'
import '../../Style/WebSetupStyle/VerificationStyle.css'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSeminar } from '../../Redux/Axios/SignInAxios'
import { UpdateCurrentSeminarCode } from '../../Redux/Actions/SignInActions'

export const Verification = () => {

    const dispatch = useDispatch()
    let navigate = useNavigate()
    const inputCode = useRef()
    const newSeminar = useSelector(x => x.SignInReducer.NewSeminar)

    const Verify = async () => {
        debugger
        //if seminar was not added yet then add it
        if (inputCode.current.value === newSeminar.seminarManagerPassword) {
            await addSeminar(newSeminar).then(x => { dispatch(UpdateCurrentSeminarCode(x.data.seminarCode)) })    
            navigate('../addTeachersAndStudents')
        }
        //else update the existing seminar
        //axios.update()
    }

    return <>
        <form className="form">
            <div className="info">
                <span className="title">!ודא שזה אתה</span>
                <p className="description">.קוד אימות נשלח למייל שלך</p>
                <p>.שמור את הקוד הזה כסיסמה העתידית שלך</p>
            </div>
            <div className="form-card-input-wrapper">
                <div className="form-card-input-bg">
                    <input ref={inputCode} id='verificationCode' className="form-card-input" placeholder="______" maxLength="6" type="text" />
                </div>
            </div>

            <div className="action-btns">
                <p className="verify" onClick={() => Verify()}>אמת</p>
                <p className="clear" onClick={() => inputCode.current.value = ''}>נקה</p>
            </div>
        </form>
    </>
}