'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './Navbar'

const MainComponent = () => {
  return (
    <>
        <Navbar/>
        <section className="px-4 text-center mt-4 sm:mt-10 md:mt-14 xl:mt-20 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl xl:text-6xl xl:leading-tight"> 
                We prepare the best testing experience for you...<br className="hidden sm:inline"/> 
            </h1>
            <h2 className="mt-6 leading-snug text-gray-500 xl:mt-5 xl:text-xl"> 
                Write an an exam 
            </h2>
            <div className="relative mt-6 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center justify-between text-base">
                    <Link className="bg-[#373636] border border-[#373636] text-[#fff] px-6 py-2 text-base rounded-lg" href="/auth/signup">Get Started</Link>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default MainComponent
