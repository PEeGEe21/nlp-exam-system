'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { slidesData } from '@/app/lib/constants';
import { fadeIn, fadeInVariants, slideVariants } from '@/app/utils/motion';
import {TopCard, BottomCard} from '../Cards/Card';

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('right');
    const totalSlidesLength = slidesData.length;

    const handleDotClick = (index) => {
        setDirection(index > currentIndex ? 'right' : 'left');
        setCurrentIndex(index);
    };

    // Function to switch to the next slide automatically
    // const autoSwitchSlides = () => {
    //   const nextIndex = (currentIndex + 1) % totalSlidesLength;
    //   setDirection('right');
    //   setCurrentIndex(nextIndex);
    // };

    // useEffect(() => {
    //   const intervalId = setInterval(autoSwitchSlides, 10000);
    //   return () => clearInterval(intervalId); // Cleanup on component unmount
    // }, [autoSwitchSlides, currentIndex]);

    const autoSwitchSlides = useCallback(() => {
        const nextIndex = (currentIndex + 1) % totalSlidesLength;
        setDirection('right');
        setCurrentIndex(nextIndex);
      }, [currentIndex, totalSlidesLength]); // Dependencies that affect the callback
      
      useEffect(() => {
        const intervalId = setInterval(autoSwitchSlides, 10000);
        return () => clearInterval(intervalId); // Cleanup on component unmount
      }, [autoSwitchSlides]); // Use autoSwitchSlides as the dependency

    return (
        <>
            <div className="flex justify-center items-center w-full  overflow-hidden">
                <div>
                    <AnimatePresence mode="wait">
                        {/* w-[clamp(30rem,100%,40rem)] h-[clamp(40rem,97vh,43rem)] */}
                        <div className='relative w-[clamp(30rem,100%,40rem)] h-[clamp(40rem,97vh,43rem)] flex items-center justify-center '>
                            <motion.div
                                key={currentIndex}
                                variants={slideVariants}
                                initial={
                                    direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                                }
                                animate="visible"
                                exit="exit"
                                className="max-w-xl w-[600px] h-[500px] relative rounded-lg block bg-transparent text-center"
                            >
                                <motion.div variants={fadeIn('right', 'tween', 0.3 * 1, 0.5)}>
                                
                                    <Image
                                        src={slidesData[currentIndex].image}
                                        alt={slidesData[currentIndex].title}
                                        className="mx-auto object-contain rounded-lg w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] animated_img"
                                        fill
                                        // height={400}
                                        // width={500}
                                        priority
                                    />
                                </motion.div>
                                <motion.div className='absolute top-3 -left-[50px] animated_img2' variants={fadeInVariants}>                       
                                    <TopCard quotes={slidesData[currentIndex].quotes.top} number={currentIndex+2}/>
                                </motion.div>

                                <motion.div className='absolute bottom-3 -right-[50px] animated_img2' variants={fadeInVariants}>                       
                                    <BottomCard quotes={slidesData[currentIndex].quotes.bottom} number={currentIndex+3}/>
                                </motion.div>
                                                                
                            </motion.div>

                            
                            
                        </div>
                    </AnimatePresence>
                    {/* <AnimatePresence mode="wait">
                        <div className='relative w-[clamp(30rem,100%,40rem)] h-[clamp(40rem,97vh,43rem)] flex items-center justify-center '>
                            <motion.div
                                key={currentIndex}
                                variants={slideVariants}
                                initial={
                                    direction === 'right' ? 'hiddenRight' : 'hiddenLeft'
                                }
                                animate="visible"
                                exit="exit"
                                className="max-w-xl w-[600px] h-[500px] relative rounded-lg block bg-transparent text-center"
                            >
                                    <Image
                                        src={slidesData[currentIndex].image}
                                        alt={slidesData[currentIndex].title}
                                        className="mx-auto object-contain rounded-lg w-full h-full"
                                        fill
                                        // height={400}
                                        // width={500}
                                        priority
                                    />

                                <div className='absolute top-3 left-0'>                       
                                    <TopCard title={slidesData[currentIndex].title} number={currentIndex+1}/>
                                </div>

                                <div className='absolute bottom-3 right-0'>                       
                                    <BottomCard title={slidesData[currentIndex].title} number={currentIndex+1}/>
                                </div>
                                                                
                            </motion.div>

                            
                            
                        </div>
                    </AnimatePresence> */}

                    <div className="flex gap-1 justify-center mt-4">
                        {slidesData.map((_, idx) => (
                            <svg
                            key={idx}
                            onClick={() => handleDotClick(idx)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="7"
                            height="7"
                            viewBox="0 0 4 4"
                            fill="none"
                            className="cursor-pointer rounded-full"
                            >
                            <circle
                                cx="2"
                                cy="2"
                                r="2"
                                fill={currentIndex === idx ? '#12B76A' : '#FFF'}
                            />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Slider
