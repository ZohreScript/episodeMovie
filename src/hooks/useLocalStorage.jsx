import React from 'react';
import { useEffect, useState } from 'react'

export default function useLocalStorage(key,intialState) {


    const [value, setValue] = useState(
        () => JSON.parse(localStorage.getItem(key)) || intialState
      );
    //LOCALSTORAGE
    useEffect(() => {
        localStorage.setItem(key, 
        JSON.stringify(value))
    }, [value])

    return [value, setValue];
}

