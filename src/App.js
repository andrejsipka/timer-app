import { useState, useEffect } from "react";

export default function App() {
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timer, setTimer] = useState(false);

  const resetTimer = () => {
    setMinutes('');
    setSeconds('');
  }

  const Countdown = () => {
    useEffect(() => {
      const counter = setInterval(() => {
        if( seconds > 0) {
          setSeconds(seconds - 1);
        }
        
        if(seconds === 0) {
          if(minutes === 0) {
            // Reset the timer
            clearInterval(counter);
            resetTimer()
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(counter);
      }
    });
    return (
      <div>
        <p>{minutes}:{seconds}</p>
      </div>
    )
  }

  const startTimer = (e) => {
    e.preventDefault();

    const time = {
      minute: minutes,
      second: seconds,
    }

    setTimer(true);
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

      <div>
        {timer && <Countdown />}
      </div>

      <div>
        <h2>Timer history</h2>
        items
      </div>
    </div>
  );
}

