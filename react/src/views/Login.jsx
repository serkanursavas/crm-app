import React from "react";
import { Link } from "react-router-dom";

function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not registered? <Link to="/register">Create an account</Link>
            </p>
        </form>
    );
}

export default Login;
