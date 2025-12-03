import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newletter from '../components/Newletter'

const About = () => {
  return (
    <div className='border-t'>
      <div>
        <Title text1={'About'} text2={'Us'} />
      </div>
      <div className='mt-12 flex flex-col lg:flex-row w-full lg:justify-between gap-3 lg:gap-9 px-10 py-4'>
        <div>
          <img src={assets.about_img} className='lg:w-[800px] w-full' />
        </div>
        <div className='flex flex-col  lg:max-w-1/2 w-full mt-8 gap-4 text-gray-600'>
          <div className='gap-7 flex flex-col'>
            <p>We’re more than just a fashion label — we’re a lifestyle built on simplicity, confidence, and timeless design. Every piece we create blends comfort with sophistication, designed to make you feel effortlessly you.</p>
            <p>Our collections are inspired by everyday elegance — made with high-quality fabrics, clean silhouettes, and sustainable craftsmanship. Whether it’s a casual day out or a statement occasion, our goal is to help you dress with purpose and authenticity.</p>
          </div>
          <b>Our Mission</b>
          <p>Our mission is simple — to make fashion beautiful for you and kind to the planet. We create timeless designs using responsibly sourced materials and ethical production practices.</p>
          <p>Every garment tells a story — of skilled hands, slow fashion, and a promise to reduce our environmental footprint. Because we believe true style is never at the cost of our planet.</p>
        </div>
     </div>

     <div>
      <div className='text-base flex items-start'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row mt-16'>
        <div className='border border-gray-300 items-center w-2/2 justify-center flex flex-col px-3 gap-4 py-9'>
          <b className='text-gray-600'>Quality Assurance:</b>
          <p className='text-gray-500'>Born from a passion for art, design, and self-expression, we believe fashion is the ultimate form of individuality. Each piece in our collection reflects meticulous craftsmanship, exclusive detailing, and timeless beauty.</p>
        </div>
        <div className='border border-gray-300 items-center w-2/2 justify-center flex flex-col px-3 gap-4 py-9'>
          <b className='text-gray-600'>Convenience:</b>
          <p className='text-gray-500'>We’re the new wave of fashion — bold, expressive, and unapologetically real. Inspired by street culture, music, and individuality, we design for dreamers and doers who want to wear their vibe.</p>
        </div>
        <div className='border border-gray-300 items-center w-2/2 justify-center flex flex-col px-3 gap-4 py-9'>
          <b className='text-gray-600'>Exceptional Customer Services:</b>
          <p className='text-gray-500'>From statement fits to everyday essentials, our collections are made to help you move, create, and express yourself with confidence. Because fashion isn’t about trends — it’s about attitude.</p>
        </div>
      </div>
     </div>
     <div>
      <Newletter/>
     </div>
    </div>
  )
}

export default About