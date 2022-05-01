import { useEffect } from "react";

export default function Timer({minutes, setMinutes, seconds, setSeconds, resetTimer}) {
    useEffect(() => {
        const counter = setInterval(() => {
          if(seconds > 0) {
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