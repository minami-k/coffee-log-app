import React from 'react'
import "./time.css"

const Time = ({minutes, seconds}) => {
  return (
    <div>Time<br/><p><span className='time'>{minutes}</span> : <span className='time'>{seconds}</span></p></div>
  )
}

export default Time