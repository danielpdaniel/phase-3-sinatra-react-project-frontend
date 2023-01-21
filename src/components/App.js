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

  function handleNewArtist(artistData){
    const updatedArtists = [...artists, artistData]
    const updatedArtistsSortedByName = updatedArtists.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()
      if(nameA < nameB){
        return -1
      }else if (nameA > nameB){
        return 1
      }else {
        return 0
      }
    })
    setArtists(updatedArtistsSortedByName)
  }

  function handleEditArtist(artistData){
    const updatedArtists = artists.map(artist => artist.id !== artistData.id ? artist : artistData);
    setArtists(updatedArtists)
  }

  function handleDeleteArtist(artistData){
    const updatedArtists = artists.filter(artist => artist.id !== artistData.id).map(artist =>{
      return {...artist,
      covers: [...artist.covers.filter(cover => cover.song.artist_id !== artistData.id)],
      songs: [...artist.songs.map(song =>{
        return {...song,
        covers: [...song.covers.filter(cover => cover.artist_id !== artistData.id)]}
      })]
      }
    })

    const updatedSongs = songs.filter(song => song.artist_id !== artistData.id).map(song =>{
      return {...song,
      covers: [...song.covers.filter(cover => cover.artist_id !== artistData.id)]}
    })
    setArtists(updatedArtists)
    setSongs(updatedSongs)
  }

  // function handleArtistUpdate(artistData, deleteStatus){
  //   console.log(artistData)
  //   if(!deleteStatus){
  //   const objToEdit = artists.filter(artist => artist.id === artistData.id)[0]
  //   const updatedArtists = objToEdit ? artists.map(artist => artist.id !== artistData.id ? artist : artistData) : [...artists, artistData]
  //   setArtists(updatedArtists)
  //   }else {
  //     const updatedArtists = artists.filter(artist => artist.id !== artistData.id)
    
  //     setArtists(updatedArtists)
      
  //     const updatedSongs = songs.filter(song => song.artist_id !== artistData.id)
      
  //     const updatedSongsDeletedArtistsCoversRemoved = updatedSongs.map(song => {
  //       const theseCovers = song.covers.filter(cover => cover.artist_id !== artistData.id)
  //       const thisSong = song
  //       thisSong.covers = theseCovers
  //       return thisSong
  //     })
      
  //     setSongs(updatedSongsDeletedArtistsCoversRemoved)
  //   }
  // }

  function handleNewSong(songData){
    const updatedSongs = [...songs, songData]
    setSongs(updatedSongs)
  
    const updatedArtists = artists.map(artist => {
      if (artist.id === songData.artist_id){
        return { ...artist,
        songs: [...artist.songs, songData]
      }
      }else {
        return artist
      }
    })
    setArtists(updatedArtists)
  }

  function handleEditSong(songData){
    const updatedSongs = songs.map(song => song.id !== songData.id ? song : songData);
    setSongs(updatedSongs)

    const updatedArtists = artists.map(artist => {
      if(artist.id === songData.artist_id){
        return {...artist,
        songs: artist.songs.map(song => {
          if(song.id === songData.id){
            return songData
          }else {
            return song
          }
        })
        }
      }else {
        return artist
      }
    })
    setArtists(updatedArtists)
  }

  function handleDeleteSong(songData){
    const updatedSongs = songs.filter(song => song.id !== songData.id)
    setSongs(updatedSongs)
  }

  // function handleSongUpdate(songData){
  //   console.log(songData)
  //   const updatedArtists = artists.map(artist => artist.id !== songData.artist.id ? artist : songData.artist)

  //   const songObj = songs.find(song => song.id === songData.id)
  //   const updatedSongs = songObj ? songs.map(song => song.id !== songData.id ? song : songData) : [...songs, songData]
 
  //   setArtists(updatedArtists)
  //   setSongs(updatedSongs)

  // }

  function handleNewCover(coverData){
    const updatedSongs = songs.map(song => {
      if(song.id === coverData.song_id){
        return {...song,
          covers: [...song.covers, coverData]
        }
      }
      else {
        return song
      }
    })

    const updatedArtists = artists.map(artist =>{
      if(artist.id === coverData.artist_id){
        return {
          ...artist,
          covers: [...artist.covers, coverData]
        }
      }else {
        return {...artist, 
          songs: [...artist.songs.map(song => {
            if(song.id === coverData.song_id){
              return {...song,
              covers: [...song.covers, coverData]}
            }else {
              return song
            }
          })]
        }
      }
      })
    setSongs(updatedSongs)
    setArtists(updatedArtists)
  }

  function handleEditCover(coverData){
    const updatedSongs = songs.map(song => {
      if(song.id === coverData.song_id){
        return {...song,
        covers: [...song.covers.map(cover => {
          if(cover.id === coverData.id){
            return coverData
          }else{
            return cover
          }
        })]}
      }else {
        return song
      }
    })
   
    const updatedArtists = artists.map(artist => {
      if(artist.id === coverData.artist_id){
        return {...artist,
          covers: [...artist.covers.map(cover => {
            if(cover.id === coverData.id){
              return coverData
            }else{
              return cover
            }
          })]
        }
      }else {
        return {...artist,
          songs: [...artist.songs.map(song =>{
            if(song.id === coverData.song_id){
              return {...song,
              covers: [...song.covers.map(cover => {
                if(cover.id === coverData.id){
                  return coverData
                }else {
                  return cover
                }
              })]}
            }else{
              return song
            }
          })]
        }
      }
    })
    setSongs(updatedSongs)
    setArtists(updatedArtists)
  }

  function handleDeleteCover(coverData){
    const updatedSongs = songs.map(song => {
      if(song.id === coverData.song_id){
        return {...song,
        covers: [...song.covers.filter(cover => cover.id !== coverData.id)]}
      }else {
        return song
      }
    })

    const updatedArtists = artists.map(artist => {
      if(artist.id === coverData.artist_id){
        return {...artist,
        covers: [...artist.covers.filter(cover => cover.id !== coverData.id)]}
      }else {
        return {...artist,
        songs: [...artist.songs.map(song => {
          if(song.id === coverData.song_id){
            return{...song,
            covers: [...song.covers.filter(cover => cover.id !== coverData.id)]}
          }else{
            return song
          }
        })]}
      }
    })
    setSongs(updatedSongs)
    setArtists(updatedArtists)
  }

  function handleCoverUpdate(coverData){
    const updatedArtists = artists.map(artist => artist.id !== coverData.song.artist.id ? artist : coverData.song.artist)
    const updatedCoverArtist = updatedArtists.map(artist => artist.id !== coverData.artist_id ? artist : coverData.artist)
    setArtists(updatedCoverArtist)
    console.log(updatedCoverArtist)
    

    const updatedSongs = songs.map(song => song.id !== coverData.song_id ? song : coverData.song)
    setSongs(updatedSongs)
  }

    // function handleFetchDataInState(data){
  //   const updatedArtists = artists.map (artist => artist.id !== data.artist.id ? artist : data.artist)
  //   const updatedSongs = []
  //   updatedArtists.forEach(artist => Boolean(artist.songs) ? artist.songs.forEach(song => updatedSongs.push(song)) : null)

  //   setArtists(updatedArtists);
  //   setSongs(updatedSongs);
  // }

  return (
    <div>
      <h1>Cover Lover</h1>
      <h6 className="subHeader">Rub a dub dub love a cover in the tub...</h6>
      <NavBar/>
      <Routes>
        <Route path="/songs" element={<SongsList artists={artists} songs={songs} onNewSong ={handleNewSong} onEditSong={handleEditSong} onDeleteSong={handleDeleteSong}/>}/>
        <Route path="/songs/:id" element={<Song artists={artists} songs={songs} onCoverUpdate={handleCoverUpdate} onNewCover={handleNewCover} onEditCover={handleEditCover} onDeleteCover={handleDeleteCover}/>}/>
        <Route path="/artists" element={<ArtistsList artists={artists} onNewArtist={handleNewArtist} onEditArtist={handleEditArtist} onDeleteArtist={handleDeleteArtist}/>} />
        <Route path="/artists/:id" element={<Artist artists={artists} songs={songs}/>} />
        <Route exact path="/" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
