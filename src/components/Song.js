import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

function Song({ artists, songs }) {
    const params = useParams()
    const [song, setSong] = useState(false);

    const [covers, setCovers] = useState(false);

    const [formStatus, setFormStatus] = useState(false);
    // const [artistSearchTerm, setArtistSearchTerm] = useState("");
    // const [filteredArtists, setFilteredArtists] = useState(false);
    const [formArtist, setFormArtist] = useState(false);
    const [formPerformanceLink, setFormPerformanceLink] = useState(false);

    const [editStatus, setEditStatus] = useState(null)
    const [performanceLinkEdit, setPerformanceLinkEdit] = useState("")

    useEffect(()=>{
    fetch(`http://localhost:9292/songs/${params.id}`)
    .then(r=>r.json())
    .then(data=>{setSong(data); setCovers(data.covers)})}
    , [])

    // const song = songs ? songs.filter(song => song.id === parseInt(params.id, 10))[0] : null
    

    function handleFormClick(e, cover){
       if(e.target.name === "new_cover_btn"){
        setFormStatus(formStatus => !formStatus)
       }else {
        editStatus !== cover.id ? setEditStatus(cover.id) : setEditStatus(null);
        // setPerformanceLinkEdit(cover.artist.name)
       }
    }

    // function handleArtistSearch(e){
    //     if (e.target.value === ""){
    //         setArtistSearchTerm("")
    //         setFilteredArtists(false)
    //     }else{
    //    const searchValue = e.target.value
    //     setArtistSearchTerm(searchValue)
    //     setFilteredArtists(true)
    //     }
    // }

    // function handleArtistClick(artist) {
    //     setFormArtist(artist)
    //     setArtistSearchTerm(artist.name)
    //     setFilteredArtists(false)
    // }

    function handleArtistSelection(e){
        const artist = artists.filter(artist => artist.name === e.target.value)[0]
        setFormArtist(artist)
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
        .then(data=>{setCovers([...covers, data]);})
    }

    function handlePerformanceLinkEdit(e){
        setPerformanceLinkEdit(e.target.value)
        console.log(performanceLinkEdit)
    }

    function handleEdit(e, cover) {
        e.preventDefault();

        const patchBody = {
            artist_id: cover.artist_id,
            performance_link: performanceLinkEdit
        }
        fetch(`http://localhost:9292/covers/${cover.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchBody)
        })
        .then(r=>r.json())
        .then(data=>{
            const newCovers = covers.filter(cover => cover.artist.id !== data.artist.id)
            setCovers([...newCovers, data])

        })
    }

    function handleDelete(coverId){
        fetch(`http://localhost:9292/covers/${coverId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>r.json())
        .then(data=>{
            console.log(data)
           const nonDeletedCovers = covers.filter(cover => cover.id !== data.id)
            setCovers(nonDeletedCovers)
        })
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
                <button name={"new_cover_btn"} onClick={handleFormClick}>Add a Cover of {song.title}!</button>
                {formStatus ? 
                <div>
                    <form onSubmit={handleSubmit}>
                        <label>Artist</label>
                        <br></br>
                        <select onChange={handleArtistSelection}>
                            <option>Select Arist...</option>
                            {artists.map(artist => <option key={artist.id} value={artist.name}>{artist.name}</option>)}
                        </select>
                        {/* <input type="text" name="artist" onChange={handleArtistSearch} value={artistSearchTerm}/>
                        <div className="dropdown">
                        {filteredArtists ? artists.map(artist => artist.name.toUpperCase().includes(artistSearchTerm.toUpperCase()) ? <p key={artist.id} onClick={()=>handleArtistClick(artist)}>{artist.name}</p> : null) : null} */}
                        {/* </div> */}
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
                    <div key={cover.id} > 
                        <h5>
                        {cover.artist.name}
                        </h5>
                        <iframe width="709" height="399" src={cover.performance_link.replace("watch?v=", "embed/")} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        <button name={`edit_cover_btn_${cover.id}`} onClick={(e)=>handleFormClick(e, cover)}>{editStatus === cover.id ? "Cancel" : "Edit"}</button>
                        {editStatus === cover.id ? <form onSubmit={(e)=>handleEdit(e, cover)}>
                            <label>New Performance Link</label>
                            <input name={`edit_performance_link`} value={performanceLinkEdit} type="text" placeholder={`Youtube Link Here...`} onChange={handlePerformanceLinkEdit}/>
                            <input name={`patch_submit_btn`} type="submit"/>
                        </form> : null}
                        {cover.id === editStatus ? null : <button onClick={()=>handleDelete(cover.id)}>delete</button>}
                    </div>)}
            </div>
            : <h3>Loading...</h3>}
        </div>
    )
}

export default Song