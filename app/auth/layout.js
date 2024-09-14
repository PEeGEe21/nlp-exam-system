import Image from 'next/image';
import Link from 'next/link';
import Slider from '../components/Slider/Slider';

export default function Layout({ children }) {
    return (
        <div className="flex h-dvh max-h-dvh">
            <div className='grid grid-cols-1 md:grid-cols-2 w-full'>

                <div className=" bg-white overflow-auto h-full flex items-center grow flex-col justify-start pt-2 py-4 w-full min-h-screen px-5 no-scrollbar">
                    <div className='max-w-lg mx-auto w-full flex flex-col justify-start gap-4'>
                        <div className="w-full block text-center w-full">
                            <Link
                                href={'/'}
                                className="flex mt-2 mb-6 items-center justify-center w-full text-black text-3xl text-lg font-bold tracking-wide"
                            >
                                Exam System
                            </Link>
                        </div>
                        <div className=''>
                            {children}   
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex justify-center py-2">
                    <div className="md:rounded-xl bg-bg-200 h-[clamp(40rem,97vh,97vh)] w-[clamp(30rem,100%,100%)]  flex justify-center items-center overflow-hidden relative h-full">
                        {/* <div className="relative h-full w-full">
                            <Image
                                src="/images/navbar-img/avatar-1.png"
                                alt="Avatar Image"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div> */}
                        <Slider/>
                    </div>
                </div>
            </div>
        </div>
    );
}
