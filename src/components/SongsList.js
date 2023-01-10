import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import CreateSong from "./CreateSong";

function SongsList({ artists, songs, onSongsChange }){
    // const [songs, setSongs] = useState(false)

    // useEffect(()=>{
    //     fetch("http://localhost:9292/songs")
    //     .then(r=>r.json())
    //     .then(data=>setSongs(data))
    // }, [])

    function handleNewSong(newSong){
        onSongsChange(newSong)
    }

    function handleDeleteSong(song){
        fetch(`http://localhost:9292/songs/${song.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>r.json())
        .then(data=> onSongsChange(data, true))
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
                    <button onClick={()=>handleDeleteSong(song)}>Delete</button>
                </li>
                    ) : <li>Loading...</li>}
            </ul>
        </div>
    )
}

export default SongsList