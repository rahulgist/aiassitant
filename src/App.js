import React, { useContext } from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import "./App.css";
import va from "./assets/ai.png";
import speakImg from "./assets/speak.gif";
import aigif from "./assets/aiVoice.gif";
import { dataContext } from "./context/UserContext";
function App() {
  let {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setPrompt,
    response,
    setResponse,
  } = useContext(dataContext);

  // console.log(a);
  return (
    <div className="main">
      <img src={va} id="shifra" alt="Shifra" />
      <span>I am your AI Voice Assiatant!!</span>
      {!speaking ? (
        <button
          onClick={() => {
            setPrompt("Listening...");
            setSpeaking(true);
            setResponse(false);
            recognition.start();
          }}
        >
          Click Here <CiMicrophoneOn />
        </button>
      ) : (
        <div className="responseDiv">
          {!response ? (
            <img src={speakImg} id="speak" alt="" />
          ) : (
            <img src={aigif} id="aigif" alt="" />
          )}

          <p>{prompt}</p>
        </div>
      )}
    </div>
  );
}

export default App;
