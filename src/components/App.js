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

  function handleArtistUpdate(artistData, deleteStatus){
    console.log(artistData)
    if(!deleteStatus){
    const objToEdit = artists.filter(artist => artist.id === artistData.id)[0]
    const updatedArtists = objToEdit ? artists.map(artist => artist.id !== artistData.id ? artist : artistData) : [...artists, artistData]
    setArtists(updatedArtists)
    }else {
      const updatedArtists = artists.filter(artist => artist.id !== artistData.id)
    
      setArtists(updatedArtists)
      
      const updatedSongs = songs.filter(song => song.artist_id !== artistData.id)
      
      const updatedSongsDeletedArtistsCoversRemoved = updatedSongs.map(song => {
        const theseCovers = song.covers.filter(cover => cover.artist_id !== artistData.id)
        const thisSong = song
        thisSong.covers = theseCovers
        return thisSong
      })
      
      setSongs(updatedSongsDeletedArtistsCoversRemoved)
    }
  }

  // function handleNewArtist(newArtistData){
  //   const allArtists = [...artists, newArtistData]
     
  //   function compareArtistsId(a, b){
  //     if (a.name < b.name){
  //       return -1
  //     }else if (a.name > b.name) {
  //       return 1
  //     }else {
  //       return 0
  //     }
  //   }
  //   const orderedArtists = allArtists.sort(compareArtistsId);

  //   setArtists(orderedArtists)
  // }

  function handleSongUpdate(songData){
    console.log(songData)
    const updatedArtists = artists.map(artist => artist.id !== songData.artist.id ? artist : songData.artist)

    const songObj = songs.filter(song => song.id === songData.id)[0]
    const updatedSongs = songObj ? songs.map(song => song.id !== songData.id ? song : songData) : [...songs, songData]
 
    setArtists(updatedArtists)
    setSongs(updatedSongs)

  }

  function handleFetchDataInState(data){
    const updatedArtists = artists.map (artist => artist.id !== data.artist.id ? artist : data.artist)
    const updatedSongs = []
    updatedArtists.forEach(artist => Boolean(artist.songs) ? artist.songs.forEach(song => updatedSongs.push(song)) : null)

    setArtists(updatedArtists);
    setSongs(updatedSongs);
  }

  // function handleSongsEditandDelete(newOrDeletedData, deleteStatus){
  //   const updatedSongs = deleteStatus ? 
  //   songs.filter(song => song.id !== newOrDeletedData.id)
  //   :
  //   songs.map(song => song.id !== newOrDeletedData.id ? song : newOrDeletedData)
  //   setSongs(updatedSongs)

  //   if(deleteStatus){

  //   const updatedArtists = artists.map(artist => artist.id !== newOrDeletedData.artist_id ? artist : newOrDeletedData.artist)
  //   setArtists(updatedArtists)
  //   console.log(updatedArtists)
  
  //   }
  // }

  function handleCoverUpdate(coverData){
    const updatedArtists = artists.map(artist => artist.id !== coverData.song.artist.id ? artist : coverData.song.artist)
    const updatedCoverArtist = updatedArtists.map(artist => artist.id !== coverData.artist_id ? artist : coverData.artist)
    setArtists(updatedCoverArtist)
    console.log(updatedCoverArtist)
    

    const updatedSongs = songs.map(song => song.id !== coverData.song_id ? song : coverData.song)
    setSongs(updatedSongs)
  }

  // function handleNewSong(newSongData){
  //   const updatedSongs = [...songs, newSongData]
  //   setSongs(updatedSongs)
  //   const allArtists = artists.map(artist => artist.id !== newSongData.artist.id ? artist : artist.songs = [...artist.songs, newSongData])
  // }


  return (
    <div>
      <h1>Cover Lover</h1>
      <h6 className="subHeader">Rub a dub dub love a cover in the tub...</h6>
      <NavBar/>
      <Routes>
        <Route path="/songs" element={<SongsList artists={artists} songs={songs} onSongUpdate={handleSongUpdate}/>}/>
        <Route path="/songs/:id" element={<Song artists={artists} songs={songs} onCoverUpdate={handleCoverUpdate}/>}/>
        <Route path="/artists" element={<ArtistsList artists={artists} onArtistUpdate = {handleArtistUpdate} />} />
        <Route path="/artists/:id" element={<Artist artists={artists} songs={songs}/>} />
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
