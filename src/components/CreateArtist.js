import React, {useState} from "react";


function CreateArtist({artists, onArtistsChange}) {
    const [newArtistName, setNewArtistName] = useState(false)
    console.log(newArtistName)

    function handleNewArtistInput(e){
        const artistName = e.target.value;
        setNewArtistName(artistName)
    }
    function handleNewArtist(){

    }
    return(
        <div>
            <h3>Add New Artist</h3>
            <form>
                <label>Artist Name</label>
                <input type="text" name="artist_name" onChange={handleNewArtistInput}/>
                <input type="submit" name="new_artist_submit_btn"/>

            </form>
        </div>
    )
}

export default CreateArtist