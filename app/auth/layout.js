import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }) {
    return (
        <div className="flex">
            <div className="w-1/2 justify-center bg-white p-[100px]">
                <div className="pt-3 w-full block">
                    <Link
                    href={'/admin/dashboard'}
                    className="flex items-center w-full h-full text-black text-3xl text-lg font-bold tracking-wide "
                    >
                    <Image
                        src="/images/socials-img/apple.png"
                        height={18}
                        width={18}
                        className="transition 300ms ease object-contain w-auto h-auto mr-2"
                        priority
                        alt="logo dash"
                    /> Exam System
                    </Link>
                </div>
                {children}
            </div>
            <div className="relative w-1/2 h-screen">
                <Image
                    src="/images/navbar-img/avatar-1.png"
                    alt="Avatar Image"
                    layout="fill"
                    objectFit="cover" // Ensures the image covers the container
                />
            </div>
        </div>
    );
}