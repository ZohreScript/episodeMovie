import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import axios from 'axios';
import Navbar, { Search, SearchResult } from './Components/Navbar'
import CharacterList from './Components/CharacterList'
import { allCharacters } from '../data/data'
import CharacterDetails from './Components/CharacterDetails'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [isLoading, setIsLoading] = useState(false);
  const[query,setQuery]=useState("")

  useEffect(() => {
    async function fetchData() {
      //error handeling
      try {
        setIsLoading(true);

        const { data } = await axios.get("https://rickandmortyapi.com/api/character");
        setCharacters(data.results);
        // setCharacters(data.results.slice(0,5))  for limited 5 character show on ui
      }
      catch (err) {
//use toast
        toast.error(err.response.data.error);
      }finally{
        setIsLoading(false)
      }
    }
    fetchData();
  }, [])


  return (
    <>
      {/* <Navbar numOfResult={characters.length} />به صورت children
      
      تعریف میکنیم دیگ نیازی به انتقال متسقیم پراپس نیست و فقط به خود سرچ ریزالت انتقال میدیم جلوگیری از پراپس  دایرلینگ و یک لول انتقال اضافه حذف کردیم 
       searchresult is children of navbar 
       */}
      <Toaster />
      <Navbar>
      <Search query={query} setQuery={setQuery}/>
        <SearchResult numOfResult={characters.length} />
      </Navbar>
      <Main  >
        <CharacterList characters={characters} isLoading={isLoading} />
        <CharacterDetails />
      </Main>

    </>
  )
}

export default App

function Main({ children }) {
  return (
    <div className="flex justify-between w-full gap-8">
      {children}
    </div>
  )
}
