import React, {useState} from 'react';

function CreateSong({ artists, onNewSong }){
    const [newSongTitle, setNewSongTitle] = useState("")
    const [newSongArtistName, setNewSongArtistName] = useState("")
    const [newSongArtistId, setNewSongArtistId] = useState(null)
    const [newSongPerformanceLink, setNewSongPerformanceLink] = useState("")

   function handleFormChange(e){
    const input = e.target.value
    if (e.target.name === "newSongTitle"){
        setNewSongTitle(input)
    }else if (e.target.name === "newSongArtist"){
        input === "Select Artist..." ?
        setNewSongArtistId(null)
        :
        setNewSongArtistId(artists.filter(artist => artist.name === input)[0].id)
        setNewSongArtistName(input)
    }else if (e.target.name === "newSongPerformanceLink"){
        setNewSongPerformanceLink(input)
    }
   }
  
    function handleSongSubmit(e){
        e.preventDefault()
        
        const postBody = {
            title: newSongTitle,
            artist_id: newSongArtistId,
            performance_link: newSongPerformanceLink
        }

        if (!newSongTitle){
            alert("You must add song title to submit!")
        }else if (!newSongArtistId){
            alert("You must select artist to submit!")
        }else if (!newSongPerformanceLink){
            alert("You must add YouTube perfomance link to submit!")
        }else {
        fetch(`http://localhost:9292/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>r.json())
        .then(data=>{
            onNewSong(data);
            setNewSongTitle("");
            setNewSongArtistId(null);
            setNewSongArtistName("")
            setNewSongPerformanceLink("")
        })
         }
    }
    return (
        <div>
            <h4>Add A Song!</h4>
            <form onSubmit={handleSongSubmit}>
                <label>Title:</label>
                <input type="text" name="newSongTitle" onChange={handleFormChange} value={newSongTitle}/>
                <label>Artist:</label>
                <select name="newSongArtist" onChange={handleFormChange} value={newSongArtistName}>
                    <option>Select Artist...</option>
                    {artists ? artists.map(artist => <option key={artist.id}>{artist.name}</option>) : <option>Loading...</option>}
                </select>
                <label>YouTube Performance Link:</label>
                <input type="text" name="newSongPerformanceLink" onChange={handleFormChange} value={newSongPerformanceLink}/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateSong