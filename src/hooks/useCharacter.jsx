import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

export default function useCharacter(query) {
    const [characters, setCharacters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
   
    useEffect(() => {

      
        const controller = new AbortController();
        const signal = controller.signal
    
    
        async function fetchData() {
          //error handeling
          try {
            setIsLoading(true);
    
            const { data } = await axios.get(`
            https://rickandmortyapi.com/api/character/?name=${query}`, { signal });
            setCharacters(data.results);
            // setCharacters(data.results.slice(0,5))  for limited 5 character show on ui
          }
          catch (err) {
    
            if (!axios.isCancel()) {
              setCharacters([]);
              toast.error(err.response.data.error); //use toast
            }
          } finally {
            setIsLoading(false)
          }
        }
 
        fetchData();
        return () => {
          controller.abort();
        }
      }, [query])


   return{isLoading,characters}   
}
