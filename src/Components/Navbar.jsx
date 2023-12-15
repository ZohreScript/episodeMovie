import logo from "../assets/logoRick_and_Morty.svg.png"
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";


export default function Navbar({children})  {
    return (
      <nav className="flex flex-col sm:flex-row items-center justify-between bg-slate-700 p-4 m-4 rounded-2xl">
      <Logo />
      <div className="flex flex-col md:flex-row items-center mt-4 sm:mt-0">
<Search/>
{/* <SearchResult numOfResult={numOfResult}/> */}
{children}
</div>
   <Favourites/>
    </nav>
    );
}



//logo
function Logo() {
    return <div className="text-slate-300  inline-block items-center justify-center mt-4 sm:mt-0">
    <img src={logo} className="w-10% h-10% sm:w-5% sm:h-5%" alt="Logo" />
  </div>;
}

function Search(){
  return   <input
  type="text"
  className="p-2 rounded-md text-slate-100 bg-slate-500 font-normal mt-4 sm:mt-0"
  placeholder="Search..."
/>
}
export function SearchResult({numOfResult }){
  <div className="text-slate-400 mt-2 md:mt-0 md:ml-4">Found {numOfResult} characters</div>
}
function Favourites(){
  return(
    <button className="relative text-red-500 mt-4 sm:mt-0">
    <HeartIcon className="w-8 h-8" />
    <span className="rounded-md font-semibold text-sm whitespace-nowrap absolute top-0 -right-2 inline-block bg-rose-500 text-white items-center justify-center p-1">5</span>
  </button>
  )
}