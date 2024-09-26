'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './Navbar'

const MainComponent = () => {
  return (
    <>
        <div className='px-[55px] pt-[25px] h-screen '>
            <Navbar/>
            <section className="flex mt-4 sm:mt-10 md:mt-14 xl:mt-20 text-[#373636]">
                <div className='w-[45%] mt-[80px]'>
                    <h1 className="text-7xl font-semibold">Online Examination</h1>
                    <p className='my-7 leading-relaxed w-[65%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <Link
                    className="flex justify-center items-center text-white font-medium bg-[#008080] px-6 w-[160px] h-[50px] rounded-[50px]"
                    href="/auth/login"
                    >
                    Learn More</Link>
                </div>
                <div className='w-[55%] h-full overflow-hidden'>
                    <Image
                        src="/images/homepage/exam-home.png"
                        // width={150}
                        // height={150}
                        alt="logo"
                        priority
                        quality={100}
                        layout="fill"
                        className="object-contain" 
                    />
                </div>
            </section>
        </div>
    </>
  )
}

export default MainComponent
