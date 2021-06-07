import React from 'react';
import './notfound.css';
import { Link } from 'react-router-dom';


class Login extends React.Component {



    render() {
        return (
            <div className="notfound">
                Error : 404<br /><br />
                Page Not Found<br />
                <span>Go to <Link to="/">HOME</Link></span>
            </div>
        )
    }

}

export default Login;