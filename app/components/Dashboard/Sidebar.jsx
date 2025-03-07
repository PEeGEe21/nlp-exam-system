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
Book1, 
ArrowDown2,
ArrowRight2,
Speaker,
Microphone,
Profile2User} from 'iconsax-react';
import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import { Category } from 'react-iconly';
import { signOut } from 'next-auth/react';
import './nav.css';
import toast from 'react-hot-toast';
import { start } from '@/app/utils/common';
import { Gears } from '@carbon/icons-react';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
  const [isDropdown, setIsDropdown] = useState(true);
  const [activeDropdowns, setActiveDropdowns] = useState([]);

  const wrapperClasses = classNames(
    ''
  );

  const pathname = usePathname();
  const router = useRouter();

  // const {
  //   isOpen: projectIsOpen,
  //   onOpen: onProjectOpen,
  //   onClose: onProjectClose,
  // } = useDisclosure();



  // const showDropdown = () => {
  //   setIsDropdown(!isDropdown);
  // };
  const showDropdown = (index) => {
    if (activeDropdowns.includes(index)) {
      setActiveDropdowns(activeDropdowns.filter((i) => i !== index));
    } else {
      setActiveDropdowns([...activeDropdowns, index]);
    }
  };

  const menuLinks = [
    {
      label: 'Dashboard',
      href: '/admin/dashboard',
      icon: <Category size={16} color="#ffffff" />,
      isDropdownMenu: false,
      rolesPermitted: ['admin']
    },
    {
      label: 'Dashboard',
      href: '/admin/dashboard-main',
      icon: <Category size={16} color="#ffffff" />,
      isDropdownMenu: false,
      rolesPermitted: ['super_admin']
    },
    {
      label: 'Question Bank',
      href: '/admin/question-bank',
      icon: <MessageQuestion size={16} color="#ffffff" />,
      isDropdownMenu: true,
      rolesPermitted: ['super_admin', 'admin'],
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      submenu: [
        {
          label: 'Question Bank',
          href: '/admin/question-bank',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
        {
          label: 'Create Questions',
          href: '/admin/question-bank/create',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
      ]
    },
    {
      label: 'Results',
      href: '/admin/result-manager',
      icon: <Aave size={16} color="#ffffff" />,
      isDropdownMenu: false,
      rolesPermitted: ['super_admin'],
    },

    {
      label: 'Test Management',
      href: '/admin/test-management',
      icon: <Book1 size={16} color="#ffffff"/>,
      rolesPermitted: ['super_admin', 'admin'],
      isDropdownMenu: false,
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      submenu: [
        {
          label: 'Tests',
          href: '/admin/test-management',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
        {
          label: 'Create Tests',
          href: '/admin/test-management/create',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
      ]
    },
    {
      label: 'Test Manager',
      href: '/student/test-manager',
      icon: <Book1 size={16} color="#ffffff"/>,
      isDropdownMenu: false,
      rolesPermitted: ['student'],
    },
    {
      label: 'Test Results',
      href: '/student/test-results',
      icon: <Microphone size={16} color="#ffffff"/>,
      rolesPermitted: ['student'],
      isDropdownMenu: false,
    },
    {
      label: 'Users',
      href: '/admin/users',
      icon: <Profile2User size={16} color="#ffffff"/>,
      isDropdownMenu: true,
      action: (e, index) => {
        e.preventDefault();
        showDropdown(index);
      },
      rolesPermitted: ['super_admin'],
      submenu: [
        {
          label: 'Users',
          href: '/admin/users',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        },
        {
          label: 'Students',
          href: '/admin/users/students',
          icon: <Category size={16} />,
          isDropdownMenu: false,
        }
      ]
    },

    {
      label: 'Settings',
      href: '/admin/settings',
      icon: <Gears size={16} color="#ffffff"/>,
      rolesPermitted: ['super_admin'],
      isDropdownMenu: false,
    },
    // {
    //   label: 'Sign Out',
    //   href: '#',
    //   action: (e) => {
    //     e.preventDefault();
    //     logout();
    //   },
    //   icon: <LogoutCurve size={16} color="#ffffff" />,
    //   isDropdownMenu: false,
    // },
  ];

  const filteredMenuLinks = menuLinks.filter(menuItem => 
    menuItem.rolesPermitted.some(role =>userRole == role)
  );
  // const filteredMenuLinks = menuLinks.filter(menuItem => 
  //   menuItem.rolesPermitted.some(role => user_roles.includes(role))
  // );

  const logout = () => {
      localStorage.removeItem('exam-system-user');
      router.push('/auth/login');
      toast.success('Successfully logged out')
  };

  return (
    <>
    {/* <div
        className={`h-full sidebar pb-4 bg-[#373636] lg:flex justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r-[0.5px] border-[#737272] fixed z-50 md:translate-x-0 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
      }`} */}
      <div
        className={`h-screen sidebar pb-4 bg-[#373636] lg:flex justify-between shadow-sm scrollbar-change flex-col overflow-y-auto overflow-x-hidden border-r-[0.5px] border-[#737272] z-50 md:translate-x-0 ${
          isOpen ? "translate-x-0 " : "-translate-x-full"
      }`}
      onClick={toggleSidebar}
      style={{
        transition: 'all 500ms ease-in-out ',
      }}
      >
        <div className="flex flex-col">
          <div className="px-4 h-14">
            <div className="flex items-center justify-center py-5 border-b  border-[#373636]  relative h-full ">
              <div className="px-3 w-full block h-full ">
                <button
                  onClick={()=>start((userRole).toLowerCase(), router.push)}
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
                </button>
              </div>
            </div>
          </div>

          <nav className="mt-6 md:mt-3 grow px-2">
            <div className="flex flex-col flex-wrap space-y-2">
              {/* {userRole === 'student' ? 
                <>
                  {studentMenuLinks.map((menuItem, index) => (
                      (menuItem.isDropdownMenu ? 

                        <div onClick={(e) => menuItem?.action(e, index)} key={menuItem.label}>
                          <div
                            className={`menu-item w-full font-thin ${
                              pathname == menuItem.href ||
                              pathname.startsWith(`${menuItem.href}/`)
                                ? 'bg-[#008080] text-white'
                                : 'text-white '
                            }  flex items-center px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#008080] hover:text-white justify-between text-sm hover:border-[#008080] text-left h-10 cursor-pointer ${
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
                                <div
                                  className={classNames(
                                    'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                                  )}
                                >
                                  {menuItem.label}
                                </div>{' '}
                              </div>
                            </div>

                            {menuItem.isDropdownMenu && (
                              <div className="flex items-center">
                                <button
                                  type='button'
                                  className="rounded-lg flex items-center h-2 w-2 justify-center text-white add-icon"
                                >
                                    {
                                      activeDropdowns.includes(index)? 
                                      <ArrowDown2 size={14} />
                                    : <ArrowRight2 size={14} /> 
                                    }
                                </button>
                              </div>
                            )}
                          </div>

                          <div className={`${activeDropdowns.includes(index) ? 'h-auto block opacity-100 ' : 'h-0 hidden opacity-0 '}  my-2 flex flex-col gap-2`}>
                              {menuItem.submenu.map((submenuItem) => (
                                <Link href={submenuItem.href}
                                  key={submenuItem.label}
                                  className={`menu-item w-full font-thin ${
                                    pathname === submenuItem.href
                                      ? 'bg-[#034343] text-[#fff]'
                                      : 'text-white '
                                  } flex items-center px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#034343]  hover:text-[#fff] justify-between text-sm hover:border-[#008080] text-left h-10`}
                                >
                                  <div className="flex items-center justify-start flex-grow h-full">
                                    
                                    <div className="w-full h-full flex items-center">
                                      <div className="text-sm font-normal w-full flex-1 flex-grow flex items-center h-full">
                                        {submenuItem.label}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                          </div>

                        </div>
                        : 
                        <Link href={`${menuItem.href}`} key={menuItem.label}>
                          <div
                            className={`menu-item w-full font-thin ${
                              pathname == menuItem.href ||
                              pathname.startsWith(`${menuItem.href}/`)
                                ? 'bg-[#008080] text-white'
                                : 'text-white '
                            }  flex items-center  px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#008080] hover:text-white justify-between text-sm hover:border-[#008080] text-left h-10
                              `}
                          >
                            <div className="flex items-center justify-start flex-grow h-full">
                              <span
                                onClick={menuItem.action}
                                className="text-left mr-2 h-full flex items-center"
                              >
                                {menuItem.icon}
                              </span>
                              <div className=" w-full h-full flex items-center">
                                <div
                                  className={classNames(
                                    'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                                  )}
                                >
                                  {menuItem.label}
                                </div>{' '}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                  ))}
                </>
              : 
                <> */}
                  {filteredMenuLinks.map((menuItem, index) => (
                      (menuItem.isDropdownMenu ? 

                        <div onClick={(e) => menuItem?.action(e, index)} key={menuItem.label}>
                          <div
                            className={`menu-item w-full font-thin ${
                              pathname == menuItem.href ||
                              pathname.startsWith(`${menuItem.href}/`)
                                ? 'bg-[#008080] text-white'
                                : 'text-white '
                            }  flex items-center px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#008080] hover:text-white justify-between text-sm hover:border-[#008080] text-left h-10 cursor-pointer ${
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
                                <div
                                  className={classNames(
                                    'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                                  )}
                                >
                                  {menuItem.label}
                                </div>{' '}
                              </div>
                            </div>

                            {menuItem.isDropdownMenu && (
                              <div className="flex items-center">
                                <button
                                  type='button'
                                  className="rounded-lg flex items-center h-2 w-2 justify-center text-white add-icon"
                                >
                                    {
                                      activeDropdowns.includes(index)? 
                                      <ArrowDown2 size={14} />
                                    : <ArrowRight2 size={14} /> 
                                    }
                                </button>
                              </div>
                            )}
                          </div>

                          <div className={`${activeDropdowns.includes(index) ? 'h-auto block opacity-100 ' : 'h-0 hidden opacity-0 '}  my-2 flex flex-col gap-2`}>
                              {menuItem.submenu.map((submenuItem) => (
                                <Link href={submenuItem.href}
                                  key={submenuItem.label}
                                  className={`menu-item w-full font-thin ${
                                    pathname === submenuItem.href
                                      ? 'bg-[#034343] text-[#fff]'
                                      : 'text-white '
                                  } flex items-center px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#034343]  hover:text-[#fff] justify-between text-sm hover:border-[#008080] text-left h-10`}
                                >
                                  <div className="flex items-center justify-start flex-grow h-full">
                                    
                                    <div className="w-full h-full flex items-center">
                                      <div className="text-sm font-normal w-full flex-1 flex-grow flex items-center h-full">
                                        {submenuItem.label}
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                          </div>

                        </div>
                        : 
                        <Link href={`${menuItem.href}`} key={menuItem.label}>
                          <div
                            className={`menu-item w-full font-thin ${
                              pathname == menuItem.href ||
                              pathname.startsWith(`${menuItem.href}/`)
                                ? 'bg-[#008080] text-white'
                                : 'text-white '
                            }  flex items-center  px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#008080] hover:text-white justify-between text-sm hover:border-[#008080] text-left h-10
                              `}
                          >
                            <div className="flex items-center justify-start flex-grow h-full">
                              <span
                                onClick={menuItem.action}
                                className="text-left mr-2 h-full flex items-center"
                              >
                                {menuItem.icon}
                              </span>
                              <div className=" w-full h-full flex items-center">
                                <div
                                  className={classNames(
                                    'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                                  )}
                                >
                                  {menuItem.label}
                                </div>{' '}
                              </div>
                            </div>
                          </div>
                        </Link>
                      )
                  ))}
                {/* </>
              } */}

              <div onClick={(e)=>(
                        e.preventDefault(),
                        logout()
                      )}
                      >
                <div
                  className={`menu-item w-full font-thin flex items-center px-5 rounded-md transition-colors duration-200 ease-in hover:bg-[#008080] text-white justify-between text-sm hover:border-[#008080] text-left h-10 cursor-pointer`}
                >
                  <div className="flex items-center justify-start flex-grow h-full">
                    <span
                      className="text-left mr-2 h-full flex items-center"
                    >
                      <LogoutCurve size={16} color="#ffffff" />
                    </span>
                    <div className=" w-full h-full flex items-center">
                      <div
                        className={classNames(
                          'text-sm font-normal w-full flex-1 flex-grow flex items-center h-full'
                        )}
                      >
                        Sign Out
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
