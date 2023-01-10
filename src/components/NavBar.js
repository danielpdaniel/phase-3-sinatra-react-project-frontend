import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <nav>
            <NavLink to = {`/`}>Home </NavLink>
            <NavLink to = {`/songs`}> Songs</NavLink>
            <NavLink to = {`/artists`}> Artists</NavLink>
        </nav>
    )
}

export default NavBar