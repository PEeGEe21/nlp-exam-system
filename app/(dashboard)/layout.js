
import React from 'react';
import MainLayout from '../components/Dashboard/MainLayout';

function layout({ children }) {
  
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-white relative">
      {/* bg-[#e2e8f0] */}
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </>
  );
}

export default layout;
