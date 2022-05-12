const RegistrationNo = () => {
    let number = '';
    let selectedTownReg = []
    // Western province registration abbreviations
    const regisAbreviations = () => {
        const indexes = ['ca', 'caa', 'wp', 'cy', 'cf', 'cn', 'cl', 'ck', 'cw', 'ct', 'caw', 'cf', 'cj']
        return indexes.map(el => el.toUpperCase())
    }
    // Set/Get/Validate number
    const setRegNumber = regNo => number = regNo.toUpperCase().trim()
    const getRegNumber = () => number
    // Test Input string using Regex
    const validateRegistrationNr = number => {
        const regex = /\b[a-zA-Z]{1,2}(\s|\-)\d{2,3}((\-|\s)?\d{2,4})?\b/
        return regex.test(number)
    }
    // Check if new number exist of not
    const checkIfRegExist = (list, number) => {
        let result = list.find(regno => regno == number.toUpperCase()) ? true : false
        return result
    }
    // check if input starts with correct letters
    const checkReg = array => {
        let introArray = false
        for (let i = 0; i < array.length; i++) {
            if (getRegNumber().startsWith(array[i])) introArray = true
        }
        return introArray
    }
    // Get registration by town names
    const setTownReg = (string, array) => {
        string ? selectedTownReg = array.filter(arr => arr.trim().startsWith(string)): ''
    }
    const getTownReg = () => selectedTownReg

    return {
        setRegNumber,
        getRegNumber,
        validateRegistrationNr,
        regisAbreviations,
        checkIfRegExist,
        checkReg,
        setTownReg,
        getTownReg,

    }
}

export default RegistrationNo;