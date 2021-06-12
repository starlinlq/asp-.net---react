import './App.css';
import {useState} from "react";

function App() {
  const [name, setName]= useState("");
  function getName(e: any){
    setName(e.target.value)
  }
  return (
    <div className="h">
      <h1 style={{color: 'black'}}>name</h1>
      <input placeholder="your name" value={name} onChange={getName}/>
    </div>
  );
}

export default App;
