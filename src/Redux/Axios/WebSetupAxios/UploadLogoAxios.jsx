import axios from "axios"

export const uploadALogo = (formData) => {
    return (axios.post("https://localhost:44367/api/Seminar/UploadALogo", formData))
}