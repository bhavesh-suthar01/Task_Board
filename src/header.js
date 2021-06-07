import React from 'react';
import './header.css';
import profile from './image/userphoto.jpeg'


let online = false;

class Header extends React.Component {



    check() {

        if (localStorage.getItem("login") === "") {
            return;
        } else {
            var username;
            JSON.parse(localStorage.getItem("userdata")).map((item) => {
                if (item.email === localStorage.getItem("login")) {
                    username = item.username;
                }
                return username;
            })
            return (
                <div style={{ display: "flex" }}>
                    <div className="username">Welcome, <span>{username}</span></div>
                    <div className="userimg">
                        <div className="user_img">
                            {
                                online ? <img src='' alt=""></img>
                                    : <img src={profile} alt=""></img>
                            }
                        </div>
                    </div>
                </div>
            );
        }
    }
    render() {

        return (
            <div className={`header${localStorage.getItem("login") === "" ? "" : " hclass"}`}>
                <div className="l_name" >Task Board</div>
                {this.check()}
            </div>
        )
    }
}

export default Header;