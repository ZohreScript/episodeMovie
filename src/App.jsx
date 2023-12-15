import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './Components/Navbar'
import CharacterList from './Components/CharacterList'
import { allCharacters } from '../data/data'
import CharacterDetails from './Components/CharacterDetails'

function App() {
  const [characters, setCharacters] = useState(allCharacters);

  return (
    <>
      {/* <Navbar numOfResult={characters.length} />به صورت children
       تعریف میکنیم دیگ نیازی به انتقال متسقیم پراپس نیست و فقط به خود سرچ ریزالت انتقال میدیم جلوگیری از پراپس دارلینگ 
       */}
      <Main characters={characters} >
        <CharacterList characters={characters} />
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
