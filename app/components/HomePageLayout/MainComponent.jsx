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
            <section className="flex text-[#373636] h-[90%]">
                <div className='w-[48%] mt-[140px]'>
                    <h1 className="text-7xl font-semibold">Online Examination</h1>
                    <p className='my-7 leading-relaxed'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <Link
                    className="flex justify-center items-center text-white font-medium bg-[#008080] px-6 w-[160px] h-[50px] rounded-[50px]"
                    href="/auth/login"
                    >
                    Learn More</Link>
                </div>
                <div className='relative w-[53%]'>
                        <Image
                            src="/images/homepage/exam-home.png"
                            // width={550}
                            // height={550}
                            alt="logo"
                            priority
                            quality={100}
                            layout="fill"
                            className="object-cover object-center" 
                        />
                </div>
            </section>
        </div>
    </>
  )
}

export default MainComponent
