import axios from "axios"
import { useDispatch } from "react-redux"
import { FillStaffData } from "../../Actions/TableActions/TeacherTableAction"

export const GetFullStaffData = () => {
    let d = useDispatch()
    return axios.get('https://localhost:44367/api/Staff/GetFullStaffData').then(x => d(FillStaffData(x.data)))
}
