import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

function Artist({artists}) {
    const params = useParams()

    const artist = artists ? artists.filter(artist => artist.id === parseInt(params.id, 10))[0] : false;
    
    return(
        <div>
            <h2>{artist ? artist.name : "Loading..."}</h2>
            <h3>Songs:</h3>
            <ul>
            {artist ? artist.songs.map(song => 
                <li key={song.id}>
                    <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                </li>) : 
                <li>Loading...</li>}
            </ul>
            <h3>Covers:</h3>
            <ul>
            {artist ? artist.covers.map(cover => 
                <li key={`cover${cover.id}`}>
                    <NavLink to={`/songs/${cover.song_id}`}>{cover.song.title}</NavLink>
                    <p>originally by {cover.song.artist.name}</p>
                </li>) : 
                <li>Loading...</li>}
            </ul>
        </div>
    )
}

export default Artist