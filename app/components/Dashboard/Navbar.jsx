'use client';
import React, { useContext } from 'react';
import { DashboardMenuContext } from '@/app/utils/dashboardContext';
import {
  NotificationBing,
  Profile2User,
  LogoutCurve,
  Setting3,
} from 'iconsax-react';
import Image from 'next/image';
import { LoaderIcon } from '../ui/IconComponent';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

const Navbar = ({ user, isLoadingState }) => {
  const contextValue = useContext(DashboardMenuContext) || {};
  const { toggleDashMenu, showDashMenu } = contextValue;

  return (
    <>
      <header className="bg-[#373636] border-b-[0.5px] border-[#737272] z-[999] h-14 ">
        <div className="container mx-auto px-4 lg:px-4 h-full">
          <nav className="flex items-center justify-between flex-wrap py-4 h-full ">
            <div className="md:block sm:hidden h-full">
              <button
                className={`navbar-burger flex items-center py-3 px-3 text-white  rounded relative transition-all duration-150 ease-linear ${
                  showDashMenu ? 'open' : ''
                }`}
                id="nav-icon3"
                onClick={toggleDashMenu}
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className="w-full hidden  flex-grow lg:flex lg:items-center lg:w-auto justify-end h-full">
              
              <div className="lg:flex lg:items-center lg:w-auto gap-4">

                <div className="flex items-center justify-center">
                  <button>
                    <NotificationBing size={30} color="#008080" />
                  </button>
                </div>
                {isLoadingState ? (
                  <>
                    <span>
                      <LoaderIcon
                        extraClass="text-[#013434]"
                        className="animate-spin mr-1"
                      />
                    </span>
                  </>
                ) : (
                  <div className="relative flex items-center justify-center z-[999] ">
                    <Menu className=" bg-card-background">
                      <MenuButton>
                        <div className="flex items-center justify-start gap-2 bg-card-background rounded-l-full h-auto">
                          <Image
                            src={'/images/navbar-img/avatar-1.png'}
                            alt=""
                            width={35}
                            height={35}
                            className="rounded-full"
                          />
                        </div>
                      </MenuButton>
                      <MenuList
                        className="bg-[#373636] p-3 text-white text-sm border border-[#737272] rounded-md z-[99]"
                        minWidth="150px"
                        maxWidth="150px"
                      >
                        <MenuItem
                          icon={<Profile2User size={14} />}
                          
                          className="hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          icon={<Setting3 size={14} />}
                          className="hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Settings
                        </MenuItem>
                        <MenuItem
                          icon={<LogoutCurve size={14} color="red" />}
                          className="hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Sign Out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                )}

                {/* <a
                  className={`menu-item font-thin  text-white border border-[#FFCC29]  items-center py-2 px-4  transition-colors duration-200 ease-in hover:bg-[#FFCC29] hover:text-[#1B1B1B] justify-start text-sm hover:border-[#008080]`}
                  href="/api/auth/logout"
                >
                  <span className={classNames('mx-2 text-sm font-normal ')}>
                    Sign Out
                  </span>
                </a> */}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
