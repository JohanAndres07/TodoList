import { useState } from 'react'
import {Body} from "./components/Body/Body"
import  {Header} from "./components/Header/Header" 

function App() {
  const [view, setView] = useState('list'); 

  const toggleView = (newView) => {
  setView(newView);
  };
  return (
    <>
    <Header toggleView ={toggleView} currentView={view}/>
    <Body view={view}/>
    </>
  )
}

export default App
