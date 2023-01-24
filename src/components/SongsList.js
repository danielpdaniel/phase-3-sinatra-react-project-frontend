import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import CreateSong from "./CreateSong";

function SongsList({ artists, songs, onNewSong, onEditSong, onDeleteSong }){
  
    const [editStatus, setEditStatus] = useState(false)
    const [songTitleEdit, setSongTitleEdit] = useState(false)
    const [songLinkEdit, setSongLinkEdit] = useState("")

    function handleEditClick(song){
        if (editStatus === song.id) {
        setEditStatus(false)
        setSongTitleEdit(false)
        setSongLinkEdit("")
        }else {
        setEditStatus(song.id)
        setSongTitleEdit(song.title)
        if(song.performance_link){
            setSongLinkEdit(song.performance_link)
        }
        }
    }

    function handleEditInput(e){
        if (e.target.name === "titleEdit"){
            setSongTitleEdit(e.target.value)
        } else if (e.target.name === "performanceLinkEdit"){
            setSongLinkEdit(e.target.value)
        }
    }

    function handleEditSubmit(e){
        e.preventDefault()

        const patchBody = {
            title: songTitleEdit,
            performance_link: songLinkEdit
        }
        if (!songLinkEdit){
            alert("You must include a YouTube Performance Link!")
        }else if (!songTitleEdit){
            alert("You must include a song title!")
        }else {
        fetch(`http://localhost:9292/songs/${editStatus}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patchBody)
        })
        .then(r=>r.json())
        .then(data=>{
            onEditSong(data);
            setEditStatus(false);
        })
        }
    }

    function handleDeleteSong(song){
        fetch(`http://localhost:9292/songs/${song.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(r=>r.json())
        .then(data=> {
            onDeleteSong(data)
        })
    }

    return (
        <div>
            <CreateSong artists={artists} onNewSong={onNewSong}/>
            <h3>Songs</h3>
            <ul>
                {songs ? songs.map(song => 
                <li key={song.id}>
                    {
                        editStatus === song.id ?
                        <form onSubmit={handleEditSubmit}>
                            <label>Song Title:</label>
                            <input name="titleEdit" type="text" placeholder={song.title} value={songTitleEdit} onChange={handleEditInput}/>
                            <label>YouTube Performance Link:</label>
                            <input name ="performanceLinkEdit" type="text" placeholder={song.performance_link} value={songLinkEdit} onChange={handleEditInput}/>
                            <input type="submit"/>
                        </form>
                        :
                        <div>
                        <NavLink to = {`/songs/${song.id}`}>
                        {song.title}
                        </NavLink>
                        <p>by {song.artist.name}</p>
                        </div>
                    }
                    <button onClick={()=>handleEditClick(song)}>{editStatus === song.id ? "Cancel" : "Edit"}</button>
                    {editStatus === song.id ? null : <button onClick={()=>handleDeleteSong(song)}>Delete</button>}
                </li>
                    ) : <li>Loading...</li>}
            </ul>
        </div>
    )
}

export default SongsList