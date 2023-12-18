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
    
            //if use fetch=>err.name ==="AbortError"   if (err.name !== "AbortError")
            //  if use axios=> axios.isCancel() ارروهایی رو ب کاربر نشون میده که بجز اینا کنسل کردن رکوست اضافه حین رندرینگ هستن
            if (!axios.isCancel()) {
              setCharacters([]);
              toast.error(err.response.data.error); //use toast
            }
          } finally {
            setIsLoading(false)
          }
        }
        //کاربر حداقل3کاراکتر وارد کنه بعد نتیجه ایی رو ببینه
        // if (query.length < 3) {
        //   setCharacters([]);
        //   return;
        // }
        fetchData();
        //cleanup fetch وقتی که کاربرتایپ کردن در سرچ مکث کردن آخرین کاراکتر وارد کرد بعد رکوست بفرسته سرور جلوگیری از ارسال رکوست بعد از تایپ هر کاراکتر
        return () => {
          //controller
          controller.abort(); //هربار کامپوننت در حال ری رندر شدن باشه اون رکوپستی که در حال اجرا باشه کنسل میکنه
        }
      }, [query])


   return{isLoading,characters}   
}
