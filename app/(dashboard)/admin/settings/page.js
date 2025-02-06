"use client"
import { Progress, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, useToast } from "@chakra-ui/react";
import React, {useContext, useEffect, useState} from 'react'
import { SearchNormal1 } from "iconsax-react";
// import JournalsMainTable from '../../../../components/Tables/JournalsMainTable'
// import SectionsTable from '../../../../components/Tables/SectionsTable'
import Link from "next/link";
import { hostUrl } from '@/app/lib/utils';
import QuestionTypeTable from "@/app/components/tables/QuestionTypeTable";
import DifficultyTypeTable from "@/app/components/tables/DifficultyTypeTable";

const Settings = () => {
    const [viewType, setViewType] = useState(0);
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [questionTypes, setQuestionTypes] = useState([]);
    const [difficulties, setDifficulties] = useState([]);
    const [sectionsDataSource, setSectionsDataSource] = useState([]);

//   const { selectedJournal } = useContext(JournalContext);


  useEffect(() =>{
    const getUser = async ()=>{
      try{
          if (localStorage.getItem('exam-system-user')){
              const data = await JSON.parse(
                  localStorage.getItem("exam-system-user")
              );
              setUser(data)
          }else{
              router.push("/auth/login")
          }
      }catch(err){}
    };

    getUser();
  }, [])

  const fetchQuestionData = async () => {
    try {
        setIsLoading(true);
        const res = await fetch(hostUrl + 'option-types');
        if (res.ok) {
            const result = await res.json();
            setQuestionTypes(result.data);
            // setUsers(result.users);
        }
    } catch (err) {
        console.error('Error fetching data:', err?.message);
    } finally {
        setIsLoading(false);
    }
  }

  const fetchDifficultyData = async () => {
      try {
          setIsLoading(true);
          const res = await fetch(hostUrl + 'difficulty-types');
          if (res.ok) {
              const result = await res.json();
              setDifficulties(result.data);
          }
      } catch (err) {
          console.error('Error fetching data:', err?.message);
      } finally {
          setIsLoading(false);
      }
  }

  useEffect(() => {
      fetchQuestionData();
    //   fetchData();
  }, []);

  return (
    <div>
        <div className="flex flex-row items-center justify-between mb-8">
            <div className="flex flex-row items-center justify-start gap-8">
            <div className="w-full">
                <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Settings</h1>
            </div>
            </div>

        </div>
        
        <div className="mt-8">

          <div className="py-2 mb-5 rounded-lg">
            <div className="relative w-full py-4 shadow-box">
              <Tabs position="relative" variant="unstyled" isLazy defaultIndex={0}>
                <TabList className="whitespace-nowrap gap-3 text-sm border-b border-gray-200">
                  <Tab
                    onClick={fetchQuestionData}
                    className=" border-[#fff] border-b text-[#313131] "
                    _hover={{ borderBottom:"1px", borderBottomColor: "#0F1B2D" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderBottom:"1px", borderBottomColor: "#0F1B2D"}}
                  >
                    <span className="py-2">
                      Question Type
                    </span>
                  </Tab>
                  <Tab 
                    onClick={fetchDifficultyData}
                    className=" border-[#fff] border-b text-[#313131] "
                    _hover={{ borderBottom:"1px", borderBottomColor: "#0F1B2D" }}
                    _selected={{ color: "#313131", backgroundColor:"#FFFFFF", borderBottom:"1px", borderBottomColor: "#0F1B2D"}}
                  >
                    
                    <span className="py-2  min-w-[150px]">
                      Difficulty Level
                    </span>
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px] py-4">
                        <QuestionTypeTable 
                          user={user} 
                          users={users} 
                          data={questionTypes} 
                          fetchData={fetchQuestionData} 
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </TabPanel>
                   <TabPanel className="px-0 py-0">
                    <div>
                      <div className="bg-white min-h-[500px] py-4">
                        <DifficultyTypeTable 
                          user={user} 
                          users={users} 
                          data={difficulties} 
                          fetchData={fetchDifficultyData} 
                          isLoading={isLoading}
                        />
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </div>
        </div>

    </div>
  )
}

export default Settings;
