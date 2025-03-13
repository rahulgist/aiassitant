import React, { createContext, useState } from "react";
import run from "../gemini.js";
export const dataContext = createContext();

function UserContext({ children }) {

  let [speaking, setSpeaking] = useState(false);
  let [prompt, setPrompt] = useState("Listening...");
  let [response, setResponse] = useState(false);

  function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  // speach recognition
  async function aiResponse(prompt) {
    let text = await run(prompt);
    let new_text = text.split("**")&&text.split("*")&&text.replace("google","Rahul Saxena")&&text.replace("Google","Rahul Saxena")
    // console.log(text);
    setPrompt(new_text)
    setResponse(true)
    speak(new_text)
    setTimeout(()=>{
        setSpeaking(false)
    },5000)
    
  }
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new speechRecognition();
  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript;
    // console.log(transcript);
    setPrompt(transcript)
    takeCommand(transcript.toLowerCase())
    
  };

  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
        window.open("https://www.youtube.com","_blank")
        speak("Opening Youtube")
        setResponse(true)
        setPrompt("Opening Youtube")
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
    }
    if(command.includes("open") && command.includes("google")){
        window.open("https://www.google.com","_blank")
        speak("Opening google")
        setResponse(true)
        setPrompt("Opening google")
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
    }
    if(command.includes("open") && (command.includes("facebook")|| command.includes("fb"))){
        window.open("https://www.facebook.com","_blank")
        speak("Opening google")
        setResponse(true)
        setPrompt("Opening google")
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
    }if(command.includes("time")){
       let time = new Date().toLocaleDateString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
        setResponse(true)
        setPrompt(time)
        setTimeout(()=>{
            setSpeaking(false)
        },5000)
    }
    if(command.includes("date")){
        let date = new Date().toLocaleDateString(undefined,{day:"numeric",month:"short"})
         speak(date)
         setResponse(true)
         setPrompt(date)
         setTimeout(()=>{
             setSpeaking(false)
         },5000)
     }
    else{
        aiResponse(command);
    }
  }

  let value = {
    recognition, speaking, setSpeaking,prompt, setPrompt,response,setResponse
  };

  return (
    <div>
      <dataContext.Provider value={value}>{children}</dataContext.Provider>
    </div>
  );
}

export default UserContext;
