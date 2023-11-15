// import { Outlet } from 'react-router-dom'
// import { Link } from "react-router-dom"
import { Outlet, useNavigate } from 'react-router-dom'
// import '../../Style/WebSetupStyle/StepsStyle.scss'
import { useDispatch/*, useSelector*/ } from 'react-redux'
import { setPagePointerMinus, setPagePointerPlus } from '../../Redux/Actions/WebSetupActions/StepsActions'
import { useEffect } from 'react'

export const Steps = () => {

    const dispatcher = useDispatch()
    const navigate = useNavigate()

    if (localStorage.getItem('pointer') === null)
        localStorage.setItem('pointer', 0)

    //Array to keep track of what page I am on and the step styles.
    var pageArr = ['one', 'two', 'three', 'four', 'five', 'six'];
    //int to keep track of what page I am on.
    // var pointer = useSelector(pp => pp.StepsReducer.pagePointer)
    var pointer = JSON.parse(localStorage.pointer)

    useEffect(() => {

        debugger
        for (let i = 0; i < pointer; i++) {
            let name = pageArr[i + 1]
            let step = document.getElementById(name)
            step.classList.remove('allBefore')
            step.classList.add(`${name}After`)

        }
        for (let i = pointer+1; i < pageArr.length-1; i++) {
            let name = pageArr[i + 1]
            let step = document.getElementById(name)
            step.classList.remove(`${name}After`)
            if(pointer>0)
                step.classList.add('allBefore')

        }
        let name = pageArr[pointer]
        let step = document.getElementById(name)
        step.classList.remove(`${name}After`)
        step.classList.add(`${name}Before`)
        // pointer = 

        //     let btnP = document.getElementById("previous")
        //     let btnN = document.getElementById("next")
        //     if (pointer === 0) {
        //         btnP.setAttribute('disabled','')
        //     }
        //     else {
        //         btnP.removeAttribute('disabled');
        //     }
        //     if (pointer === 5) {
        //         btnN.setAttribute('disabled','')
        //     }
        //     else {
        //         btnN.removeAttribute('disabled');
        //     }

    })

    const Previous = (p) => {
        debugger

        let name = pageArr[p]
        let step = document.getElementById(name)
        step.classList.remove(`${name}After`)
        step.classList.add(`${name}Before`)

        if (p < 5) {
            name = pageArr[p + 1]
            step = document.getElementById(name)
            step.classList.remove(`${name}Before`)
            step.classList.add('allBefore')
        }

        // let btnP = document.getElementById("previous")
        // let btnN = document.getElementById("next")
        // if (pointer === 0) {
        //     btnP.setAttribute('disabled','')
        // }
        // else {
        //     btnP.removeAttribute('disabled');
        // }
        // if (pointer === 5) {
        //     btnN.setAttribute('disabled','')
        // }
        // else {
        //     btnN.removeAttribute('disabled');
        // }
        localStorage.setItem('pointer', p - 1)
        dispatcher(setPagePointerMinus(p))
        navigate(`/${pageArr[p - 1]}`)
    }

    const Next = (p) => {
        debugger

        let name = pageArr[p + 1]
        let step = document.getElementById(name)
        step.classList.remove(`${name}Before`)
        step.classList.add(`${name}After`)

        if (p < 4) {
            name = pageArr[p + 2]
            step = document.getElementById(name)
            step.classList.remove('allBefore')
            step.classList.add(`${name}Before`)
        }

        // let btnP = document.getElementById("previous")
        // let btnN = document.getElementById("next")
        // if (pointer === 0) {
        //     btnP.setAttribute('disabled','')
        // }
        // else {
        //     btnP.removeAttribute('disabled');
        // }
        // if (pointer === 5) {
        //     btnN.setAttribute('disabled','')
        // }
        // else {
        //     btnN.removeAttribute('disabled');
        // }
        localStorage.setItem('pointer', p + 1)
        dispatcher(setPagePointerPlus(p))
        navigate(`/${pageArr[p + 1]}`)
    }

    return <>
        <nav>
            <div className='square oneBefore' id='one'>
                <h2>הוספת מסלול</h2>
            </div>
            <div className='square twoBefore' id='two'>
                <h2>הוספת קורס למסלול</h2>
            </div>
            <div className='square allBefore' id='three'>
                <h2>הוספת מורות</h2>
            </div>
            <div className='square allBefore' id='four'>
                <h2>הוספת תלמידות</h2>
            </div>
            <div className='square allBefore' id='five'>
                <h2>התאמת מורה לקורס</h2>
            </div>
            <div className='square allBefore' id='six'>
                <h2>בדיקת מסלול תלמידה</h2>
            </div>
            <span></span>
        </nav>
        <Outlet></Outlet>
        <button id='previous' onClick={() => Previous(pointer)}>קודם</button>
        <button id='next' onClick={() => Next(pointer)}>הבא</button>
    </>
}