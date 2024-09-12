"use client"
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
// import Footer from './Footer'

const MainLayout = ({children}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const userRole = "admin"; 
    return (
        <>
            {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole}/>
            <div className="flex-1 h-full overflow-y-auto scrollbar-change">
                <main className="main-wrapper">
                    <Navbar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                    <div className="md:max-w-[calc(100%-14rem)] h-full py-2 lg:py-4 lg:px-4 mx-auto ">
                        {children}
                    </div>
                </main>
            </div>
            <div 
                onClick={toggleSidebar} 
                className={`absolute top-0 left-0 h-full w-full bg-black/80 z-40 cursor-auto pointer-events-auto transition-all duration-300 ease-linear md:-translate-x-full ${
                isSidebarOpen ? "translate-x-0 " : "-translate-x-full"}`}
            ></div> */}

            <div className="flex h-screen">
                <div className="w-1/6 h-screen">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} userRole={userRole}/>
                </div>
                <div className="w-5/6 overflow-x-hidden overflow-y-auto">
                    <div className="block">
                        <Navbar  isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}

export default MainLayout
