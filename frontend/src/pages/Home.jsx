import React, { useEffect } from 'react'
import Hero from '../components/Hero'
import { useState } from 'react';
import Background from '../components/Background';
import LatestCollection from '../components/LatestCollection';
import BestSeller from '../components/BestSeller';
import Hero2 from '../components/Hero2';
import OurPolicy from '../components/OurPolicy';
import Newletter from '../components/Newletter';

const Home = () => {

  let heroData = [
    {
    text1: "Style with purpose. Fashion with soul",
    text2: "Unleash your style. Own the moment"
  },
  {
    text1: "Simplicity never goes out of style.",
    text2: "Fashion that speaks louder than words."
  },
  {
    text1: "Dress how you want to be addressed.",
    text2: "Confidence is the best outfit."
  }

  ]
  let [count,setCount] = useState(0);
  let [playStatus, setPlayStatus] = useState(false);

   useEffect(()=>{
      const interval =   setInterval(() => {
      setCount((prevCount)=>{
       return  prevCount===2 ? 0 : prevCount+1
      } )
    },3000);
    return ()=> clearInterval(interval)
   },[])
  return (
    <div>
      
      <Background count={count} playStatus={playStatus}/>
      <Hero heroData={heroData[count]} setCount={setCount} playStatus={playStatus} setPlayStatus={setPlayStatus}/>
      <Hero2/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <Newletter/>
    </div>
  )
}

export default Home