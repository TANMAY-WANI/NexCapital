'use client'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}:{amount:number}) => {
  return (
    <div className='w-full'>
    <CountUp 
    decimals={2}
    prefix='&#x20B9;'
    end={amount} />
    </div>

  )
}

export default AnimatedCounter