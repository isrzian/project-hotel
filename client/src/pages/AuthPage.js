import React, {useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearErrors} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearErrors()
    }, [error, message, clearErrors])

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }
        catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            message(data.message)
            auth.login(data.token, data.userId)
        }
        catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Hotel Management System</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter your email address..."
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.value}
                                    autoComplete="off"
                                    className="white-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter your password..."
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    className="white-input"
                                    onChange={changeHandler}
                                />
                                <label htmlFor="Password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            className="btn blue darken-1"
                            style={{marginRight: 20}}
                            disabled={loading}
                            onClick={loginHandler}
                        >
                            Sign in
                        </button>
                        <button
                            className="waves-effect waves-light btn pink darken-1"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}