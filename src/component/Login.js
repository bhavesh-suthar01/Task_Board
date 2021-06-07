import React, { Component } from 'react';
import Header from '../header.js';
import './login.css';
import un from '../image/username.png';
import pw from '../image/password.png';
import { Link } from 'react-router-dom';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            data: JSON.parse(localStorage.getItem("userdata")),
            email: null,
            password: null,
        };
    }
    change(val) {
        this.setState({
            [val.target.name]: val.target.value,
        })
    }
    detailcheck() {
        var detail = false;
        this.state.data.map((item) => {
            if (item.email === this.state.email) {
                if (item.password === this.state.password) {
                    detail = true;
                }
            }
            return null;
        })
        return detail;
    }
    submit(e) {
        e.preventDefault();
        if (this.state.email === null || this.state.password === null) {
            this.setState({
                email: "",
                password: "",
            })
            alert("Enter Correct Login Detail!!..");
        } else if (this.detailcheck()) {
            localStorage.setItem("login", this.state.email);
            this.props.history.push('dashboard');
        } else {
            this.setState({
                email: "",
                password: "",
            })
            alert("Enter Currect Login Detail!!..")
        }
    }
    render() {
        return (
            <div className="main">
                <Header />
                <div className="Login">
                    <div className="login_form">
                        <div className="formhead">Login</div>
                        <form id="" onSubmit={(e) => this.submit(e)}>
                            <div className="forminput">
                                <img src={un} alt="" />
                                <input type="email" placeholder="Enter Your Email" name="email" value={this.state.email} onChange={(val) => this.change(val)} required=""
                                /><br />
                            </div>
                            <div className="forminput">
                                <img src={pw} alt="" />
                                <input type="password" placeholder="PassWord" name="password" value={this.state.password} onChange={(val) => this.change(val)} required="" /><br />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <div className="formsingup">don't have account <span><Link to="/register">singup</Link></span></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;