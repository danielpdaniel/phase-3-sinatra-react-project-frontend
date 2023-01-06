import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Artist({artists}) {
    const params = useParams()

    const artist = artists ? artists.filter(artist => artist.id === parseInt(params.id, 10))[0] : false;
    
    // console.log(artist)
    return(
        <div>
            <h2>{artist ? artist.name : "Loading..."}</h2>
        </div>
    )
}

export default Artist