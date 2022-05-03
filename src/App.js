import './App.css'; 
import { useState, useEffect } from "react";
import Timer from './components/Timer';

export default function App() {
  // Func to get data from local storage
  // init value will be empty if no option entered
  const useLocalState = (key, defaultValue = '') => {
    const [state, setState] = useState(
      () => window.localStorage.getItem(key) || defaultValue );

    // Effect will change state in local storage
    useEffect(() => {
      window.localStorage.setItem(key, state)
    }, [key, state]);

    // Passing data, from where useLocalState was called
    return [state, setState];
  } 

  // States
  const [minutes, setMinutes] = useLocalState('minutes');
  const [seconds, setSeconds] = useLocalState('seconds');
  const [active, setActive] = useLocalState('active');
  

  // Func to reset timer
  const resetTimer = () => {
    setMinutes('');
    setSeconds('');
  }

  const startTimer = (e) => {
    e.preventDefault();

    const time = {
      minute: minutes,
      second: seconds,
    }

    console.log('Timer running', time);

    setActive(true);
    console.log('Timer started', time);
  }

  return (
    <div className='container'>
      <div className='timer'>
        <h1 className='heading-primary'>Quick Timer with React</h1>
        <form onSubmit={startTimer} className='form'>
          <div className='form__wrapper'>
            <label className='form__label'>
              <span>Minute</span>
              <input type="number" id="minute" name="minute" placeholder="0" onChange={(e) => setMinutes(e.target.value)} value={minutes} />
            </label>

            <label className='form__label'>
              <span>Second</span>
              <input type="number" id="second" name="second" placeholder="0" onChange={(e) => setSeconds(e.target.value)} value={seconds} />
            </label>
          </div>
          
          <button className='btn btn--orange'>start</button>
        </form>
      </div>

      { active && <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} resetTimer={resetTimer} /> }
    </div>
  );
}

