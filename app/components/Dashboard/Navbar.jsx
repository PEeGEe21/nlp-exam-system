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
import ToggleButton from '../ToggleButton';
import { shortenTitle } from '@/app/lib/utils';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Navbar = ({ isOpen, toggleSidebar, user }) => {
  // const contextValue = useContext(DashboardMenuContext) || {};
  // const { toggleDashMenu, showDashMenu } = contextValue;
  const router = useRouter();
  const isLoadingState = null;

  const logout = () => {
    localStorage.removeItem('exam-system-user');
    router.push('/auth/login');
    toast.success('Successfully logged out')
};

  return (
    <>
      <header className="bg-[#373636] border-b-[0.5px] border-[#737272] z-[999] h-14 ">
        <div className="container mx-auto px-4 lg:px-4 h-full">
          <nav className="flex items-center justify-between flex-wrap py-4 h-full ">
            <ToggleButton isOpen={isOpen} toggleSidebar={toggleSidebar}/>
            
            <div className="w-full hidden  flex-grow lg:flex lg:items-center lg:w-auto justify-end h-full">
              
              <div className="lg:flex lg:items-center lg:w-auto gap-4">

                {/* <div className="flex items-center justify-center">
                  <button>
                    <NotificationBing size={30} color="#008080" />
                  </button>
                </div> */}
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
                  <div className="relative flex items-center justify-center text-black z-[999] ">
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
                          className="bg-transparent hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md "
                        >
                          <span className=' text-clip  text-nowrap overflow-x-hidden'>
                            {shortenTitle(user?.email)}
                          </span>
                          
                        </MenuItem>
                        {/* <MenuItem
                          icon={<Profile2User size={14} />}
                          
                          className="bg-transparent hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Profile
                        </MenuItem>
                        <MenuItem
                          icon={<Setting3 size={14} />}
                          className="bg-transparent hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Settings
                        </MenuItem> */}
                        <MenuItem
                          icon={<LogoutCurve size={14} color="red" />}
                          onClick={logout}
                          className="bg-transparent hover:bg-card-background transition duration-200 ease-in-out p-2 rounded-md"
                        >
                          Sign Out
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
