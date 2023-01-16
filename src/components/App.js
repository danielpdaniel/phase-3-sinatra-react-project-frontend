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
    if(deleteStatus){
      const allArtists = [...artists.filter(artist => artist.id !== newArtistInfo.id)]
      setArtists(allArtists)
      const allSongs = [...songs.filter(song => song.artist_id !== newArtistInfo.id)]
      setSongs(allSongs)
    }else {
      const allArtists = artists.map(artist => artist.id === newArtistInfo.id ? newArtistInfo : artist)
      setArtists(allArtists)
    }
  }

  function handleNewArtist(newArtistData){
    const allArtists = [...artists, newArtistData]
     
    function compareArtistsId(a, b){
      if (a.name < b.name){
        return -1
      }else if (a.name > b.name) {
        return 1
      }else {
        return 0
      }
    }
    const orderedArtists = allArtists.sort(compareArtistsId);

    setArtists(orderedArtists)
  }

  function handleSongsEditandDelete(newOrDeletedData, deleteStatus){
    const updatedSongs = deleteStatus ? 
    songs.filter(song => song.id !== newOrDeletedData.id)
    :
    songs.map(song => song.id !== newOrDeletedData.id ? song : newOrDeletedData)
    setSongs(updatedSongs)

    if(deleteStatus){

    const updatedArtists = artists.map(artist => artist.id !== newOrDeletedData.artist_id ? artist : newOrDeletedData.artist)
    setArtists(updatedArtists)
    console.log(updatedArtists)
  
    }
  }

  function handleCoverUpdate(coverData){
    const updatedArtists = artists.map(artist => artist.id !== coverData.song.artist.id ? artist : coverData.song.artist)
    const updatedCoverArtist = updatedArtists.map(artist => artist.id !== coverData.artist_id ? artist : coverData.artist)
    setArtists(updatedCoverArtist)
    

    const updatedSongs = songs.map(song => song.id !== coverData.song_id ? song : coverData.song)
    setSongs(updatedSongs)
  }

  function handleNewSong(newSongData){
    const updatedSongs = [...songs, newSongData]
    setSongs(updatedSongs)
    const allArtists = artists.map(artist => artist.id !== newSongData.artist.id ? artist : artist.songs = [...artist.songs, newSongData])
  }


  return (
    <div>
      <h1>Cover Lover</h1>
      <h6 className="subHeader">Rub a dub dub love a cover in the tub...</h6>
      <NavBar/>
      <Routes>
        <Route path="/songs" element={<SongsList artists={artists} songs={songs} onSongsChange={handleSongsEditandDelete} onNewSong={handleNewSong}/>}/>
        <Route path="/songs/:id" element={<Song artists={artists} songs={songs} onCoverUpdate={handleCoverUpdate}/>}/>
        <Route path="/artists" element={<ArtistsList artists={artists} onArtistsChange={handleArtistsChange} onNewArtist={handleNewArtist}/>} />
        <Route path="/artists/:id" element={<Artist artists={artists} />} />
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
