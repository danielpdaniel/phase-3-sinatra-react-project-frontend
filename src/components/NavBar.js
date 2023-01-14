import React from "react";
import { NavLink } from "react-router-dom";

function NavBar(){
    return (
        <nav>
            <NavLink to = {`/`}>Home </NavLink>
            <NavLink to = {`/artists`}> Artists</NavLink>
            <NavLink to = {`/songs`}> Songs</NavLink>
        </nav>
    )
}

export default NavBar