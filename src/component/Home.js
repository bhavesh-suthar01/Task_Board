import React, { Component } from 'react';
import Header from '../header.js';
import './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {


    render() {
        return (
            <div className="main">
                <Header />
                <div className="home_section">
                    Task Board<br /><br />
                    DIY ROTATING<br /><br />
                    Goal List
                </div>
                <div className="l_s_btn">
                    <div className="l_btn">
                        <button><Link to="/login">Login</Link></button>
                    </div>
                    <div className="s_btn">
                        <button><Link to="/register">Singup</Link></button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;