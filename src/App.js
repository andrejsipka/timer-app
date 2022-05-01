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
  const [active, setActive] = useLocalState('active')
  

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

    setActive(true);
    console.log('Timer started', time);
  }

  return (
    <div>
      <div>
        <h1>Quick Timer with React</h1>
        <form onSubmit={startTimer}>
          <label>
            <span>Minute</span>
            <input type="number" id="minute" name="minute" placeholder="0" onChange={(e) => setMinutes(e.target.value)} value={minutes} />
          </label>

          <label>
            <span>Second</span>
            <input type="number" id="second" name="second" placeholder="0" onChange={(e) => setSeconds(e.target.value)} value={seconds} />
          </label>
          
          <button>start</button>
        </form>
      </div>

      { active && <Timer minutes={minutes} setMinutes={setMinutes} seconds={seconds} setSeconds={setSeconds} resetTimer={resetTimer} /> }
      <div>
        <h2>Timer history</h2>
        
      </div>
    </div>
  );
}

