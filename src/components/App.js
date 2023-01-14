import logo from '../logo.svg';
import '../App.css';
import React, {useState, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import SongsList from "./SongsList";
import Song from "./Song";
import NavBar from './NavBar';
import ArtistsList from './ArtistsList';
import Artist from './Artist';
import Home from './Home';

function App() {
  const [test, setTest] = useState(false);
  const [artists, setArtists] = useState(false);
  const [songs, setSongs] = useState(false);

  useEffect(()=>{
    fetch("http://localhost:9292/artists")
    .then(r=>r.json())
    .then(data=>{
      setArtists(data); 
      const filteredSongs = [];
      data.forEach(artist => artist.songs.forEach(song => filteredSongs.push(song)));
      setSongs(filteredSongs)
    })
  }, [])

  function handleArtistsChange(newArtistInfo, deleteStatus){
    const allArtists = deleteStatus ? [...artists.filter(artist => artist.id !== newArtistInfo.id)]
    :
    artists.map(artist => artist.id === newArtistInfo.id ? newArtistInfo : artist)
    // [...artists.filter(artist => artist.id !== newArtistInfo.id), newArtistInfo]
    // function compareArtistsId(a, b){
    //   if (a.name < b.name){
    //     return -1
    //   }else if (a.name > b.name) {
    //     return 1
    //   }else {
    //     return 0
    //   }
    // }
    // const orderedArtists = allArtists.sort(compareArtistsId);
    setArtists(allArtists)
    // setArtists([...artists.filter(artist => artist.id !== newArtistInfo.id), newArtistInfo])
  }

  function handleSongsEditandDelete(newOrDeletedData, deleteStatus){
    const updatedSongs = deleteStatus ? 
    songs.filter(song => song.id !== newOrDeletedData.id)
    :
    songs.map(song => song.id !== newOrDeletedData.id ? song : newOrDeletedData)
    setSongs(updatedSongs)
  }

  function handleNewSong(newSongData){
    console.log(newSongData)
    const updatedSongs = [...songs, newSongData]
    setSongs(updatedSongs)
  }


  return (
    <div>
      <h1>Cover Lover</h1>
      <h6 className="subHeader">Rub a dub dub love a cover in the tub...</h6>
      <NavBar/>
      <Routes>
        <Route path="/songs" element={<SongsList artists={artists} onSongsChange={handleSongsEditandDelete} onNewSong={handleNewSong}/>}/>
        <Route path="/songs/:id" element={<Song artists={artists} songs={songs}/>}/>
        <Route path="/artists" element={<ArtistsList artists={artists} onArtistsChange={handleArtistsChange}/>} />
        <Route path="/artists/:id" element={<Artist artists={artists} />} />
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
