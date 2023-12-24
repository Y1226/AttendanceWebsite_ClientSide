import axios from "axios"

export const loginToTheSystem = (password, seminarCode, identificationNumber) => {
    return (axios.get(`https://localhost:44367/api/Login/LoginToTheSystem/${password}/${seminarCode}/${identificationNumber}`));
}