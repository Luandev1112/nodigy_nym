import React, {useEffect, useState} from "react";
import Http from "../utils/Http";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const baseURL = "https://nodigy.com";
    const handleChange = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "c_password":
                setConfirmPassword(value);
                break;
        }
    };

    const postRegister = async() => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('c_password', confirmPassword);
        const result = await Http.post(baseURL + '/api/register', formData);
        console.log(result)
    }

    return (
        <div className="steps">
            <div className="steps-content">
                <div className="container">
                    <div className="form-group">
                        <label>Email</label>
                        <div className="card-number">
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <div className="card-number">
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="card-number">
                        <input
                            type="password"
                            className="form-control"
                            name="c_password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className="btn-container">
                        <button
                            type="button"
                            className="btn btn-primary btn-new btn-gray width100 mt-4"
                            onClick={() => postRegister()}>
                            register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
