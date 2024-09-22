import React, { useState } from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { Add, Minus } from 'iconsax-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { addQuestionToExam, getQuestions } from '@/app/lib/utils';

const AddQuestionsToExamsList = ({test, questions = [], setQuestions}) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const setQuestionToExam = async (question, question_id) => {

        setCurrentQuestion(question);
        const updatedQuestions = questions.map(q => 
            q.id === question_id ? { ...q, is_added: !q.is_added } : q
          );
        setQuestions(updatedQuestions);

        try {

            const payload = {
                is_added: !question.is_added ? 0 : 1,
            };

            question.is_added = !question.is_added;
    
            const response = await addQuestionToExam(test.id, question, payload);
            if (response.success) {
                // question.is_added = response.data.is_added;
                const updatedQuestions = await getQuestions();
                // setQuestions(updatedQuestions);
                const revertedQuestions = questions.map(q =>
                    q.id === question_id ? { ...q, is_added: question.is_added } : q
                );
                setQuestions(revertedQuestions);
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (err) {
          console.log(err, 'err');
          toast.error(err.message);
        }
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
                                            <button onClick={()=>setQuestionToExam(question, question.id)} className={`rounded-md px-2 py-1 ${question.is_added? 'bg-red-900' : 'bg-blue-gray-800'} text-white flex items-center`}>
                                                {question.is_added ? 
                                                    <> 
                                                        <Minus size={14}/>
                                                            Added
                                                    </> 
                                                : <> 
                                                        <Add size={14}/>
                                                        Add
                                                    </>
                                                }
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
