import axios from "axios"

export const UploadFileExcel = (id, seminarCode, formData) => {
    return (axios.post(`https://localhost:44367/api/${id}/UploadFileExcel/${seminarCode}`, formData))
}