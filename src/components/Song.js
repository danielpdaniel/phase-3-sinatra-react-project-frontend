import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Song({ artists }) {
    const [song, setSong] = useState(false);
    const [covers, setCovers] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [artistSearchTerm, setArtistSearchTerm] = useState("");
    const [filteredArtists, setFilteredArtists] = useState(false);
    const [formArtist, setFormArtist] = useState(false);
    const [formPerformanceLink, setFormPerformanceLink] = useState(false);

    const params = useParams()

    useEffect(()=>{
    fetch(`http://localhost:9292/songs/${params.id}`)
    .then(r=>r.json())
    .then(data=>{setSong(data); setCovers(data.covers)})}
    , [])

    function handleNewCoverClick(){
        setFormStatus(formStatus => !formStatus)
    }

    function handleArtistSearch(e){
        if (e.target.value === ""){
            setArtistSearchTerm("")
            setFilteredArtists(false)
        }else{
       const searchValue = e.target.value
        setArtistSearchTerm(searchValue)
        setFilteredArtists(true)
        }
    }

    function handleArtistClick(artist) {
        setFormArtist(artist)
        setArtistSearchTerm(artist.name)
        setFilteredArtists(false)
    }

    function handleInputChange(e) {
        setFormPerformanceLink(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
       const postBody = {
            song_id: song.id,
            artist_id: formArtist.id,
            performance_link: formPerformanceLink
        }
        fetch(`http://localhost:9292/covers`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>r.json())
        .then(data=>{setSong([...song, data]); console.log(data)})
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
                    <form onSubmit={handleSubmit}>
                        <label>Artist Name</label>
                        <br></br>
                        {/* <select>
                            {artists.map(artist => <option key={artist.id} value={artist.name}>{artist.name}</option>)}
                        </select> */}
                        <input type="text" name="artist" onChange={handleArtistSearch} value={artistSearchTerm}/>
                        <div className="dropdown">
                        {filteredArtists ? artists.map(artist => artist.name.toUpperCase().includes(artistSearchTerm.toUpperCase()) ? <p key={artist.id} onClick={()=>handleArtistClick(artist)}>{artist.name}</p> : null) : null}

                        </div>
                        <br></br>
                        <label>YouTube link</label>
                        <br></br>
                        <input type="text" name="performance_link" onChange={handleInputChange}/>
                        <input type="submit"/>
                    </form>
                </div>
                : null}
                </div>
                    {covers.map(cover => 
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