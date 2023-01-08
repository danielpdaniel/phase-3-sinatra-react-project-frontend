import logo from '../logo.svg';
import '../App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import SongsList from "./SongsList";
import Song from "./Song";
import NavBar from './NavBar';
import ArtistsList from './ArtistsList';
import Artist from './Artist';

function App() {
  const [test, setTest] = useState(false)
  const [artists, setArtists] = useState(false)

  useEffect(()=>{
    fetch("http://localhost:9292/test")
    .then(r=>r.json())
    .then(data=>setTest(data[0].name))
  }, [])

  useEffect(()=>{
    fetch("http://localhost:9292/artists")
    .then(r=>r.json())
    .then(data=>setArtists(data))
  }, [])

  function handleArtistsChange(newArtistInfo){
    setArtists([...artists, newArtistInfo])
  }

  return (
    <div>
      <NavBar/>
      <Routes>
        <Route path="/songs" element={<SongsList/>}/>
        <Route path="/songs/:id" element={<Song artists={artists} />}/>
        <Route path="/artists" element={<ArtistsList artists={artists} onArtistsChange={handleArtistsChange}/>} />
        <Route path="/artists/:id" element={<Artist artists={artists} />} />
        <Route exact path="/" element={<h2>Home!</h2>}/>
      </Routes>
    </div>
  );
}

export default App;
