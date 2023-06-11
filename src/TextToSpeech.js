import React, { useState, useEffect } from "react";
import './TextToSpeech.css'

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(true);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);
    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }
    synth.speak(utterance);
    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;
    synth.cancel();
    setIsPaused(true);
  };

  const handleToggle = () => {
    if(isPaused){
      handlePlay();
    } else {
      handlePause();
    }
  };

  return (
    <div className="TextToSpeech">
      <button onClick={handleToggle}>
        {isPaused ? "Play" : "Pause"}
      </button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
};

export default TextToSpeech;