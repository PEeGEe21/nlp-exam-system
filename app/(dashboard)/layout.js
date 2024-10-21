import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import MainLayout from '../components/Dashboard/MainLayout';

function layout({ children }) {
  return (
    <>
      {/* <div className="h-screen flex flex-row justify-start bg-[#F3F4F6]"> */}
        <MainLayout>
          {children}
        </MainLayout>
      {/* </div> */}

    </>
)}

export default layout;