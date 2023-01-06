import React from 'react';
import { NavLink } from 'react-router-dom';

function ArtistsList({ artists }) {
    return (
        <div>
        <h2>Artists!</h2>
        <ul>
        {artists ? artists.map(artist =>
        <li>
            <NavLink to={`/`}>
            {artist.name}
            </NavLink>
        </li>)
             : <h4>Loading...</h4>}
        </ul>
        </div>
    )
}

export default ArtistsList