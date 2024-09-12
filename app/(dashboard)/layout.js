import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import MainLayout from '../components/Dashboard/MainLayout';

function layout({ children }) {
  return (
    <>
       <MainLayout>
        {children}
       </MainLayout>
    </>
)}

export default layout;