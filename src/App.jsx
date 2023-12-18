import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react';
import axios from 'axios';
import Navbar, { Favourites, Search, SearchResult } from './Components/Navbar'
import CharacterList from './Components/CharacterList'
import { allCharacters } from '../data/data'
import CharacterDetails from './Components/CharacterDetails'
import toast, { Toaster } from 'react-hot-toast';
import Modal from './Components/Modal';
import useCharacter from './hooks/useCharacter';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
//فراخوانی هوک  usecharacter
const [query, setQuery] = useState("");
const{isLoading,characters}=useCharacter(query);
const [selectedId, setSelectedId] = useState(null);
  // const [favorites, setfavorites] = useState(() => JSON.parse(
  //   localStorage.getItem("FAVORITES")) || []);

///useEfect send to hook usecharacter

const [favorites, setfavorites] =useLocalStorage("FAVORITES");
//اسم ایمنحا مهم نیست چی باشه اگه جای دیگ مثلا سبدخرید خواستین اطلاعات ذخیره کنین مینویسی
//const[cart,setcart]




//useEfect local storage send to hook useLocalstorage


  const handleAddFavorites = (char) => {
    setfavorites((preFav) => [...preFav, char]);
  }
  const handleDeleteFavourite = (id) => {
    setfavorites((favorites.filter((fav) => fav.id !== id)))
    // or   setfavorites (((preFav)=>preFav.filter((fav)=>fav.id !== id)))
  }



  //چک کردن اینکه  کاراکتر مورد نظر جزو علاقمنذی ها بوده اگر نبوده اضافه شه
  //بررسی میکنه آیا selectedid جزو علاقمنده ها هست ؟
  const isAddToFavorites = favorites.map((fav) => fav.id).includes(selectedId);

  const handleSelectCharacter = (id) => {
    // // چون characterdetail 
    // // هم باید به کاراکتر انتخاب شذه توسط کاربر دسترسی داشته باشه در والد هردو کامپوننت هندلر نوشتیم
    // هرجا state  بود 
    // // setstate هم اونجا مینویسیم 
    // selectedid,setselectedid
    //characterDetails به دست امده را  پاس بدیم  به کامپوننت id
    // setSelectedId(id);
    // اگر ایدی که انتخاب کرده همون کاراکتر بود نال برگردانه و پیام انتخاب کاراکتر جدید نشان بده
    setSelectedId(prevId => prevId === id ? null : id);
  };





  return (
    <>
      {/* <Navbar numOfResult={characters.length} />به صورت children
      تعریف میکنیم دیگ نیازی به انتقال متسقیم پراپس نیست و فقط به خود سرچ ریزالت انتقال میدیم جلوگیری از پراپس  دایرلینگ و یک لول انتقال اضافه حذف کردیم 
       searchresult is children of navbar 
       */}
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
        <CharacterDetails selectedId={selectedId}
          onAddFavorites={handleAddFavorites} isAddToFavorites={isAddToFavorites} />

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
