import React from 'react';
import { NavLink } from 'react-router-dom';
import CreateArtist from './CreateArtist';

function ArtistsList({ artists, onArtistsChange }) {
    
    return (
        <div>
            <CreateArtist artists={artists} onArtistsChange={onArtistsChange}/>
        <h2>Artists!</h2>
        <ul>
        {artists ? artists.map(artist =>
        <li key={artist.id}>
            <NavLink to={`/artists/${artist.id}`}>
            {artist.name}
            </NavLink>
        </li>)
             : <h4>Loading...</h4>}
        </ul>
        </div>
    )
}

export default ArtistsList