import React from 'react';
import { useEffect, useState } from 'react'

export default function useLocalStorage(key,intialState) {
    // const [favorites, setfavorites] = useState(() => JSON.parse(
    //     localStorage.getItem("FAVORITES")) || []);
    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) || intialState
      );
    //LOCALSTORAGE
    useEffect(() => {
        localStorage.setItem(key, 
        JSON.stringify(value))
    }, [value])

    //استثنا اینجا ترتیب مهمه اول ولیو و بعد ست ولیو
    return [value, setValue];
}

