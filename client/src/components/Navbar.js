import React, {useContext} from "react";
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push('/')
    }
    return (
        <nav>
            <div className="nav-wrapper blue-grey darken-1" style={{padding: '0 2 rem'}}>
                <span className="brand-logo center">Hotel Management System</span>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink to="/create-room">Create room</NavLink></li>
                    <li><NavLink to="/rooms">List of rooms</NavLink></li>
                    <li><NavLink to="/conveniences">Conveniences</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Log out</a></li>
                </ul>
            </div>
        </nav>
    )
}