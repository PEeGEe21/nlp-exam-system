import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-white px-[130px] pt-[100px] overflow-auto">
                <div className="pt-3 w-full block">
                    <Link
                        href={'/admin/dashboard'}
                        className="flex mt-2 mb-6 items-center w-full text-black text-3xl text-lg font-bold tracking-wide"
                    >
                        Exam System
                    </Link>
                </div>
                {children}
            </div>
            <div className="relative w-1/2 h-screen">
                <Image
                    src="/images/navbar-img/avatar-1.png"
                    alt="Avatar Image"
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
        </div>
    );
}
