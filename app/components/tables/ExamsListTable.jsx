import React from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { PenTool, Trash } from 'iconsax-react';
import { Pen } from 'lucide-react';

const ExamsListTable = ({ questions = []}) => {
    return (
        <>
            
                <div className='shadow-lg'>
                    <div className="overflow-x-auto md:overflow-x-auto px-4 text-white scrollbar-change rounded-md">
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
                                {questions?.map((question, index) => (
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
                                                        {question.question}
                                                    </p>
                                                    <div>
                                                        Mon Apr 8th, 24 12:00am - Wed Apr 17th, 24 6:00pm
                                                    </div>

                                                    <div className='inline-flex items-center gap-2'>
                                                        <p><span className='font-medium'>Duration (mins):</span> 180 </p>    
                                                        <p><span className='font-medium'>Total Ques:</span> 31</p>     
                                                        <p><span className='font-medium'>Total Marks:</span> 100</p>
                                                    </div>
                                                 
                                                    <div className='inline-flex gap-2 items-center '>
                                                        <span className="bg-[#659be0] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                            2mrk(s)/ques
                                                        </span>
                                                        <span className="bg-[#F1C40F] text-white max-w-fit px-1 py-1 rounded text-xs inline-flex items-center gap-2 ">
                                                            Not Published
                                                        </span>
                                                    </div>
                                                </div>
                                                

                                            </div>
                                            
                                        </td>
                                        <td className="px-2 py-4 text-sm whitespace-nowrap">
                                            <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                                <button className='btn p-1 bg-[#1c699f] border border-[#15527c] rounded text-white flex items-center'>
                                                    Publish
                                                </button>
                                                <Link href={'/admin/test-management/'+question.id} className='btn p-1 bg-[#acb7ca] border border-[#93a1bb] rounded text-black flex items-center'>
                                                    <Pen size={12}/>
                                                    Edit
                                                </Link>
                                                <button className='btn p-1 bg-[#e7505a] border border-[#e7505a] rounded text-white font-medium flex items-center'>
                                                    <Trash size={12}/>
                                                    Delete
                                                </button>
                                            </div>
                                            
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
};

export default ExamsListTable
