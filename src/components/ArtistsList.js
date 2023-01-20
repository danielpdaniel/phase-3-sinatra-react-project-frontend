import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import CreateArtist from './CreateArtist';

function ArtistsList({ artists, onArtistUpdate, onNewArtist }) {
    const [editStatus, setEditStatus] = useState(null);
    const [artistNameEdit, setArtistNameEdit] = useState(null)
    
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
        .then(data=>{
            // onArtistsChange(data);
            setEditStatus(null);
            setArtistNameEdit(null); 
            onArtistUpdate(data)})
    }

    function handleDelete(artist){
        fetch(`http://localhost:9292/artists/${artist.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }  
        })
        .then(r=>r.json())
        .then(data=>{
            // onArtistsChange(data, true)
            onArtistUpdate(data, true)
        })
    }
    return (
        <div>
            <CreateArtist artists={artists} onArtistUpdate={onArtistUpdate} onNewArtist={onNewArtist}/>
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
                {editStatus ? null : <button onClick={()=>handleDelete(artist)}>Delete</button>}
            </li>)
             : <h4>Loading...</h4>}
        </div>
    )
}

export default ArtistsList