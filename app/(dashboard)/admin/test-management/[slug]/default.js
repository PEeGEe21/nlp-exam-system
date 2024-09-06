"use client";
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import { ArrowLeft, Copy, Global } from "iconsax-react";
import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "./loading";
import UpdateExamsForm from "@/app/components/Forms/UpdateExamsForm";
import EmptyState from "@/app/components/EmptyState";
import AddQuestionsToExamsList from "@/app/components/tables/AddQuestionsToExamsList";
import { questions } from "@/app/lib/constants";

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


                <div className="py-2 mb-5 rounded-lg">
                  <div className="relative w-full py-4 shadow-box">
                    <Tabs position="relative" variant="unstyled" isLazy>
                      <TabList className="whitespace-nowrap gap-3 border-b border-[#3B3939] text-sm">
                        <Tab
                          className=" border-[#3B3939] text-[#81878B]"
                          _hover={{ borderBottomColor: "#FFA178", color: "#FFFFFF", backgroundColor:"#313131" }}
                          _selected={{ color: "#FFF", backgroundColor:"#313131" }}
                        >
                          Exam Details
                        </Tab>
                        <Tab 
                          // onSelect={}
                          className=" border-[#3B3939] text-[#81878B]"
                          _hover={{ borderBottomColor: "#FFA178", color: "#FFFFFF", backgroundColor:"#313131" }}
                          _selected={{ color: "#FFF", backgroundColor:"#313131" }}
                        >
                          Add Questions
                        </Tab>
                      </TabList>
                      {/* <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="#FFA178"
                        borderRadius="1px"
                      /> */}
                      <TabPanels>
                        <TabPanel className="px-0">
                          <UpdateExamsForm />
                        </TabPanel>
                        <TabPanel className="px-0">
                          <div className="py-3">
                            <AddQuestionsToExamsList questions={questions}/>
                            {/* <EmptyState /> */}
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </div>
                </div>
            </div>
        </>
    );
};

export default SingleQuestion;
