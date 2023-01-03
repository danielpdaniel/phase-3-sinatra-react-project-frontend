import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Song() {
    const [song, setSong] = useState(false)
    const [artist, setArtist] = useState(false)

    const params = useParams()

    useEffect(()=>{
    fetch(`http://localhost:9292/songs/${params.id}`)
    .then(r=>r.json())
    .then(data=>setSong(data))}
    , [])

    useEffect(()=>{
        fetch(`http://localhost:9292/artists/${song.artist_id}`)
        .then(r=>r.json())
        .then(data=>setArtist(data.name))}
        , [song])
    return (
        <div>
            <h2>SONG !</h2>
            {song ? 
            <div>
            <h3>{song.title}</h3>
            <h4>By {artist}</h4> 
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default Song