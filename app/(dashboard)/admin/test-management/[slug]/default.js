"use client";
import { Progress, useToast } from "@chakra-ui/react";
import { ArrowLeft, Copy, Global } from "iconsax-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "./loading";

const SingleQuestion = () => {
    const router = useRouter();
    const params = useParams();
    const { slug } = params;
    const toast = useToast();

    const [loading, setLoading] = useState(true);
    const [launch, setLaunch] = useState(null);
    const [progress, setProgress] = useState(0);
    const [totalSold, setTotalSold] = useState(0);
    const [myContributions, setContributions] = useState(0);
    const [totalContributors, setTotalContributors] = useState(0);
    // const { isConnected, address } = useAccount();

    //buy amount
    const [amount, setAmount] = useState(0);
    const [buyingToken, setBuyingToken] = useState(false);

    const [claiming, setClaiming] = useState(false);


    const data = null;

    const balance = useMemo(() => {
        if (data) {
            return Number(formatUnits(data?.value, data?.decimals));
        }
        return 0;
    }, []);

    const copyHandler = (value) => {
        navigator.clipboard.writeText(value);
        toast({ title: "Address Copied.", status: "success", duration: 1000 });
    };



    // if (slug && loading) {
    //     return <Loading />;
    // }

    if (!loading && !launch) {
        notFound();
    }

    return (
        <>
            <div className="text-white">
                <div>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                    >
                        <ArrowLeft />
                    </button>
                </div>
                <div className="flex flex-wrap gap-8 py-12 lg:flex-nowrap">
                    <div className="w-full space-y-8 md:w-full lg:w-7/12">
                        <div className="bg-[#272727] rounded-lg px-5 py-4 flex flex-col gap-5 relative">
                            
                            <div>
                                <h3 className="mb-2 text-lg font-medium text-white">
                                    Question Details
                                </h3>

                                <div className="text-white border border-[#464849] rounded-lg py-[14px] px-5 flex flex-col w-full">
                                    <div className="flex flex-col flex-wrap items-start w-full p-2">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Question
                                        </h3>
                                        <div>
                                            <div
                                                className="text-base text-[#FF8789] text-left"
                                                dangerouslySetInnerHTML={{
                                                    __html: "lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet, consectetur adip",
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-wrap items-start w-full p-2">
                                        <h3 className="font-medium text-[#898582] text-sm">
                                            Difficulty Level
                                        </h3>
                                        <span className="font-medium text-[#FFFFFF] text-base">
                                            Easy
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleQuestion;
