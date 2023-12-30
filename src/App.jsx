import { useEffect, useState } from 'react'
import './App.css'
import React from 'react';
import Navbar, { Favourites, Search, SearchResult } from './Components/Navbar'
import CharacterList from './Components/CharacterList'
import CharacterDetails from './Components/CharacterDetails'
import toast, { Toaster } from 'react-hot-toast';
import useCharacter from './hooks/useCharacter';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
const [query, setQuery] = useState("");
const{isLoading,characters}=useCharacter(query);
const [selectedId, setSelectedId] = useState(null);

const [favorites, setfavorites] =useLocalStorage("FAVORITES");


  const handleAddFavorites = (char) => {
    setfavorites((preFav) => [...preFav, char]);
  }
  const handleDeleteFavourite = (id) => {
    setfavorites((favorites.filter((fav) => 
    fav.id !== id)))
  }



  const isAddToFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  const handleSelectCharacter = (id) => {

    setSelectedId(prevId => prevId === id ? null : id);
  };





  return (
    <>

      <Toaster />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <SearchResult numOfResult={characters.length} />
        <Favourites favorites={favorites} onDeleteFavourite={handleDeleteFavourite} />
      </Navbar>
      <Main  >
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isLoading}
          OnselectCharacter={handleSelectCharacter} />
        <CharacterDetails
         selectedId={selectedId}
          onAddFavorites={handleAddFavorites} 
          isAddToFavorites={isAddToFavorites} />

      </Main>

    </>
  )
}

export default App

function Main({ children }) {
  return (
    <div className="flex justify-between w-full gap-8 ">
      {children}
    </div>
  )
}
