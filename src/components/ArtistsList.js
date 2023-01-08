import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import CreateArtist from './CreateArtist';

function ArtistsList({ artists, onArtistsChange }) {
    const [editStatus, setEditStatus] = useState(null);
    const [artistNameEdit, setArtistNameEdit] = useState(null)
    console.log(editStatus)
    
    function handleEditClick(artist){
        editStatus !== artist.id ? setEditStatus(artist.id) : setEditStatus(null);
        artistNameEdit !== artist.name ? setArtistNameEdit(artist.name) : setArtistNameEdit(null);
    }

    function handleEditInput(e) {
        setArtistNameEdit(e.target.value)
    }

    function handleEditSubmit(e) {
        e.preventDefault()

        const patchBody = {
            name: artistNameEdit
        }
        fetch(`http://localhost:9292/artists/${editStatus}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchBody)
        })
        .then(r=>r.json())
        .then(data=>{onArtistsChange(data); setEditStatus(null); setArtistNameEdit(null)})
    }
    return (
        <div>
            <CreateArtist artists={artists} onArtistsChange={onArtistsChange}/>
        <h2>Artists!</h2>
        {/* <ul> */}
        {artists ? artists.map(artist =>
            <li key={artist.id}>
                {artist.id === editStatus ?
                <form onSubmit={handleEditSubmit}>
                    <input placeholder={artist.name} type="text" value={artistNameEdit} onChange={handleEditInput}/>
                    <input type="submit"/>
                </form>
                    :
                <NavLink to={`/artists/${artist.id}`}>
                {artist.name}
                </NavLink>}
                <button onClick={()=>handleEditClick(artist)}>{artist.id === editStatus ? "Cancel" : "Edit"}</button>
            </li>)
             : <h4>Loading...</h4>}
        {/* </ul> */}
        </div>
    )
}

export default ArtistsList