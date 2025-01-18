"use client"
import React, { useMemo, useState } from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { PenTool, Trash } from 'iconsax-react';
import { Pen } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Flex, Table } from 'antd';
import { formatDate, formatMomentDate, getTotalMinutes, hostUrl } from '@/app/lib/utils';

const ExamsListTable = ({ tests = [], setTests}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size
    // const filteredAllExams = useMemo(() => {
    //     if (searchQuery && tests?.length > 0) {
    //       const filtered = tests.filter((launch) =>
    //         launch?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    //       );
    //       return filtered;
    //     }
    //     return tests;
    //   }, [searchQuery, tests]);

    const deleteTest = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'You are about to delete a test!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `tests/delete/${id}`);
                    if (response.success){
                        Swal.fire(
                            'Deleted!',
                            'The Exam has been deleted.',
                            'success'
                        );
                    } else {
                        Swal.fire('Error!', 'There was an issue deleting your exam.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your exam.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setTests((prevTests) => prevTests.filter((test) => test.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The Test has been deleted.',
                    'success'
                );
            }
        });
    };

    const publishTest = (id) => {
        Swal.fire({
            title: 'Are you sure you want to publish this test?',
            text: 'You are about to publish a test!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Publish',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const data = {
                        isPublished: 1
                    }
                    const response = await axios.patch(hostUrl + `tests/edit/${id}`, data);
                    if (response.data.success){
                        setTests((prevTests) =>
                            prevTests.map((test) => 
                                test.id === id ? { ...test, isPublished: 1 } : test
                            )
                        );
                        Swal.fire(
                            'Published!',
                            'The Exam has been published.',
                            'success'
                        );
                    } else {
                        Swal.fire('Error!', 'There was an issue publishing your exam.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue publishing your exam.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Published!',
                    'The Test has been published.',
                    'success'
                );
            }
        });
    };


    // const status = useMemo(() => {
    //     const now = Date.now();
    //     const start_date = new Date(test?.startDate);
    //     const end_date = new Date(test?.endDate);
        
    //     if (start_date.getTime() <= now && now <= end_date.getTime()) {
    //         return "In Progress";
    //     }

    //     if (now > end_date.getTime()) {
    //         return "Ended";
    //     }

    //     return "Upcoming";
    // }, [test.startDate, test.endDate]);

    function getStatus(record){
        const now = Date.now();
        const start_date = new Date(record?.startDate);
        const end_date = new Date(record?.endDate);
        const status = (() => {
            if (start_date.getTime() <= now && now <= end_date.getTime()) {
                return "In Progress";
            }
            if (now > end_date.getTime()) {
                return "Ended";
            }
            return "Upcoming";
        })();
        return status
    }

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            // width: 10,
            width: '5%',
            render: (text, record, index) => (
                <span className="text-[#313131] text-base">{(currentPage - 1) * pageSize + index + 1}</span>
            ),
        

        },
        {
            key: '2',
            title: 'Exams',
            dataIndex: 'exam',
            width: 50,
            render: (text, record, index) => {
                const status = getStatus(record);
                return (
                    <div className='flex items-start justify-between text-sm'>
                        <div className='flex flex-col gap-2'>
                            <p className="text-xl font-semibold ">
                                {record?.title}
                            </p>
                            <div>
                                {formatMomentDate(record?.startDate)} - {formatMomentDate(record?.endDate)}
                            </div>

                            <div className='inline-flex items-center gap-2'>
                                <p><span className='font-medium'>Duration (mins):</span> {getTotalMinutes(record?.durationHours, record?.durationMinutes)} </p>    
                                <p><span className='font-medium'>Total Ques:</span> {record?.totalQuestions}</p>     
                                <p><span className='font-medium'>Total Marks:</span> {record?.totalMarks}</p>
                            </div>
                        
                            <div className='inline-flex gap-2 items-center '>
                                <span className="bg-[#659be0] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                    {record?.markPerQuestion}mrk(s)/ques
                                </span>
                                {record.isPublished === 1 ? (
                                    <span className="bg-[#4ade80] text-black max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                        Published
                                    </span>
                                ) : (
                                    <span className="bg-[#F1C40F] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                        Not Published
                                    </span>
                                )}
                            </div>
                            <div className="mt-2">
                                <span className={`px-2 py-1 rounded text-xs ${status === 'In Progress' ? 'bg-green-500 text-white' : status === 'Ended' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                    {status}
                                </span>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            title: 'Action',
            key: '3',
            width: '20%',
            render: (_, record) => {
                const status = getStatus(record);
                return(
                    <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                        {record.isPublished !== 1 && status === 'Upcoming' && (
                            <button onClick={()=>publishTest(record.id)} className='btn p-1 bg-[#1c699f] border border-[#15527c] rounded text-white flex items-center'>
                                Publish
                            </button>
                        )}
                        <Link href={`/admin/test-management/create?id=${record.id}`} className='btn p-1 bg-[#acb7ca] border border-[#93a1bb] rounded text-black flex items-center'>
                            <Pen size={12}/>
                            Edit
                        </Link>
                        <button onClick={()=>deleteTest(record.id)} className='btn p-1 bg-[#e7505a] border border-[#e7505a] rounded text-white font-medium flex items-center'>
                            <Trash size={12}/>
                            Delete
                        </button>
                    </div>
                )
            },
        },
    ];

    const cancel = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            
                <div className='shadow-lg'>

                    <Flex gap="middle" vertical>
                        <Table
                            scroll={{ x: 'max-content' }}
                            // rowSelection={rowSelection} 
                            columns={columns} 
                            dataSource={tests} 
                            components={{
                                body: {
                                        // cell: EditableCell,
                                    },
                                }}
                            bordered
                            rowClassName="editable-row"
                            // pagination={{
                            //     // pageSize: 50,
                            //     onChange: (page)=>cancel(page),
                            //     pageSize: pageSize,
                            // }}
                            pagination={{
                                current: currentPage, // Current page state
                                pageSize: pageSize, // Page size state
                                pageSizeOptions: ['10', '20', '50', '100'], // Options for page size
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

                    {/* <div className="overflow-x-auto md:overflow-x-auto px-4 text-white scrollbar-change rounded-md">
                        <table className="min-w-full leading-normal table-auto overflow-x-auto relative order-table">
                            <thead className="font-normal">
                                <tr className="text-[#313131]">
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                                    >
                                        S/N
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap"
                                    >
                                        Exams
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-5 py-3 border-b border-[#363636]  text-left text-sm   whitespace-nowrap"
                                    >
                                        &nbsp;
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#A19B99] text-[#313131]">
                                {tests?.length < 1 &&
                                    <tr>
                                        <td colSpan={3} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                            <span className="text-[#313131] text-base">
                                                No data found
                                            </span>
                                        </td>
                                    </tr>
                                }
                                {tests?.length > 0 && tests?.map((test, index) => {

                                    const now = Date.now();
                                    const start_date = new Date(test?.startDate);
                                    const end_date = new Date(test?.endDate);

                                    const status = (() => {
                                        if (start_date.getTime() <= now && now <= end_date.getTime()) {
                                            return "In Progress";
                                        }
                                        if (now > end_date.getTime()) {
                                            return "Ended";
                                        }
                                        return "Upcoming";
                                    })();

                                    return(
                                        <tr key={index}>
                                            <td className="px-2 py-4 text-base whitespace-nowrap">
                                                <span className="text-[#313131] text-base">
                                                    {index + 1}
                                                </span>
                                            </td>
                                            <td className="px-2 py-4 whitespace-nowrap">
                                                <div className='flex items-start justify-between text-sm'>
                                                    <div className='flex flex-col gap-2'>
                                                        <p className="text-xl font-semibold ">
                                                            {test?.title}
                                                        </p>
                                                        <div>
                                                            {formatMomentDate(test?.startDate)} - {formatMomentDate(test?.endDate)}

                                                        </div>

                                                        <div className='inline-flex items-center gap-2'>
                                                            <p><span className='font-medium'>Duration (mins):</span> {getTotalMinutes(test?.durationHours, test?.durationMinutes)} </p>    
                                                            <p><span className='font-medium'>Total Ques:</span> {test?.totalQuestions}</p>     
                                                            <p><span className='font-medium'>Total Marks:</span> {test?.totalMarks}</p>
                                                        </div>
                                                    
                                                        <div className='inline-flex gap-2 items-center '>
                                                            <span className="bg-[#659be0] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                                2mrk(s)/ques
                                                            </span>
                                                            {test.isPublished === 1 ? (
                                                                <span className="bg-[#4ade80] text-black max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                                    Published
                                                                </span>
                                                            ) : (
                                                                <span className="bg-[#F1C40F] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                                    Not Published
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="mt-2">
                                                            <span className={`px-2 py-1 rounded text-xs ${status === 'In Progress' ? 'bg-green-500 text-white' : status === 'Ended' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                                                                {status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    

                                                </div>
                                                
                                            </td>
                                            <td className="px-2 py-4 text-sm whitespace-nowrap">
                                                <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                                {test.isPublished !== 1 && status === 'Upcoming' && (
                                                    <button onClick={()=>publishTest(test.id)} className='btn p-1 bg-[#1c699f] border border-[#15527c] rounded text-white flex items-center'>
                                                        Publish
                                                    </button>
                                                )}
                                                    <Link href={`/admin/test-management/create?id=${test.id}`} className='btn p-1 bg-[#acb7ca] border border-[#93a1bb] rounded text-black flex items-center'>
                                                        <Pen size={12}/>
                                                        Edit
                                                    </Link>
                                                    <button onClick={()=>deleteTest(test.id)} className='btn p-1 bg-[#e7505a] border border-[#e7505a] rounded text-white font-medium flex items-center'>
                                                        <Trash size={12}/>
                                                        Delete
                                                    </button>
                                                </div>
                                                
                                            </td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div> */}
                </div>
        </>
    );
};

export default ExamsListTable
