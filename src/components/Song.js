import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Song({ artists }) {
    const [song, setSong] = useState(false)
    const [formStatus, setFormStatus] = useState(false)
    const [artistSearchTerm, setArtistSearchTerm] = useState(false)

    const params = useParams()

    useEffect(()=>{
    fetch(`http://localhost:9292/songs/${params.id}`)
    .then(r=>r.json())
    .then(data=>{setSong(data)})}
    , [])

    function handleNewCoverClick(){
        setFormStatus(formStatus => !formStatus)
    }

    return (
        <div>
            <h2>SONG !</h2>
            {song ? 
            <div>
                <h3>{song.title}</h3>
                <h4>By {song.artist.name}</h4> 
                <h4>Covers:</h4>
                <div>
                <button onClick={handleNewCoverClick}>Add a Cover of {song.title}!</button>
                {formStatus ? 
                <div>
                    <form>
                        <label for="artist">Artist Name</label>
                        <br></br>
                        {/* <select>
                            {artists.map(artist => <option key={artist.id} value={artist.name}>{artist.name}</option>)}
                        </select> */}
                        <input type="text" name="artist"/>
                        <br></br>
                        <label for="performance_link">YouTube link</label>
                        <br></br>
                        <input type="text" name="performance_link"/>
                    </form>
                </div>
                : null}
                </div>
                    {song.covers.map(cover => 
                    <div key={cover.id}>
                        <h5>
                        {cover.artist.name}
                        </h5>
                        {/* <iframe src={cover.performance_link.replace("watch", "embed")}/> */}
                        <iframe width="709" height="399" src={cover.performance_link.replace("watch?v=", "embed/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <button>edit</button>
                        <button>delete</button>
                    </div>)}
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default Song