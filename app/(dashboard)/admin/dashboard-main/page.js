"use client"
import { formatDuration, formatMomentDate, hostUrl } from '@/app/lib/utils';
import { getFullName } from '@/app/utils/common';
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tfoot,
//   Tr,
//   Th,
//   Td,
//   TableCaption,
//   TableContainer,
// } from '@chakra-ui/react'
import { Flex, Table } from 'antd';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import React, {useEffect, useState} from 'react'

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState(0);
  const [tests, setTests] = useState(0);
  const [students, setStudents] = useState(0);
  const [activeTests, setActiveTests] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(()=>{
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
      getUser()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      
      if(user){
        setLoading(true); // Start loading
        try {
          const res = await fetch(hostUrl + 'users/admin-dashboard/'+user?.id);
          if (res.ok) {
            const result = await res.json();
            // console.log(result)
            setQuestions(result.total_questions);
            setTests(result.total_tests);
            setStudents(result.total_students);
            setActiveTests(result.active_tests);
            setTotalUsers(result.total_users);
            setResults(result.results);
          }
        } catch (err) {
          console.error('Error fetching data:', err?.message);
        } finally {
          setTimeout(() =>{
            setLoading(false); // End loading
          }, 500)
        }
      }
    };

    fetchData();
  }, [user]);



  const columns = [
    {
        title: '#',
        dataIndex: 'key',
        key:'index',
        // width: 10,
        width: '2%',
        render: (text, record, index) => (
            <span className="text-[#313131]">{(currentPage - 1) * pageSize + index + 1}</span>
        ),
    },
    {
        key:'1',
        title: 'Email',
        dataIndex: 'email',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131]">{record?.student?.user?.email}</span>
        ),
    },
    {
        key:'2',
        title: 'Name',
        dataIndex: 'name',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131]">{getFullName(record?.student?.user?.profile)}</span>
        ),
    },
    {
        key:'3',
        title: 'Date',
        dataIndex: 'date',
        width: '10%',
        render: (text, record, index) => (
            <span className="text-[#313131]">
              {formatMomentDate(record?.createdAt)}
            </span>
        ),
    },
    {
        key:'4',
        title: 'Marks',
        dataIndex: 'marks',
        width: '5%',
        render: (text, record, index) => (
            <span className="text-[#313131]">
              {record?.totalScored}
            </span>
        ),
    },
    {
        key:'5',
        title: 'Time Elapsed',
        dataIndex: 'time_elapsed',
        width: '5%',
        render: (text, record, index) => (
            <span className="text-[#313131]">
              {formatDuration(record?.startDate, record?.endDate)}
            </span>
        ),
    },
    // {
    //     key:'6',
    //     title: 'Status',
    //     dataIndex: 'status',
    //     width: '5%',
    //     render: (text, record, index) => (
    //         <span className="text-[#313131]">
    //           {record?.status}
    //         </span>
    //     ),
    // },
    {
        key: '6',
        title: '',
        width: '5%',
        render: (_, record) => {
            return(
              <div className="text-[#313131] text-xs flex items-center justify-center gap-2 flex-row">
                  <Link href={'/admin/result-manager/'+ record.id + '/test-details?test='+record.testId + '&student='+ record?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                      Test Details
                  </Link>
              </div>
            )
        },
    },
  ];

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Dashboard</h1>
                </div>
              </div>

          </div>

          <div className='space-y-12'>
            <div className='grid grid-cols-1 md:grid:cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
              <Link href={'/admin/question-bank'} className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>

                  <div className='text-sm text-[#71767B] font-medium '>
                    My Questions
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {questions}
                  </div>
                </div>
              </Link>
              <Link href={'/admin/test-management'} className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Tests Created
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {tests}
                  </div>
                </div>
              </Link>
              <Link href={'/admin/users/students'} className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] flex items-center gap-1 font-medium '>
                    <GraduationCap/>
                    Total Students
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {students}
                  </div>
                </div>
              </Link>
              <Link href={'/admin/test-management'} className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Active Tests
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {activeTests}
                  </div>
                </div>
              </Link>
              <Link href={'/admin/users'} className='bg-[#F9FAFC] border border-[#E7E8EA] min-h-[120px] p-4 rounded-md flex items-center justify-start h-full shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-200 ease-in-out cursor-pointer'>
                <div className='h-full flex items-start justify-center flex-col gap-1'>
                  <div className='text-sm text-[#71767B] font-medium '>
                  Total Users
                  </div>
                  <div className='text-[#1D2937] text-3xl font-semibold'>
                    {totalUsers}
                  </div>
                </div>
              </Link>
            </div>

            <div className='bg-[#F9FAFC] border border-[#E7E8EA] shadow-[0_2px_4px_0_rgba(0,0,0,0.25)]'>
              <div className='px-5 pt-5' >
                <div className='text-sm text-[#71767B] font-medium '>
                  Latest Results
                </div>
              </div>
              <div className="overflow-x-auto md:overflow-x-auto p-5 text-[#313131] scrollbar-change rounded-md whitespace-nowrap">
                <Flex gap="middle" vertical>
                    <Table
                        scroll={{ x: 'max-content' }}
                        columns={columns} 
                        dataSource={results}
                        bordered
                        rowClassName="editable-row"
                        pagination={{
                            current: currentPage, // Current page state
                            pageSize: pageSize, // Page size state
                            pageSizeOptions: ['5', '10', '20'], // Options for page size
                            showSizeChanger: true, // Enable the page size changer
                            onShowSizeChange: (current, size) => {
                              setPageSize(size); // Update page size state
                              setCurrentPage(1); // Reset to first page
                            },
                            onChange: (page) => {
                              setCurrentPage(page); // Update current page state
                            },
                        }}
                        rowKey="id"
                    />
                </Flex>
              </div>
              {/* <div className="overflow-x-auto md:overflow-x-auto p-5 text-[#313131] scrollbar-change rounded-md">
                  <Table variant='unstyled' className='py-3 table-bordered'>
                    <Thead className='bg-[#F7FAFC] border-b border-[#e7ecf1]'>
                      <Tr>
                        <Th width={10}>#</Th>
                        <Th>Email</Th>
                        <Th>Name</Th>
                        <Th>Date</Th>
                        <Th>Marks</Th>
                        <Th>Time Elapsed</Th>
                        <Th>Status</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody className=' w-full px-4 divide-y divide-[#e7ecf1]'>

                    {results.length < 1 && 
                      <Tr>
                        <Td colSpan={8} alignContent={'center'} className="text-center">No data found</Td>  
                      </Tr>
                    }

                    {results && results.length > 0 && results?.map((result, index) => (
                          <Tr key={index} className='px-4 hover:bg-[#F7FAFC]'>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                      {index + 1}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                      {result?.student?.user?.email}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.student?.user?.name}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {formatMomentDate(result?.createdAt)}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.totalScored}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {formatDuration(result?.startDate, result?.endDate)}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-base whitespace-nowrap">
                                  <span className="text-[#313131] text-base">
                                    {result?.status}
                                  </span>
                              </Td>
                              <Td className="px-2 py-4 text-sm whitespace-nowrap">
                                  <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                      <Link href={'/admin/result-manager/'+ result.id + '/test-details?test='+result?.testId + '&student='+ result?.student?.id} className='btn px-2 py-1 bg-[#e1e5ec] border border-[#e1e5ec] rounded text-[#666] flex items-center'>
                                          Test Details
                                      </Link>
                                  </div>
                              </Td>

                          </Tr>
                      ))} 
                    </Tbody>
                  </Table> 
              </div>*/}
              
            </div>
          </div>
        </div>

    </div>
  )
}

export default Dashboard
