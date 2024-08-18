'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';

function layout({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Set to true initially

  
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-[#e2e8f0]">
        <Sidebar user={loggedInUser} />
        <div className="flex-1 h-full overflow-y-auto scrollbar-change">
          <main className="main-wrapper">
            <Navbar user={loggedInUser} isLoadingState={isLoading} />
            <div className=" container h-full py-2 lg:py-4 px-4 lg:px-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default layout;
