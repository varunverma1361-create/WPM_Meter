import {NavLink} from "react-router-dom";
import Logout from "./Logout"

export default function Navbar(){

    const linkStyle = ({isActive})=>({
        fontWeight: isActive ? "bold" : "normal",
        textDecoration: isActive ? "underline" : "none",
        marginRight: "12px"
    });

    return (
        <>
            <nav>
                <NavLink to="/test" style={linkStyle}>Test</NavLink>
                <NavLink to="/profile" style={linkStyle}>Profile</NavLink>
                <NavLink to="/stats" style={linkStyle}>Stats</NavLink>
                <NavLink to="/history" style={linkStyle}>History</NavLink>
                <Logout/>
            </nav>
        </>
    )
}