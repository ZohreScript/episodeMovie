import React from 'react'
import { character, episodes } from '../../data/data'
import { ArrowUpCircleIcon } from '@heroicons/react/24/outline';

function CharacterDetails() {
  return (
    <div className="flex-1 m-4">
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
         
            {/* <p className='text-slate-400'>Already Added To Favorites ✅</p> */}

            <button
              className="p-2 rounded-full bg-slate-500 text-slate-100 font-bold"
            >
              Add to Favourite
            </button>
        
        </div>
      </div>
 </div>


    <div className="bg-slate-700 rounded-md p-4">
    <div className="flex items-center justify-between ">
        <h2 className='text-slate-400 mb-2 text-xl font-bold
        '>List of Episodes:</h2>
        <button  className='bg-transparent cursor-pointer'
        >
          <ArrowUpCircleIcon
            className="w-6 h-6 text-slate-200"/>
             {/* class={`transform ${sortBy ? 'rotate-0' : 'rotate-180'}`}          /> */}
        </button>
      </div>
      <ul>
       
        {episodes.map((item , index)=>(
  <li className='flex items-center justify-between text-slate-200 p-2 cursor-pointer' key={item.id}>
  <div>
    {String(index + 1).padStart(2, "0")}
     {item.episode}
    <strong className='font-bold'>{item.name}</strong>
  </div>
  <div className="bg-slate-600 whitespace-nowrap p-2 rounded-2xl">{item.air_date}</div>
</li>
        ))}
        
      </ul>

    </div>
  </div>
  )
}

export default CharacterDetails;

// function CharacterSubInfo(){
//     return(
//         <div>
//          <img src />   
//         </div>
//     )
// }
// function EpisodeList(){

// }