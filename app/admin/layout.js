
import React from 'react';
import MainLayout from '../components/Dashboard/MainLayout';

function layout({ children }) {
  
  return (
    <>
      <div className="h-screen flex flex-row justify-start bg-[#e2e8f0] relative">
        <MainLayout>
          {children}
        </MainLayout>
      </div>
    </>
  );
}

export default layout;
