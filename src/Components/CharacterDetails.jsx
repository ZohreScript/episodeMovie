import React, { useEffect, useState } from 'react'
import { episodes } from '../../data/data'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Loader from './Loader';
import { toast } from 'react-hot-toast';


function CharacterDetails({ selectedId, onAddFavorites, isAddToFavorites }) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([])

  //fetch single character data
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`
        https://rickandmortyapi.com/api/character/${selectedId}`);
        setCharacter(data);

        //get episodes
        //split based on / slash make 1 array as string 
        // at(-1)=>get last index in array خونه آخر آرایه میده 
        //export=> [1,2,3]
        const episodesId = data.episode.map((e) => e.split("/").at(-1));//[1,2,3]
        const { data: episodeDats } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodesId}`)
        //  setEpisodes(episodeDats);
        //[{1},{2}]=>[1,2] objext =>array
        //flat  متدی که ابجکت رو برای ما به آرایه تبدیل میکنه و خطای 
        //  episodes.map is not function  به ما نمیده دیگ
        setEpisodes([episodeDats].flat());

      }
      catch (error) {
        toast.error(err.response.data.error);

      }
      finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading)
    return (
      <div className='flex-1  text-slate-300 '>
        <Loader />
      </div>
    );
  if (!character || !selectedId)
    return (
      <div className='flex-1  text-slate-300 p-8 '>
        please select character to show Details
      </div>
    )
  return (
    <div className="flex-1 m-4">
      <CharacterSubInfo 
      character={character}
      onAddFavorites={onAddFavorites}
      isAddToFavorites={isAddToFavorites} />
      <EpisodesList episodes={episodes} />

    </div>
  )
}

export default CharacterDetails;

function CharacterSubInfo({character, isAddToFavorites,onAddFavorites}) {
 return(
 <div className="flex flex-col md:flex-row bg-slate-800 overflow-hidden rounded-md mb-8">
    <img src={character.image}
      alt={character.name}
      className="w-full md:w-1/3 h-auto max-h-fit object-cover object-center" />
    <div className="p-4">
      <h3 className="text-2xl font-bold mb-1 text-slate-200">
        <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻‍🦳"}</span>
        <span>&nbsp;{character.name}</span>
      </h3>
      <div className="text-sm text-slate-200 mb-4">
        <span className={`inline-block w-3 h-3 rounded-lg bg-green-600 ${character.status === "Dead" ? "bg-rose-600" : ""}`}></span>
        <span>&nbsp;{character.status}</span>
        <span> - &nbsp;{character.species}</span>
      </div>
      <div className="text-slate-500 mb-4">
        <p>Last known location:</p>
        <p className="last:mt-1 last:text-slate-300 last:font-bold">{character.location.name}</p>
      </div>
      <div className="flex flex-col md:flex-row ">


        {
          isAddToFavorites ? (<p className='text-slate-400'>Already Added To Favorites ✅</p>) :
            (
              <button
                onClick={() => onAddFavorites(character)}
                className="p-2 rounded-full bg-slate-500 text-slate-100 font-bold">
                Add to Favourite
              </button>
            )
        }


      </div>
    </div>
  </div>)
}

function EpisodesList({ episodes }) {
  const [sortBy, setSortby] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }
  {/* episdoe */ }
  return  <div className="bg-slate-700 rounded-md p-4 h-1/4 overflow-auto">
    <div className="flex items-center justify-between ">
      <h2 className='text-slate-400 mb-2 text-xl font-bold
        '>List of Episodes:</h2>
      <button className='bg-transparent
       cursor-pointer' onClick={() => setSortby((is) => !is)}
      >
        <ArrowUpCircleIcon
          className="w-6 h-6 text-slate-200" />
        {/* class={`transform ${sortBy ? 'rotate-0' : 'rotate-180'}`}          /> */}
      </button>
    </div>
    <ul>

      {sortedEpisodes.map((item, index) => (
        <li className='flex items-center justify-between text-slate-200 p-2 cursor-pointer' key={item.id}>
          <div>
            {String(index + 1).padStart(2, "0")}

            {item.episode}
            <strong className='ml-2 font-bold'>{item.name}</strong>
          </div>
          <div className="bg-slate-600 whitespace-nowrap p-2 rounded-2xl">{item.air_date}</div>
        </li>
      ))}

    </ul>

  </div>
}