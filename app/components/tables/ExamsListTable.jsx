import React, { useState } from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { PenTool, Trash } from 'iconsax-react';
import { Pen } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';

const ExamsListTable = ({ tests = [], setTests}) => {

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
                    const response = await axios.delete(`http://localhost:3001/api/tests/delete/${id}`);
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
                    const response = await axios.patch(`http://localhost:3001/api/tests/edit/${id}`, data);
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
                                {tests?.map((test, index) => (
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
                                                </div>
                                                

                                            </div>
                                            
                                        </td>
                                        <td className="px-2 py-4 text-sm whitespace-nowrap">
                                            <div className="text-[#313131] text-xs flex items-center justify-end gap-2 flex-row">
                                            {test.isPublished !== 1 && (
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
        </>
    );
};

export default ExamsListTable
