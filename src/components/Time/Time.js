import React from 'react'

const Time = ({minutes, seconds}) => {
  return (
    <div>Time<br/>{minutes} : {seconds}</div>
  )
}

export default Time