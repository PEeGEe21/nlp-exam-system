import React from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';

const QuestionsListTable = ({ questions = []}) => {
    return (
        <div>
            
                <>
                    <div className="overflow-x-auto md:overflow-x-auto px-4 text-white scrollbar-change">
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
                                {questions?.map((question, index) => (
                                    <tr key={index}>
                                        <td className="px-2 py-4 text-base whitespace-nowrap">
                                            <span className="text-[#313131] text-base">
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="px-2 py-4 whitespace-nowrap">
                                            <p className="text-base text-[#313131]">
                                                {question.question}
                                            </p>
                                        </td>
                                        <td className="px-2 py-4 text-sm whitespace-nowrap">
                                            <div className="text-[#313131] text-sm flex items-center gap-2 flex-row">
                                                <Link href={'/admin/question-bank/'+question.id}>
                                                    Edit
                                                </Link>
                                                <button>
                                                    Preview
                                                </button>
                                            </div>
                                            
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
        </div>
    );
};

export default QuestionsListTable
