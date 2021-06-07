import React, { Component } from 'react';
import Header from '../header.js';
import './login.css';
import un from '../image/username.png';
import em from '../image/email.png';
import pw from '../image/password.png';
import { Link } from 'react-router-dom';




class Register extends Component {

    constructor() {
        super();
        this.state = {
            data: JSON.parse(localStorage.getItem("userdata")),
            Detail: JSON.parse(localStorage.getItem("Detail")),
            username: "",
            email: "",
            password: "",
            go: "f"
        };
    }
    componentDidMount() {
        this.setState({
            data: JSON.parse(localStorage.getItem("userdata")),
            Detail: JSON.parse(localStorage.getItem("Detail"))
        })
    }
    change(val) {
        this.setState({
            [val.target.name]: val.target.value,
        });
    }
    formvalidate() {
        let formvalid = "valid";

        if (this.state.email === "" || this.state.name === "" || this.state.password === "") {
            formvalid = "nemail";
        }
        this.state.data.map((item) => {
            if (item.email === this.state.email) {
                formvalid = "naccount";
            }
            return null;
        });
        return formvalid;
    }
    data() {
        var value = this.formvalidate();
        switch (value) {
            case "nemail":
                alert("Enter the Value!!..");
                this.setState({
                    username: "",
                    email: "",
                    password: ""
                })
                break;
            case "naccount":
                alert("This Email has Already Account!!..");
                this.setState({
                    username: "",
                    email: "",
                    password: ""
                })
                break;
            case "valid":
                alert("Account Created.")
                this.setState({
                    data: [...this.state.data, {
                        username: this.state.username,
                        email: this.state.email,
                        password: this.state.password
                    }],
                    go: "t",
                    Detail: { ...this.state.Detail, [this.state.email]: {} }
                });
                break;
            default:
                break;
        }
    }
    submit(e) {
        e.preventDefault();
        if (this.state.go === "t") {
            localStorage.setItem("userdata", JSON.stringify(this.state.data));
            localStorage.setItem("Detail", JSON.stringify(this.state.Detail));
            localStorage.setItem("login", this.state.email);
            this.props.history.push('dashboard');
        }
    }

    render() {
        return (
            <div className="main">
                <Header />
                <div className="singup_form">
                    <div className="formhead">Singup</div>
                    <form onSubmit={(e) => this.submit(e)}>
                        <div className="forminput">
                            <img src={un} alt="" />
                            <input type="text" placeholder="Enter Your Name" name="username" value={this.state.username} onChange={(val) => this.change(val)} required="" /><br />
                        </div>
                        <div className="forminput">
                            <img src={em} alt="" />
                            <input type="email" placeholder="Enter Your Email" name="email" value={this.state.email} onChange={(val) => this.change(val)} required="" /><br />
                        </div>
                        <div className="forminput">
                            <img src={pw} alt="" />
                            <input type="password" placeholder="PassWord" name="password" value={this.state.password} onChange={(val) => this.change(val)} required="" /><br />
                        </div>
                        <button type="submit" onClick={() => this.data()}>Singup</button>
                    </form>
                    <div className="formsingup">have account <span><Link to="/login">login</Link></span></div>
                </div>
            </div>
        );
    }
}

export default Register;