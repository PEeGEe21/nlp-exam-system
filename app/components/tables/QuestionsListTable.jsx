import React, {useState} from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { Trash } from 'iconsax-react';
import { IdCardIcon, Pen } from 'lucide-react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { capitalize, hostUrl } from '@/app/lib/utils';
import { Flex, Table } from 'antd';

const QuestionsListTable = ({ questions = [], setQuestions}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Default page size

    const deleteQuestion = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            text: 'You are about to delete a question!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete',
            allowOutsideClick: () => !Swal.isLoading(), // Prevent clicking outside modal during loading
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await axios.delete(hostUrl + `questions/delete/${id}`);
                    if (response.success){
                        Swal.fire(
                            'Deleted!',
                            'The Question has been deleted.',
                            'success'
                        );
                    } else {
                        Swal.fire('Error!', 'There was an issue deleting your question.', 'error');
                    }
                } catch (err) {
                    console.error(err);
                    Swal.fire('Error!', 'There was an issue deleting your question.', 'error');
                    throw err; 
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
                Swal.fire(
                    'Deleted!',
                    'The Question has been deleted.',
                    'success'
                );
            }
        });
    };

    const columns = [
        {
            title: '#',
            dataIndex: 'key',
            key:'index',
            // width: 10,
            width: '5%',
            render: (text, record, index) => (
                <a>{(currentPage - 1) * pageSize + index + 1}</a>
            ),
        

        },
        {
            key: '2',
            title: 'Questions',
            dataIndex: 'question',
            width: 50,
            render: (text, record, index) => (
                <div>
                    <div>
                        <p className="text-base text-[#313131]">
                            {record?.questionPlain ? capitalize(record?.questionPlain) : record?.question}
                        </p>
                    </div>

                    <div className="bg-[#bac3d0] text-[#000000de] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 ">
                        {record?.difficulty?.title}
                    </div>
                </div>
            ),
        },
        {
            title: 'Action',
            key: '3',
            width: '20%',
            render: (_, record) => (
                <div className="text-[#313131] text-xs flex items-center justify-end gap-2 pr-3 flex-row">
                    <Link href={`/admin/question-bank/create?id=${record.id}`} className='flex items-center rounded-md bg-[#acb7ca] border border-[#93a1bb] text-black px-2 py-1 '>
                        <Pen size={12}/>
                        Edit
                    </Link>
                    <button onClick={()=>deleteQuestion(record.id)} className='btn p-1 bg-[#e7505a] border border-[#e7505a] rounded text-white font-medium flex items-center'>
                        <Trash size={12}/>
                        Delete
                    </button>
                </div>
            ),
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
                        dataSource={questions} 
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
                            {questions?.length < 1 &&
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
                                                    {question?.questionPlain ? capitalize(question?.questionPlain) : question?.question}
                                                </p>
                                            </div>

                                            <div className="bg-[#bac3d0] text-[#000000de] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 ">
                                                {question?.difficulty?.title}
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td className="px-2 py-4 text-sm whitespace-nowrap">
                                        <div className="text-[#313131] text-xs flex items-center justify-end gap-2 pr-3 flex-row">
                                            
                                            <Link href={`/admin/question-bank/create?id=${question.id}`} className='flex items-center rounded-md bg-[#acb7ca] border border-[#93a1bb] text-black px-2 py-1 '>
                                                <Pen size={12}/>
                                                Edit
                                            </Link>
                                            <button onClick={()=>deleteQuestion(question.id)} className='btn p-1 bg-[#e7505a] border border-[#e7505a] rounded text-white font-medium flex items-center'>
                                                <Trash size={12}/>
                                                Delete
                                            </button>
                                        </div>
                                        
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
            </div>
        </>
    );
};

export default QuestionsListTable
