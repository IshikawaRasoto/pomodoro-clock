import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from './PlayButton';
import PauseButton from './PauseButton';
import ConfigButton from './ConfigButton';
import SettingsContext from './SettingsContext';
import { useContext, useState, useEffect, useRef } from 'react';
import RestartButton from './RestartButton';
import SkipButton from './SkipButton';

const lightBlue = '#A2FFF4';
const lightGreen = '#99D5BF';
const mediumBlue = "#003964";


function Timer() {

  const settingsInfo = useContext(SettingsContext);
  const [mode, setMode] = useState('work'); //work/break/null
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === 'work' ? 'break' : 'work';
      setMode(nextMode);
      modeRef.current = nextMode;
  
      const nextSeconds = modeRef.current === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if(isPausedRef.current) return;
      if(secondsLeftRef.current === 0) {
        return switchMode();
      }
      tick();

    }, 1000);

    return () => clearInterval(interval);

  }, [settingsInfo]);

  const totalSeconds = mode === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
  const percentage = Math.round(secondsLeft / totalSeconds * 100);
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if(seconds < 10) seconds = '0' + seconds.toString();

  return (
    <div>
      <h1 style={{color: lightBlue}}>{mode === 'work' ? 'Work 🧑‍💻' : 'Break 😎'}</h1>

      <CircularProgressbar value={percentage} text={minutes + ':' + seconds} styles={buildStyles({
        textColor: lightBlue,
        pathColor: lightBlue,
        trailColor: mediumBlue,
      })}/>
      <div style={{marginTop:'20px'}}>
        {isPaused && <RestartButton onClick={() => {setSecondsLeft(totalSeconds); secondsLeftRef.current = totalSeconds;}}/>}
        {isPaused ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current=false;}}/> : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current=true}}/>}
        {isPaused && <SkipButton onClick={() => {
          const nextMode = modeRef.current === 'work' ? 'break' : 'work';
          setMode(nextMode); 
          modeRef.current = nextMode;
          
          const nextSeconds = modeRef.current === 'work' ? settingsInfo.workMinutes * 60 : settingsInfo.breakMinutes * 60;
          setSecondsLeft(nextSeconds);
          secondsLeftRef.current = nextSeconds;
        }}/>}
      </div>
      <div style={{marginTop:'20px'}}>
        <ConfigButton onClick={() => {settingsInfo.setShowSettings(true)}}  />
      </div>
    </div>

  );
}

export default Timer;