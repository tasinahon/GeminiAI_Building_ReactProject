import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context=createContext();

const ContextProvider = (props)=>{

    const [input,setinput]=useState("");
    const [recentPrompt,setrecentPrompt]=useState("");
    const [prevprompt,setprevprompt]=useState([]);
    const [showresult,setshowresult]=useState(false);
    const [loading,setloading]=useState(false);
    const [resultdata,setresultdata]=useState("");
    
    const delayP=(index,nextword)=>{
        setTimeout(function (){
            setresultdata(prev=>prev+nextword);
        },75*index)

    }
    const newchat=()=>{
        setloading(false);
        setshowresult(false);
    }
    const onSent = async(prompt)=>{
        setresultdata("");
        setloading(true);
        setshowresult(true);
        let response;
        if(prompt!=undefined)
        {
            response=await run(prompt);
            setrecentPrompt(prompt);
        }
        else{
            setprevprompt(prev=>[...prev,input]);
            setrecentPrompt(input);
        
            response=await run(input);
        }
        
        let res=response.split("**");
        let newresponse="";
        for(let i=0;i<res.length;i++)
        {
            if(i==0 || i%2!=1)
            {
                newresponse+=res[i];
            }
            else{
                newresponse+= "<b>" + res[i] + "</b>";
            }
        }
        let newresponse2=newresponse.split("*").join(" <br/>");
        let newresponsearray=newresponse2.split(" ");
        for(let i=0;i<newresponsearray.length;i++)
        {
            const nextword=newresponsearray[i];
            delayP(i,nextword+" ");
        }
        
        setloading(false);
        setinput("");
    }

    
    
    const contextValue={
        prevprompt,
        setprevprompt,
        onSent,
        recentPrompt,
        setrecentPrompt,
        showresult,
        loading,
        resultdata,
        input,
        setinput,
        newchat

    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;