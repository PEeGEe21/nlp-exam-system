import AdminLayout from "@/app/components/Admin/AdminLayout";

function layout({ children }) {
  return (
    <>
        <div className='relative'>
            <AdminLayout>
                {children}
            </AdminLayout>
        </div>

    </>
)}

export default layout;