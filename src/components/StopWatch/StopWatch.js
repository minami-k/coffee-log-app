import React from 'react'
import { useStopwatch } from 'react-timer-hook';
import Time from "../Time/Time"

const StopWatch = () => {
    const {
        seconds,
        minutes,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: false });
    
    
      return (
          <>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '100px'}}>
            <span>{minutes}</span>:<span>{seconds}</span>
          </div>
          <p>{isRunning ? 'Running' : 'Not running'}</p>
          <button onClick={start}>Start</button>
          <button onClick={pause}>Pause</button>
          <button onClick={reset}>Reset</button>
        </div>
        </>
      );
    }


export default StopWatch