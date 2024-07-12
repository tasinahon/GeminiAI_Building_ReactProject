import React, { useContext, useState } from 'react';
import "./Sidebar.css";
import { assets} from '../../assets/assets' ;
import { Context } from '../../context/Context';


const Sidebar = () => {
  const [extend,setextend]=useState(false);
  const {onSent,prevprompt,setrecentPrompt,newchat}=useContext(Context);

  const loadpromt=async (prompt)=>{
    setrecentPrompt(prompt);
    await onSent(prompt);
  }
  return (
    <div className="sidebar">
      <div className='top'>
        <img onClick={()=>setextend(prev=>!prev)} className='img' src={assets.menu_icon}></img>
        
          
          <div onClick={()=>newchat()} className='newchat'>
          <img src={assets.plus_icon}></img>
         {extend ? <p>New Chat</p>:null}
        </div>
        
        {
          extend ?
          <div className='chathistory'>
          <p>Recent</p>
          {
            prevprompt.map((item,index)=>{
              return (
                <div onClick={()=>loadpromt(item)} className='singlechat'>
            <img src={assets.message_icon}></img>
            <p>{item.slice(0,18)}...</p>
            </div>

              )
            })
          }
          
        </div>:null

        }
        
      </div>

      <div className='bottom'>
        
           <div className='utils singlechat'>
          <img src={assets.question_icon}></img>
          {extend ?<p>Help</p>:null}
        </div>
        <div className='utils singlechat'>
          <img src={assets.compass_icon}></img>
          {extend ?<p>Activity</p>:null}
        </div>
        <div className='utils singlechat'>
          <img src={assets.setting_icon}></img>
          {extend ?<p>Settings</p>:null}
        </div>
          
          
        
       
      </div>
    </div>
  )
}

export default Sidebar
