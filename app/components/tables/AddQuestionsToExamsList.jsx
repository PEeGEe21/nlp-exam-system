import React from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { Add } from 'iconsax-react';

const AddQuestionsToExamsList = ({ questions = []}) => {
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
                                    Questions
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b border-[#363636]  text-left text-sm   whitespace-nowrap"
                                >
                                    &nbsp;
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#A19B99]">
                            {questions.length < 1 &&
                                <tr>
                                    <td colSpan={3} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                        <span className="text-[#313131] text-base">
                                            No data found
                                        </span>
                                    </td>
                                </tr>
                            }
                            {questions?.map((question, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-4 text-base whitespace-nowrap">
                                        <span className="text-[#313131] text-base">
                                            {index + 1}
                                        </span>
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap">
                                        <div>
                                            <div>
                                                <p className="text-base text-[#313131]">
                                                    {question.question}
                                                </p>
                                            </div>

                                            <div className="bg-[#bac3d0] text-[#000000de] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 ">
                                                EASY
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td className="px-2 py-4 text-sm whitespace-nowrap">
                                        <div className="text-[#313131] text-xs flex items-center gap-2 flex-row">
                                            <button className='rounded-md px-2 py-1 bg-blue-gray-800 text-white flex items-center'>
                                                <Add size={14}/>
                                                Add
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

export default AddQuestionsToExamsList
