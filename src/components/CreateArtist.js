import React, {useState} from "react";


function CreateArtist({artists, onArtistsChange}) {
    const [newArtistName, setNewArtistName] = useState("")

    function handleNewArtistInput(e){
        const artistName = e.target.value;
        setNewArtistName(artistName)
    }
    function handleNewArtistSubmit(e){
        e.preventDefault()
        const postBody = {
            name: newArtistName
        }

        fetch(`http://localhost:9292/artists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postBody)
        })
        .then(r=>r.json())
        .then(data=>onArtistsChange(data))
    }
    return(
        <div>
            <h3>Add New Artist</h3>
            <form onSubmit={handleNewArtistSubmit}>
                <label>New Artist's Name:</label>
                <input type="text" name="artist_name" onChange={handleNewArtistInput} value={newArtistName} placeholder="new artist name here..."/>
                <input type="submit" name="new_artist_submit_btn"/>

            </form>
        </div>
    )
}

export default CreateArtist