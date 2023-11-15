import produce from 'immer'

const stepsState = {
    pagePointer: 0
}

export const StepsReducer = produce(
    (s,a) => {
        switch (a.type) {
            case 'setPagePointerPlus':
                debugger
                s.pagePointer++
                break; 
            case 'setPagePointerMinus':
                debugger
                s.pagePointer--
                break;
            default:
                break;
        }
    },
    stepsState
)

export default StepsReducer