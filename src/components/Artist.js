import React from "react";
import { useParams } from "react-router-dom";

function Artist({artists}) {
    const params = useParams()

    const artist = artists ? artists.filter(artist => artist.id === 3) : false
    // console.log(artist)
    return(
        <div>
            <h2>{artist ? artist[0].name : "Loading..."}</h2>
        </div>
    )
}

export default Artist