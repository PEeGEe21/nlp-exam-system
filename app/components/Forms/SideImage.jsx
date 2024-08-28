import React from 'react'
import Image from 'next/image'

const SideImage = () => {
  return (
    <div className='w-64 h-full'>
      <Image
            src={'/images/navbar-img/avatar-1.png'}
            alt="food pic"
            quality={100}
            layout="fill"
            objectFit="cover"
        />
    </div>
  )
}

export default SideImage
