export function validator(data, config) {
    const errors = {}
    let statusValidate
    function validate(validateMethod, data, config) {
        switch (validateMethod) {
        case "isRequired":
            statusValidate = data.trim() === ""
            break
        case "isEmail": {
            const emailRegEx = /^\S+@\S+\.\S+$/g
            statusValidate = !emailRegEx.test(data)
            break
        }
        case "isCapitalSymbol": {
            const capitalRegEx = /[A-Z]+/g
            statusValidate = !capitalRegEx.test(data)
            break
        }
        case "hasDigits": {
            const digitsRegEx = /\d+/g
            statusValidate = !digitsRegEx.test(data)
            break
        }
        case "min": {
            statusValidate = data.length < config.value
            break
        }
        default:
            break
        }
        if (statusValidate) return config.message
    }

    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            )
            if (error && !errors[fieldName]) {
                errors[fieldName] = error
            }
        }
    }

    return errors
}
