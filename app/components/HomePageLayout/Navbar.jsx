'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Portal
} from '@chakra-ui/react';
import { ArrowDown, ArrowDown2, Global, LogoutCurve, User } from 'iconsax-react';
import { shortenTitle } from '@/app/lib/utils';
import { logout } from '@/app/utils/common';
import toast from 'react-hot-toast';
// import { MenuContext } from '@/app/utils/context';

const Navbar = ({user, start, isDesktop =true}) => {
  const [loading, setLoading] = useState(true)
  // const { toggle, showMenu } = useContext(MenuContext) || {};
  const showMenu = null;

  const handleLogOut = () => {
    logout();
    toast.success('Successfully logged out')
    setTimeout(() => {
        window.location.href = '/';
    }, 500);
  };


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
              <div className="text-sm font-medium ">
                {isDesktop ? 
                  <div className="inline-flex justify-between items-center text-sm font-medium gap-6 rounded-[12px] bg-white px-4  h-12">
                      
                        <>
                          {!user ? 
                            <>
                              <Link
                                className="text-[#353535] leading-7 "
                                href="/auth/login"
                              >Log in
                              </Link>

                              <Link
                                className="flex justify-center items-center text-white font-medium bg-[#008080] h-8 rounded-[.5rem] py-[.375rem] px-[.75rem]"
                                href="/auth/signup"
                              >
                                Sign Up
                              </Link>
                              </> : 
                            
                              <>
                              <Menu className=" bg-card-background" >

                                <MenuButton
                                  className="text-[#353535] leading-7 "
                                >
                                  <div className="inline-flex justify-between items-center text-sm font-medium gap-6 rounded-[12px] bg-white h-12">

                                    <span>{shortenTitle(user?.email)}</span>
                                
                              
                                  <div className="flex items-center justify-start gap-2 bg-card-background rounded-l-full h-auto">
                                    <Image
                                      src={'/images/navbar-img/avatar-1.png'}
                                      alt=""
                                      width={35}
                                      height={35}
                                      className="rounded-full"
                                    />
                                  </div>
                                </div>
                                </MenuButton>

                                <Portal className='test-popup'>

                                  <MenuList
                                      className="bg-[#0F1B2D] py-2 text-white text-sm border border-[#737272] rounded-md z-[99] w-full "
                                      minWidth="150px"
                                      maxWidth="250px"
                                      sx={{
                                        '--popper-transform-origin': 'top left !important',
                                        transformOrigin: 'top left !important'
                                      }}                   
                                  >
                                      <button
                                        onClick={()=>start((user?.user_role).toLowerCase())}
                                        className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white w-full"
                                      >
                                        <User size={14} color="white" className='hidden md:block'/> <span>Dashboard</span>
                                      </button>

                                    <MenuItem
                                      onClick={handleLogOut}
                                      className="hover:bg-[#008080] transition duration-200 ease-in-out px-3 py-3 bg-[#0F1B2D] text-sm whitespace-nowrap flex items-center justify-start gap-2 text-center text-white"
                                    >
                                      <LogoutCurve size={14} color="white" className='hidden md:block'/> <span>Sign Out</span>
                                    </MenuItem>
                                  </MenuList>
                                </Portal>
                              </Menu>
                            </> 
                          }
                        </> 

                  </div>
                :
                  <></>
                }
              </div>
            </div>
          </div>
        </div>

      </header>
  );
};

export default Navbar;
