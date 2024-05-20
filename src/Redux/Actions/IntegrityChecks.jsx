
export const IsTheIDCorrect = (id) => {
    if (id.length < 9)
        return false;
    let sum = 0
    let temp = ''
    for (let index = 0; index < id.length; index++) {
        if (index % 2 === 0)
            temp = id[index]
        else
            temp = id[index] * 2
        sum += temp % 10
        if (temp >= 10) {
            temp -= temp % 10
            temp /= 10
            sum += temp
        }
    }
    if (sum % 10 === 0 && sum > 0 && id.length === 9)
        return true
    else return false
}

export const IsTheCharacterInputANumber = (keyboardCharacter) => {
    if ([8, 37, 39, 46].includes(keyboardCharacter.keyCode)) return false
    else return !(/^\d+$/.test(keyboardCharacter.key));
    
    // if (!((keyboardCharacter.keyCode >= 48 && keyboardCharacter.keyCode <= 57) ||
    //     (keyboardCharacter.keyCode >= 97 && keyboardCharacter.keyCode <= 105) ||
    //     keyboardCharacter.keyCode === 8 || keyboardCharacter.keyCode === 96))
    //     return true
    // return false
}

export const IsTheCharacterInputALetter = (keyboardCharacter) => {
    if ((keyboardCharacter.keyCode >= 48 && keyboardCharacter.keyCode <= 57) ||
        (keyboardCharacter.keyCode >= 97 && keyboardCharacter.keyCode <= 105))
        return true
    return false
}

export const IsThePasswordCorrect = (password) => {
    var symbolChars = "!@#$%&";

    var lengthPassword = 6;

    var countCapitalLetter = 0;
    var countLowercaseLetter = 0;
    var countDigits = 0;
    var countSymbols = 0;

    for (let index = 0; index < password.length; index++) {
        if ((password.charAt(index) >= 'A') &&
            (password.charAt(index) <= 'Z'))
            countCapitalLetter++;
        else
            if ((password.charAt(index) >= 'a') &&
                (password.charAt(index) <= 'z'))
                countLowercaseLetter++;
            else
                if ((password.charAt(index) >= '0') &&
                    (password.charAt(index) <= '9'))
                    countDigits++;
                else
                    if (symbolChars.indexOf(password.charAt(index)) !== -1)
                        countSymbols++;
    }
    if ((countCapitalLetter > 0) && (countLowercaseLetter > 0) && (countDigits > 0) && (countSymbols > 0) &&
        (countCapitalLetter + countLowercaseLetter + countDigits + countSymbols === lengthPassword))
        return true
    return false
}

export const IsEmpty = (str) => {
    return str.length === 0;
}

export const AreTheSeminarCodeAndPasswordCorrect = (seminarCode, isThePasswordCorrect) => {
    return (seminarCode !== 0 && isThePasswordCorrect);
}

export const IsTheIDAndPasswordAndSeminarCodeCorrect = (isTheIDCorrect, seminarCode, isThePasswordCorrect) => {
    return (isTheIDCorrect && AreTheSeminarCodeAndPasswordCorrect(seminarCode, isThePasswordCorrect));
}

export const IsValidEmail = (email) => {
    // Define a regular expression pattern for email validation.
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export const AreTheFormFieldsFilledInCorrectly = (seminarName, seminarEmail, seminarCity) => {
    return (seminarName !== '' && IsValidEmail(seminarEmail) && seminarCity !== '')
}