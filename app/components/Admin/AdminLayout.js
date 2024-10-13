"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, {useEffect, useState} from 'react'

const AdminLayout = ({children}) => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const { router } = useRouter();
    useEffect(()=>{
        const getUser = async ()=>{
            try{
                if (localStorage.getItem('exam-system-user')){
                    const data = await JSON.parse(
                        localStorage.getItem("exam-system-user")
                    );
                    setUser(data)
                    setUserId(data.id)
                    setUserRole(data.user_role)
                }else{
                    router.push("/auth/login")
                }

            }catch(err){}
        };
        getUser()
    }, [])

    return (
        <div className='relative'>
            {!user || (user.user_role !== "admin") ? 
            <>
                <div 
                className={`fixed top-0 left-0 h-full w-full bg-black/95 z-40 cursor-auto pointer-events-auto transition-all duration-300 ease-linear`}
                >
                    <div className={`flex flex-col items-center justify-center h-full w-full p-4 text-white gap-2`}>
                        <Image
                            src="/images/access-denied-anim.gif"
                            alt="access-denied"
                            width={250}
                            height={250}
                            className="object-contain"
                        />
                        <h1 className='text-3xl'>You are not an Admin!</h1>
                        <Link href='/' className='underline underline-offset-2'>Return to Home</Link>
                    </div>
                </div>
            </> 
            : 
            <>
                {children}
            </>}
        
        </div>
    )
}

export default AdminLayout
