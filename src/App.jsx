import React, { useState, useEffect } from 'react';
import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'
import './index.css'

const ffmpeg =  createFFmpeg({log:true})

function App() {
  // Create the count state.
 const [ready,setReady] = useState(false)
 const [video,setVideo] = useState()
 const [gif, setGif] = useState()


 const load =  async ()=>{

  await ffmpeg.load()
  setReady(true)
 }


 useEffect(()=>{
  load()


 },[])

 const convertToGif = async ()=>{
   //store the video to memory for being treated ans accesses  by ffmpeg wasm memory  
   ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))
//make asynchroneous call to ffmpeg modules to make treatment on the video stored in the memory 
   await ffmpeg.run('-i', 'test.mp4', '-t','2.5','-ss','2.0','-f','gif','out.gif');
//Read the result 
const data =  ffmpeg.FS('readFile','out.gif');


//genearte video url , Blob for raw file  which is in this case a bnary file which accessible with a buffer 
const gifUrl  =  URL.createObjectURL(new Blob([data.buffer],{type:'image/gif'}))

setGif(gifUrl)
 }
  // Return the App component.
  return ready ?  (
    <div className="App">


<h1>Simple Video to Gif converter Based on Web assembly ffmpeg module  </h1>


      {video &&
      <video  controls width="250" src={URL.createObjectURL(video)}> </video>
      
      }

      <input type="file"  onChange={(e)=>setVideo(e.target.files?.item(0))}/>
    


    <h1>Result </h1>

      <button onClick={convertToGif}>Convert</button>
       {gif && <img src={gif} width="250"></img>}

    </div>
  ):
  (
    <div>
              <p>Loading...</p>
    </div>
  )
}

export default App;
