'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './Navbar'
import Footer from './Footer'

const MainComponent = () => {
  return (
    <>
        <Navbar/>
        <section className="px-4 text-center mt-4 sm:mt-10 md:mt-14 xl:mt-20 max-w-6xl mx-auto pb-20">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl xl:text-6xl xl:leading-tight"> 
                We prepare the best testing experience for you...<br className="hidden sm:inline"/> 
            </h1>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between text-base">
                    <Link className="bg-[#373636] border border-[#373636] text-[#fff] px-6 py-2 text-base rounded-lg" href="/auth/signup">Get Started</Link>
                    
                </div>
            </div>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-2 rounded-lg">
                <div className='h-[600px] w-full rounded-lg'>
                    <Image src={'/images/create-test.png'} alt='create-test'  fill className='object-contain object-top w-full h-full rounded-lg' />
                </div>
            </div>

        </section>
        <Footer/>
    </>
  )
}

export default MainComponent
