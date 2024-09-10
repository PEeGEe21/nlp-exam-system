"use client"

import React, {useState} from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';

function layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
  };

  const userRole = "admin"; 
  return (
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
)}

export default layout;