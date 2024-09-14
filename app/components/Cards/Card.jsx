import { motion } from 'framer-motion'
import { fadeIn, planetVariants, slideIn, staggerContainer } from '@/app/utils/motion'
import React from 'react'
import { QuoteDown, QuoteUp } from 'iconsax-react'

const TopCard = ({quotes, number}) => {
    return (
      <>
      <motion.div
      variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25}}
      >
          <motion.div
              // variants={planetVariants('left')}
              variants={fadeIn('right', 'tween', 0.3 * number, 0.5)} 
              className='bg-white text-gray-700 min-w-48 max-w-[500px] min-h-24 text-left rounded-[1rem] px-4 py-5 bg-bg-000 font-styrene text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] text-text-300 relative w-60 flex items-center justify-center'>
                <span className='flex flex-col w-full'>
                    <div className='relative'>
                        <QuoteUp size={11} className='absolute '/>
                        <span className='inline-flex ml-5'>
                            {quotes?.text}
                            {/* <QuoteDown size={11} className='flex-1'/> */}
                        </span>
                            
                    </div>
                    <span className='text-xs font-semibold flex items-center justify-end'>
                         - {quotes?.author}
                    </span>
                </span>
          </motion.div> 
      </motion.div> 
      </>
    )
  }

const BottomCard = ({quotes, number}) => {
  return (
    <>
        <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25}}
        className=''
        >
            <motion.div
                // variants={planetVariants('left')}
                variants={fadeIn('left', 'tween', 0.3 * number, 0.5)} 
                className='bg-white text-gray-700 min-w-48 max-w-[500px] min-h-24 text-left rounded-[1rem] px-4 py-5 bg-bg-000 font-styrene text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] text-text-300 relative w-60 flex items-center justify-center'>
                    <span className='flex flex-col w-full'>
                        <div className='relative'>
                            <QuoteUp size={11} className='absolute '/>
                            <span className='inline-flex ml-5'>
                                {quotes?.text}
                                {/* <QuoteDown size={11} className='flex-1'/> */}
                            </span>
                                
                        </div>
                        <span className='text-xs font-semibold flex items-center justify-end'>
                            - {quotes?.author}
                        </span>
                    </span>            
            </motion.div> 
        </motion.div> 
    </>
  )
}



export {
    BottomCard,
    TopCard
}
