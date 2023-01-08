import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import CreateSong from "./CreateSong";

function SongsList({ artists }){
    const [songs, setSongs] = useState(false)

    useEffect(()=>{
        fetch("http://localhost:9292/songs")
        .then(r=>r.json())
        .then(data=>setSongs(data))
    }, [])

    function handleNewSong(newSong){
        setSongs([...songs, newSong])
    }

    return (
        <div>
            <CreateSong artists={artists} onNewSong={handleNewSong}/>
            <h3>Songs</h3>
            <ul>
                {songs ? songs.map(song => 
                <li key={song.id}>
                    <NavLink to = {`/songs/${song.id}`}>
                    {song.title}
                    </NavLink>
                </li>
                    ) : <li>Loading...</li>}
            </ul>
        </div>
    )
}

export default SongsList