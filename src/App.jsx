import React, { useState, useEffect } from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'


const ffmpeg =  createFFmpeg({log:true})

function App() {
  // Create the count state.
 const [ready,setReady] = useState(false)


 const load =  async ()=>{

  await ffmpeg.load()
  setReady(true)
 }


 useEffect(()=>{
  load()

  
 },[])
  // Return the App component.
  return (
    <div className="App">

    </div>
  );
}

export default App;
