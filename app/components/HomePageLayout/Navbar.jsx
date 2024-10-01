'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import "../../styles/navbar.css";
import { ArrowDown, ArrowDown2, Global } from 'iconsax-react';
// import { MenuContext } from '@/app/utils/context';

const Navbar = () => {
  // const { toggle, showMenu } = useContext(MenuContext) || {};
  const showMenu = null;
  return (
      <header className='absolute top-0 w-full z-50 '>
        <div className='max-w-[1400px] mx-auto w-full p-4 '>

          <div className='flex justify-between items-center text-[#373636] '>
            <div>
              <Link
                    href="/"
                    className="text-xl font-semibold font-heading">
                      {/* <Image
                        src="/images/sidebar-img/ankr.png"
                        width={150}
                        height={150}
                        alt="logo"
                        priority
                        className="" 
                      />*/}
                      EXAM SYSTEM
              </Link>
            </div>
            <div>
              <div className="inline-flex justify-between items-center text-sm font-medium gap-6 rounded-[12px] bg-white px-4  h-12">
                  <Link
                    className="text-[#353535] leading-7 "
                    href="/auth/login"
                  >Log in</Link>
                  <Link
                    className="flex justify-center items-center text-white font-medium bg-[#008080] h-8 rounded-[.5rem] py-[.375rem] px-[.75rem]"
                    href="/auth/signup"
                  >
                    Sign Up</Link>
              </div>
            </div>
          </div>
        </div>

      </header>
  );
};

export default Navbar;
