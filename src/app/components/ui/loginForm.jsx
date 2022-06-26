import React, { useState, useEffect } from "react"
import { validator } from "../../utils/validator"
import TextField from "../common/form/textField"

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({})

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email is required"
            },
            isEmail: {
                message: "Email is incorrect"
            }
        },
        password: {
            isRequired: {
                message: "Password is required"
            },
            isCapitalSymbol: {
                message: "Password should have at least 1 capital letter"
            },
            hasDigits: {
                message: "Password should have at least 1 digit"
            },
            min: {
                message: "Passowrd should have at leasst 8 symbols",
                value: 8
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const handleChange = ({ target }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const isValid = validate()
        if (!isValid) return ""
        console.log(data)
    }
    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Email" name="email" value={data.email} onChange={handleChange} error={errors.email} />
                        <TextField label="Password" type="password" name="password" value={data.password} onChange={handleChange} error={errors.password} />
                        <button disabled={!isValid} className="btn btn-primary mx-auto w-100">
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
