import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const {onSent,recentPrompt,showresult,loading,resultdata,setinput,input}=useContext(Context);
  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon}></img>
      </div>
      <div className='maincontainer'>
        {!showresult ?
         <>
              <div className='greet'>
          <p>Hello Dev</p>
          <p>How can I help you today?</p>
        </div>
        <div className='cards'>
          <div className='card'>
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.bulb_icon}></img>
          </div>
          <div className='card'>
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.code_icon}></img>
          </div>
          <div className='card'>
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.compass_icon}></img>
          </div>
          <div className='card'>
            <p>Improve the readability of the following code</p>
            <img src={assets.mic_icon}></img>
          </div>
        </div>
         </> 
        :
        <div className='result'>

          <div className='result-title'>
            <img src={assets.user_icon}></img>
            <p>{recentPrompt}</p>
          </div>
          <div className='result-data'>

            <img src={assets.gemini_icon}></img>
            {
              loading?
              <div className='loader'>
                <hr/>
                <hr/>
                <hr/>
              </div>
              :
              <p dangerouslySetInnerHTML={{__html:resultdata}}></p>
            }
            
          </div>
          
        </div>}
       
        <div className='main-bottom'>
        <div className='search-box'>
          <input onChange={(e)=>setinput(e.target.value)} value={input} type='text' placeholder='Enter a prompt here'></input>
          <div>
            <img src={assets.gallery_icon}></img>
            <img src={assets.mic_icon}/>
            {input ? <img onClick={()=>onSent()} src={assets.send_icon}></img>:null}
          </div>
        </div>
        <p className='bottom-info'>
          Gemini may display inaccurate info,including about people,so double check its responses.Your privacy and Gemini Apps
        </p>
      </div>
      </div>
      
      
    </div>
  )
}

export default Main
