import Link from "next/link";

import Image from "next/image";
import { TwitterIcon, YoutubeIcon } from "../ui/IconComponent";

const Footer = () => {
    return (
        <footer className="bg-[#002525] text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col ">
                    <div className="flex-1">
                        <div className="flex items-center  justify-center mb-6 flex-wrap">
                            <div className="w-full flex items-center mb-4 md:mb-0 justify-center ">
                                {/* <Image
                                    src="/images/Logofooter.png"
                                    alt="decoration barrel"
                                    width={200}
                                    height={150}
                                /> */}
                                Exam System
                            </div>
                        </div>
                    </div>
                    <div className="relative flex pt-2 justify-center flex-wrap text-center">
                        <p
                            style={{
                                color: "#878787",
                                fontSize: "1rem",
                                lineHeight: "2",
                            }}
                        >
                            &copy;{new Date().getFullYear()} P-R. All
                            rights reserved
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
