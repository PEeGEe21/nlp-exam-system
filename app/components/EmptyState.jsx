'use client';
import Image from 'next/image';
import React from 'react';

const EmptyState = ({title = 'No data found'}) => {
  return (
    <div className="flex items-center h-full w-full justify-center py-12 text-center">
      <div>
        <Image
          src="/images/undraw_taken.svg"
          alt="wallet"
          width={250}
          height={250}
          className="object-contain"
        />
        <p className="text-sm text-[#000] mt-3">{title}</p>
      </div>
    </div>
  );
};

export default EmptyState;
