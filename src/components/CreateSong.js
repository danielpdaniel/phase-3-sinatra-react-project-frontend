import React, {useState} from 'react';

function CreateSong({ artists, onNewSong }){
    const [newSongTitle, setNewSongTitle] = useState(null)
    const [newSongArtistId, setNewSongArtistId] = useState(null)
    console.log(artists)

   function handleFormChange(e){
    const input = e.target.value
    e.target.name === "newSongTitle" ? setNewSongTitle(input) : setNewSongArtistId(artists.filter(artist => artist.name === input)[0].id)
   }
   
    function handleSongSubmit(e){
        e.preventDefault()

        const postBody = {
            title: newSongTitle,
            artist_id: newSongArtistId
        }


        fetch(`http://localhost:9292/songs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>r.json())
        .then(data=>onNewSong(data))
    }
    return (
        <div>
            <h4>Add A Song!</h4>
            <form onSubmit={handleSongSubmit}>
                <label>Title:</label>
                <input type="text" name="newSongTitle" onChange={handleFormChange}/>
                <label>Artist:</label>
                <select name="newSongArtist" onChange={handleFormChange}>
                    <option>Select Artist...</option>
                    {artists ? artists.map(artist => <option key={artist.id}>{artist.name}</option>) : <option>Loading...</option>}
                </select>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default CreateSong