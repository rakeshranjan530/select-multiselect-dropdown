import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    let navigate = useNavigate();

    const [volatile, setVolatile] = useState({
        email: '',
        password: ''
    });
    const [formError, setFormError] = useState({});

    const passwordValidate = (value) => value === null || (value.match(/^ *$/) !== null && value !== '' )  || isNaN(value);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' && passwordValidate(value)) return
        setVolatile((state) => ({
            ...state,
            [name]: value
        }))
    };
    const handleLogin = () => {
        const errors = {};
        const regex = /\S+@\S+\.\S+/;
        if (!volatile?.email) {
            errors.email = "Email is required";
        } else if (!regex.test(volatile?.email)) {
            errors.email = "This is not a valid email";
        }
        if (!volatile?.password) {
            errors.password = "Password is required";
        } else if (volatile?.password?.split('').reduce((a, b) => Number(a) + Number(b)) !==10) {
            errors.password = "Adding password must be 10";
        }
        if(Object.values(errors).length>0){
            setFormError(errors)
            return;
        }
        // redirect to home page
        navigate('/home')

    }
    return (
        <>
            <section className="vh-100 pt-5">
                <div className="container h-custom">
                    <div className="login_box row d-flex justify-content-center align-items-center h-100">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="lead fw-bold mb-3 me-3 text-center">Sign in with</p>
                                </div>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label fw-bold">Email address</label>
                                    <input type="email" className="form-control form-control-lg" name="email" value={volatile?.email}
                                        placeholder="Enter a valid email address" onChange={handleChange} />
                                    <label className="form-label text-danger">{formError?.email}</label>
                                </div>

                                {/* Password input */}
                                <div className="form-outline mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <input type="password" className="form-control form-control-lg" name="password" value={volatile?.password}
                                        placeholder="Enter password" onChange={handleChange} />
                                    <label className="form-label text-danger">{formError?.password}</label>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => handleLogin()}
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                </div>

                            </form>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default LoginForm;