import './App.css';
import Settings from './View/Settings';
import SettingsContext from './components/SettingsContext';
import Timer from './components/Timer';
import { useState } from 'react';
import {Helmet} from "react-helmet";
import favicon from './favicon.ico';


function App() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>

      <Helmet>
        <title>Pomodoro Timer</title>
        <link rel='icon' type='image/png' href={favicon} sizes='512x512'></link>
      </Helmet>

      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings/> : <Timer />}
      </SettingsContext.Provider>

      
      
    </main>
  );
}

export default App;
