import ReactSlider from 'react-slider'
import './Slider.css'
import { useContext } from 'react';
import SettingsContext from '../components/SettingsContext';
import BackButton from '../components/BackButton';

function Settings() {
    const settingsInfo = useContext(SettingsContext);
    return(
        <div style={{textAlign:'left'}}>
            <label>Work Minutes: {settingsInfo.workMinutes}:00</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <br></br>
            <label>Break Minutes: {settingsInfo.breakMinutes}:00</label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{textAlign:"center", marginTop:'30px'}}>
                <BackButton onClick={() => {settingsInfo.setShowSettings(false)}}  />
            </div>
            
        </div>
    );
}

export default Settings;