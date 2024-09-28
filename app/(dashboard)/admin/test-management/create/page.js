"use client";
import CreateExamsForm from '@/app/components/Forms/CreateExamsForm';
import CreateQuestionsForm from '@/app/components/Forms/CreateQuestionsForm'
import AddQuestionsToExamsList from '@/app/components/tables/AddQuestionsToExamsList';
import { questions, tests } from '@/app/lib/constants';
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import { ArrowLeft } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

const CreateQuestion = () => {
  const [questionsNew, setQuestions] = useState([]);
  const [reloadKey, setReloadKey] = useState(0); // State to trigger reload
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const isEditing = Boolean(id);

  const test = tests.find(t => t.id === Number(id));

  const titlehead = id ? 'Edit':'Create';
  const reload = () => {
    setReloadKey(prev => prev + 1); // Change state to trigger useEffect
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // /api/tests/question-assign-index/:testId
        const res = await fetch('http://localhost:3001/api/tests/question-assign-index/'+id);
        if (res.ok) {
          const result = await res.json();
          setQuestions(result.data);
          // console.log(questions)
        }
      } catch (err) {
        console.error('Error fetching data:', err?.message);
      }
    };

    fetchData();

    // setQuestions(questions);
  },[id, reloadKey])

  return (
    <>
        <div>
            <div className="flex flex-row items-center justify-start gap-8 mb-8">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 w-auto whitespace-nowrap py-2 px-3 bg-[#313131] text-white rounded-md"
                  >
                    <ArrowLeft />
                  </button>

                  <div className="w-full">
                    <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">{titlehead} Test</h1>
                  </div>
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
                      {isEditing && (
                      <Tab 
                        onClick={reload}
                        className=" border-[#3B3939] text-[#81878B]"
                        _hover={{ borderBottomColor: "#FFA178", color: "#FFFFFF", backgroundColor:"#313131" }}
                        _selected={{ color: "#FFF", backgroundColor:"#313131" }}
                      >
                        Add Questions
                      </Tab>
                      )}
                    </TabList>
                    {/* <TabIndicator
                      mt="-1.5px"
                      height="2px"
                      bg="#FFA178"
                      borderRadius="1px"
                    /> */}
                    <TabPanels>
                      <TabPanel className="px-0">
                        <CreateExamsForm id={id}/>
                      </TabPanel>
                      <TabPanel className="px-0">
                        <div className="py-3">
                          <AddQuestionsToExamsList test={test} questions={questionsNew} setQuestions={setQuestions} reload={reload} />
                          {/* <EmptyState /> */}
                        </div>
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </div>
              </div>
        </div>
    </>
  )
}

export default CreateQuestion
