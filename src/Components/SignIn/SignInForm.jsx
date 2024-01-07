import { FillCurrentUser, FillNewSeminar, FillSeminarData } from '../../Redux/Actions/SignInActions';
import { useDispatch, useSelector } from 'react-redux';
import '../../Style/SignInStyle/SignInFormStyle.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Logo } from '../Logo/Logo';
import { getAllSeminars, loginToTheSystem } from '../../Redux/Axios/SignInAxios';
import { AreTheSeminarCodeAndPasswordCorrect, IsTheIDAndPasswordAndSeminarCodeCorrect, IsTheIDCorrect, IsThePasswordCorrect } from '../../Redux/Actions/IntegrityChecks';

//First page to be seen in the project, used to sign in/up to the system.
export const SignInForm = () => {

    //----------------------------------------------------------------------------------
    //--------------------------   Fields   --------------------------------------------
    //----------------------------------------------------------------------------------
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //Gets all of the seminars from the store.
    const seminars = useSelector(x => x.SignInReducer.SeminarList)
    //Saves the code of the selected seminar.
    const [seminarCode, setSeminarCode] = useState(0);
    const [seminarCodeOfManager, setSeminarCodeOfManager] = useState(0);
    const [seminarCodeOfUser, setSeminarCodeOfUser] = useState(0);

    const [correctnessPasswordManager, setCorrectnessPasswordManager] = useState(false)
    const [correctnessPasswordUser, setCorrectnessPasswordUser] = useState(false)
    const [correctnessIdUser, setCorrectnessIdUser] = useState(false)

    //Different time fields.
    const time_to_show_login = 400;
    const time_to_hidden_login = 200;


    //----------------------------------------------------------------------------------
    //-----------------------   Functions   --------------------------------------------
    //----------------------------------------------------------------------------------

    //Onload get all of the seminars and send to the list in the store.
    useEffect(() => {
        async function fetchData() {
            await getAllSeminars().then(x => dispatch(FillSeminarData(x.data)))
        }
        fetchData()
    }, [dispatch])

    //Opens the window for login as manager.
    function change_to_login() {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        //Show login.
        document.querySelector('.cont_form_login').style.display = "block";
        //Hide sign up and user login.
        document.querySelector('.cont_form_loginGuest').style.opacity = "0";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        //Show login.
        setTimeout(function () {
            document.querySelector('.cont_form_login').style.opacity = "1";
        }, time_to_show_login);
        //Hide sign up and user login.
        setTimeout(function () {
            document.querySelector('.cont_form_loginGuest').style.display = "none";
            document.querySelector('.cont_form_sign_up').style.display = "none";
        }, time_to_hidden_login);
    }

    //Opens the window for login as user.
    function change_to_loginGuest() {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
        //Show login.
        document.querySelector('.cont_form_loginGuest').style.display = "block";
        //Hide sign up and manager login.
        document.querySelector('.cont_form_login').style.opacity = "0";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        //Show login.
        setTimeout(function () {
            document.querySelector('.cont_form_loginGuest').style.opacity = "1";
        }, time_to_show_login);
        //Hide sign up and manager login.
        setTimeout(function () {
            document.querySelector('.cont_form_login').style.display = "none";
            document.querySelector('.cont_form_sign_up').style.display = "none";
        }, time_to_hidden_login);
    }

    //Different time fields.
    const time_to_show_sign_up = 100;
    const time_to_hidden_sign_up = 400;

    //Opens the window for sign up.
    function change_to_sign_up(at) {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
        //Show sign up.
        document.querySelector('.cont_form_sign_up').style.display = "block";
        //Hide logins.
        document.querySelector('.cont_form_login').style.opacity = "0";
        document.querySelector('.cont_form_loginGuest').style.opacity = "0";

        //Show sign up.
        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.opacity = "1";
        }, time_to_show_sign_up);
        //Hide logins.
        setTimeout(function () {
            document.querySelector('.cont_form_login').style.display = "none";
            document.querySelector('.cont_form_loginGuest').style.display = "none";
        }, time_to_hidden_sign_up);


    }

    //Different time fields.
    const time_to_hidden_all = 500;

    //Hides the windows for logins and sign up.
    function hidden_login_and_sign_up() {
        document.querySelector('.cont_forms').className = "cont_forms";
        //Hide all.
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";
        document.querySelector('.cont_form_loginGuest').style.opacity = "0";

        //Hide all.
        setTimeout(function () {
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
            document.querySelector('.cont_form_loginGuest').style.display = "none";
        }, time_to_hidden_all);

    }

    //Navigates to new page according to entered data.
    const login = async () => {
        //Get password from input field.
        let password = document.getElementById('passwordManager').value
        if (password === "")
            password = document.getElementById('passwordUser').value

        let username = document.getElementById('username').value
        debugger
        //If signing in as manager and there is no username.
        if (username === "") {
            username = 'manager'
            setSeminarCode(seminarCodeOfManager)
        }
        else setSeminarCode(seminarCodeOfUser)

        //Save current user in reducer.
        dispatch(FillCurrentUser(username, password, seminarCode))

        //Get function that checks if:
        //0 - user does not exist.
        //1 - user exists as regular user.
        //2 - user exists as manager.
        await loginToTheSystem(password, parseInt(seminarCode), username)
            .then(x => x.data === 1 ? navigate('/teacherNav/majorTable') : x.data === 2 ? navigate('/managerNav/teacherTable') : alert("does not exist"));
    }

    const signUp = async () => {

        let newSeminarName = document.getElementById('newSeminarName').value
        let newSeminarEmail = document.getElementById('newSeminarEmail').value
        let newSeminarCity = document.getElementById('newSeminarCity').value

        dispatch(FillNewSeminar(newSeminarName, newSeminarEmail, newSeminarCity))

        if (newSeminarName !== '' && newSeminarEmail !== '' && newSeminarCity !== '')
            navigate('/moreInfoNav/remainingDetails')
        else
            alert('fill in all fields')
    }

    //----------------------------------------------------------------------------------
    //--------------------------   HTML   ----------------------------------------------
    //----------------------------------------------------------------------------------
    return <>
        <div className="cotn_principal">
            <div className='a'>
                <div style={{ display: 'block', float: 'right' }}><Logo></Logo></div>
                <div className='b'>
                    <div className="cont_centrar">
                        <div className="cont_login">
                            <div className="cont_info_log_sign_up">

                                {/* ----------------------------- */}
                                {/* -- Login as manager / user -- */}
                                {/* ----------------------------- */}
                                <div className="col_md_login">
                                    <div className="cont_ba_opcitiy">
                                        <h2 className='SignInFormH2'>התחברות</h2>
                                        <p className='SignInFormP'>?יש לך חשבון <br></br> !התחבר</p>
                                        <button className="btn_login" onClick={() => change_to_login()}>התחבר כמנהל</button>
                                        <button className="btn_loginGuest" onClick={() => change_to_loginGuest()}>התחבר כמשתמש</button>
                                    </div>
                                </div>

                                {/* ----------------------------- */}
                                {/* ---------- Sign up ---------- */}
                                {/* ----------------------------- */}
                                <div className="col_md_sign_up">
                                    <div className="cont_ba_opcitiy">
                                        <h2 className='SignInFormH2'>הירשם</h2>
                                        <p className='SignInFormP'>?עדין אין לך חשבון <br></br> !צור חשבון עכשיו</p>
                                        <button className="btn_sign_up" onClick={() => change_to_sign_up()}>הירשם</button>
                                    </div>
                                </div>
                            </div>

                            {/* Backgroung images */}
                            <div className="cont_back_info">
                                <div className="cont_img_back_grey">
                                    <img className='SignInFormImg' src='SignInPictures/SignInBackground.jpg' alt=''></img>
                                </div>
                            </div>
                            <div className="cont_forms" >
                                {/* Background image */}
                                <div className="cont_img_back_">
                                    <img className='SignInFormImg' src='SignInPictures/SignInBackground.jpg' alt=''></img>
                                </div>

                                {/* Login as manager */}
                                <div className="cont_form_login">
                                    <p className='SignInFormA' onClick={() => hidden_login_and_sign_up()}><i className='SignInFormI'>«</i></p>
                                    <h2 className='SignInFormH2'>התחברות</h2>
                                    {/* Option to choose seminar */}
                                    <select className='SignInFormSelect' onChange={e => { setSeminarCodeOfManager(e.target.value); }}>
                                        <option className='SignInFormOption' hidden>בחר את הסמינר שלך</option>
                                        {/* Go through seminars from list in store and add the seminars name */}
                                        {seminars.map((x) => {
                                            return <option className='SignInFormOption' id='seminarKey' key={x.seminarCode} value={x.seminarCode}>{x.seminarName}</option>
                                        })}
                                    </select>
                                    <input className='SignInFormInput' type="password" placeholder="סיסמא" id='passwordManager' onInput={(e) => setCorrectnessPasswordManager(IsThePasswordCorrect(e.target.value))} />
                                    {!correctnessPasswordManager &&
                                        <>
                                            <br />
                                            <small className='error'>הסיסמה אינה תקינה</small>
                                            <br />
                                        </>}
                                    <button className="btn_login" disabled={!AreTheSeminarCodeAndPasswordCorrect(seminarCodeOfManager, correctnessPasswordManager)} onClick={() => login()}>התחברות</button>
                                </div>

                                {/* Login as user */}
                                <div className="cont_form_loginGuest">
                                    <p className='SignInFormA' onClick={() => hidden_login_and_sign_up()}><i className='SignInFormI'>«</i></p>
                                    <h2 className='SignInFormH2'>התחברות</h2>
                                    <input className='SignInFormInput' type="text" placeholder="תעודת זהות" id='username' onInput={(e) => setCorrectnessIdUser(IsTheIDCorrect(e.target.value))} />
                                    {!correctnessIdUser &&
                                        <>
                                            <br />
                                            <small className='error'>תעודת הזהות אינה תקינה</small>
                                        </>}
                                    <input className='SignInFormInput' type="password" placeholder="סיסמא" id='passwordUser' onInput={(e) => setCorrectnessPasswordUser(IsThePasswordCorrect(e.target.value))} />
                                    {!correctnessPasswordUser &&
                                        <>
                                            <br />
                                            <small className='error'>הסיסמה אינה תקינה</small>
                                        </>}
                                    {/* Option to choose seminar */}
                                    <select className='SignInFormSelect' onChange={e => { setSeminarCodeOfUser(e.target.value); }}>
                                        <option className='SignInFormOption' hidden>בחר את הסמינר שלך</option>
                                        {/* Go through seminars from list in store and add the seminars name */}
                                        {seminars.map((x) => {
                                            return <option className='SignInFormOption' id='seminarKey' key={x.seminarCode} value={x.seminarCode}>{x.seminarName}</option>
                                        })}
                                    </select>

                                    <button className="btn_login" disabled={!IsTheIDAndPasswordAndSeminarCodeCorrect(correctnessIdUser, seminarCodeOfUser, correctnessPasswordUser )} onClick={() => login()}>התחברות</button>
                                </div>
                                {/* Sign up */}
                                <div className="cont_form_sign_up">
                                    <p className='SignInFormA' onClick={() => hidden_login_and_sign_up()}><i className='SignInFormI'>«</i></p>
                                    <h2 className='SignInFormH2'>הירשם</h2>
                                    <input className='SignInFormInput' type="text" placeholder="שם סמינר" id='newSeminarName' />
                                    <input className='SignInFormInput' type="text" placeholder="דואל" id='newSeminarEmail' />
                                    <input className='SignInFormInput' type="text" placeholder="עיר" id='newSeminarCity' />
                                    <button className="btn_sign_up" onClick={() => signUp()}>הירשם</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}