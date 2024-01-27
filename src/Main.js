import React, { useState, useEffect } from 'react';
import './Main.css'; // Import your global styles
import SinglePlayerGame from './SinglePlayerGame';
import MultiPlayerGame from './MultiPlayerGame';

const Main = () => {
  const [gameMode, setGameMode] = useState(null);
  const [clickSound, setClickSound] = useState(new Audio('../../pagetrans.mp3')); // Replace with the actual path
  const [backgroundMusic, setBackgroundMusic] = useState(new Audio('../bgm.mp3')); // Replace with the actual path
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    // Cleanup the audio elements when the component unmounts
    return () => {
      if (clickSound) {
        clickSound.pause();
        clickSound.currentTime = 0;
      }
      if (backgroundMusic) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
      }
    };
  }, [clickSound, backgroundMusic]);

  useEffect(() => {
    // Update the volume when it changes
    if (backgroundMusic) {
      backgroundMusic.volume = volume / 100;
    }
  }, [volume]);

  const playClickSound = () => {
    if (clickSound) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  const playBackgroundMusic = () => {
    if (backgroundMusic) {
      backgroundMusic.volume = volume / 100; // Set initial volume
      backgroundMusic.loop = true;
      backgroundMusic.play();
      setIsBackgroundMusicPlaying(true);
    }
  };

  const pauseBackgroundMusic = () => {
    if (backgroundMusic) {
      backgroundMusic.pause();
      setIsBackgroundMusicPlaying(false);
    }
  };

  const handleModeSelect = (mode) => {
    setGameMode(mode);
    playClickSound();
    if (mode === 'singleplayer' || mode === 'multiplayer') {
      playBackgroundMusic();
    }
  };

  return  (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      {gameMode === null ? (
        <div>
          <button className='hand1' onClick={() => handleModeSelect('singleplayer')}>Singleplayer</button>
          <button className='hand1' onClick={() => handleModeSelect('multiplayer')}>Multiplayer</button>
        </div>
      ) : gameMode === 'singleplayer' ? (
        <SinglePlayerGame />
      ) : (
        <MultiPlayerGame />
      )}

    </div>
  );
};

export default Main;