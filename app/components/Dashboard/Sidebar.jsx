'use client';

import React, { useState, useEffect, useContext, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import {
    Aave,
    Add,
  MessageQuestion,
  LogoutCurve,
Book1 } from 'iconsax-react';
import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { signOut } from 'next-auth/react';
import './nav.css';

const Sidebar = ({ user }) => {
  const pathname = usePathname();
  const {
    isOpen: projectIsOpen,
    onOpen: onProjectOpen,
    onClose: onProjectClose,
  } = useDisclosure();


  const projectbtnRef = useRef();

  const [isDropdown, setIsDropdown] = useState(true);

  const wrapperClasses = classNames(
    'h-full sidebar pb-4 bg-[#373636] lg:flex justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r-[0.5px] border-[#737272] hidden w-64 z-50'
  );

  const showDropdown = () => {
    setIsDropdown(!isDropdown);
  };

  const menuLinks = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Category size={16} color="#ffffff" />,
      isDropdownMenu: false,
    },
    {
      label: 'Questions',
      href: '/admin/question-bank',
      action: (e) => {
        e.preventDefault();
        showDropdown();
      },
      icon: <MessageQuestion size={16} color="#ffffff" />,
      projects: true,
      isDropdownMenu: true,
    },
    {
      label: 'Results',
      href: '/admin/result-manager',
      icon: <Aave size={16} color="#ffffff" />,
      isDropdownMenu: false,
    },

    {
      label: 'Quizzes',
      href: '/admin/test-manager',
      icon: <Book1 size={16} color="#ffffff"/>,
      isDropdownMenu: false,
    },
    {
      label: 'Sign Out',
      href: '#',
      action: (e) => {
        e.preventDefault();
        signOut();
      },
      icon: <LogoutCurve size={16} color="#ffffff" />,
      isDropdownMenu: false,
    },
  ];

  return (
    <>
      <div
        className={wrapperClasses}
        style={{
          transition: 'width 0s ease-in-out 0s ',
        }}
      >
        <div className="flex flex-col">
          <div className="px-4 h-14">
            <div className="flex items-center justify-center py-5 border-b  border-[#373636]  relative h-full ">
              <div className="px-3 w-full block h-full ">
                <Link
                  href={'/admin/dashboard'}
                  className="flex items-center w-full justify-center h-full text-white text-lg font-bold tracking-wide "
                >
                  <Image
                    src="/images/sidebar-img/ankr.png"
                    height={20}
                    width={20}
                    className="transition 300ms ease object-contain w-auto h-auto mr-2"
                    priority
                    alt="logo dash"
                  /> Exam System
                </Link>
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow px-2">
            <div className=" flex-wrap space-y-2">
              {menuLinks.map((menuItem) => (
                <div key={menuItem.label}>
                  <div
                    className={`menu-item w-full font-thin ${
                      pathname == menuItem.href ||
                      pathname.startsWith(`${menuItem.href}/`)
                        ? 'bg-card-background text-[#008080]'
                        : 'text-white '
                    }  flex items-center  px-5 rounded-md transition-colors duration-200 ease-in hover:bg-card-background hover:text-[#008080] justify-between text-sm hover:border-[#008080] text-left h-10 ${
                      isDropdown ? 'active-dropdown' : ''
                    }`}
                  >
                    <div className="flex items-center justify-start flex-grow h-full">
                      <span
                        onClick={menuItem.action}
                        className="text-left mr-2 h-full flex items-center"
                      >
                        {menuItem.icon}
                      </span>
                      <div className=" w-full h-full flex items-center">
                        <Link
                          className={classNames(
                            'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                          )}
                          href={`${menuItem.href}`}
                        >
                          {menuItem.label}
                        </Link>{' '}
                      </div>
                    </div>

                    {menuItem.isDropdownMenu && (
                      <div className="flex items-center">
                        <button
                          className="bg-[#373636] rounded-lg flex items-center h-2 w-2 justify-center text-white add-icon"
                          ref={projectbtnRef}
                          onClick={onProjectOpen}
                        >
                          <Add size={14} />
                        </button>
                      </div>
                    )}
                  </div>

                  
                </div>
              ))}
              
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
