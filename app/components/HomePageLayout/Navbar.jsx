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
    <>
      <header>
        <div className='flex justify-between items-center text-[#373636]'>
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
            <ul className="flex justify-between items-center gap-[50px]">
              <li>
                <Link
                  className=""
                  href="/"
                >Home</Link>
              </li>
              <li>
                <Link
                  className=""
                  href="/"
                >How it works</Link>
              </li>
              <li>
                <Link
                  className="flex justify-center items-center text-white font-medium bg-[#008080] px-4 h-[50px] rounded-[50px]"
                  href="/auth/login"
                >
                  Get Started</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
