import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Song() {
    const [song, setSong] = useState(false)
    const [artists, setArtists] = useState(false)
    const [covers, setCovers] = useState(false)

    const params = useParams()

    useEffect(()=>{
    fetch(`http://localhost:9292/songs/${params.id}`)
    .then(r=>r.json())
    .then(data=>{setSong(data)})}
    , [])

    // useEffect(()=>{
    //     fetch(`http://localhost:9292/songs/${params.id}/covers`)
    //     .then(r=>r.json())
    //     .then(data=>setCovers(data))
    // }, [])

    return (
        <div>
            <h2>SONG !</h2>
            {song ? 
            <div>
                <h3>{song.title}</h3>
                <h4>By {song.artist.name}</h4> 
                <h4>Covers:</h4>
                    {song.covers.map(cover => 
                    <div key={cover.id}>
                        <h5>
                        {cover.artist.name}
                        </h5>
                        {/* <iframe src={cover.performance_link.replace("watch", "embed")}/> */}
                        <iframe width="709" height="399" src={cover.performance_link.replace("watch?v=", "embed/")} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>)}
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default Song