import React, { useMemo, useState } from 'react'
import EmptyState from '../EmptyState';
import Link from 'next/link';
import { Add, Minus, Refresh, SearchNormal1 } from 'iconsax-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { addQuestionToExam, getQuestions, shortenTitle, shortenTitle2 } from '@/app/lib/utils';

const AddQuestionsToExamsList = ({test, questions = [], setQuestions, reload }) => {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [isAddingMark, setIsAddingMark] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [questionMarks, setQuestionMarks] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    // Function to handle input change
    const handleChange = (e, questionTestId) => {
        setQuestionMarks((prev) => ({
          ...prev,
          [questionTestId]: e.target.value,
        }));
      };
    
  
    const setQuestionToExam = async (question, question_id) => {

        setCurrentQuestion(question);
        const updatedQuestions = questions.map(q => 
            q.id === question_id ? { ...q, is_added: !q.is_added } : q
        );
        setQuestions(updatedQuestions);

        try {

            const payload = {
                is_added: !question.is_added ? 1 : 0,
            };

            question.is_added = !question.is_added;

            
    
            const response = await addQuestionToExam(test.id, question, payload);
            if (response.data.success) {

                if(!response.data.is_added){
                    question.question_test_mark = 0;
                }
                // question.is_added = response.data.is_added;
                // const updatedQuestions = await getQuestions();
                // setQuestions(updatedQuestions);
                const revertedQuestions = questions.map(q =>
                    q.id === question_id ? { ...q, is_added: question.is_added, question_test_mark:  question.question_test_mark} : q
                );
                setQuestions(revertedQuestions);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.log(err, 'err');
            toast.error(err.message);
        }
    };

    const handleSave = async (question_id, question_test_id) => {
        setLoading(true);
        try {
            const mark = questionMarks[question_id];
          // Make the API request to update the question mark
          const response = await axios.post(`http://localhost:3001/api/tests/${test.id}/${question_id}/mark`, {
            mark,
          });
    
          // Handle success response
          if (response.data.success) {
            toast.success('Question mark updated successfully!');
            reload();
          }
        } catch (error) {
          console.error('Error updating question mark:', error.message);
          toast.error('Failed to update question mark.');
        } finally {
            setLoading(false);

            setIsAddingMark((prev) => ({
                ...prev,
                [question_id]: false,
            }));
        }
      };
    

    const filteredAllQuestions = useMemo(() => {
        if (searchQuery && questions?.length > 0) {
          const filtered = questions.filter((launch) =>
            launch?.question?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          );
          return filtered;
        }
        return questions;
    }, [searchQuery, questions]);

    const handleCancel = (questionTestId) => {
        // setQuestionMarks((prev) => ({
        //   ...prev,
        //   [questionTestId]: 0,
        // }));

        setIsAddingMark((prev) => ({
          ...prev,
          [questionTestId]: false,
        }));
      };

    const toggleIsAddingMark = (questionTestId, currentMark) => {
        setIsAddingMark((prev) => ({
          ...prev,
          [questionTestId]: true,
        }));

        setQuestionMarks((prev) => ({
            ...prev,
            [questionTestId]: currentMark,
          }));
    };

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-3 lg:flex-nowrap">
                <div className="flex items-center w-full gap-2">
                  <div className=" relative rounded-full  items-center w-full max-w-[563px] h-10 ">
                    <div className="absolute inset-y-0 left-0 flex items-center h-full pl-1 pointer-events-none">
                      <span className="px-3 text-gray-500">
                        <SearchNormal1 size={22} />
                      </span>
                    </div>
                    <input
                      type="text"
                      name="search"
                      id="search"
                      value={searchQuery}
                      onChange={(event) => {
                        const value = event.target.value;
                        setSearchQuery(value);
                      }}
                      className="border border-[#3B3939] py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none bg-transparent text-[#000000de]"
                      placeholder="Search"
                    />
                  </div>
                </div>

                {/* <div className="flex items-center justify-end gap-2">
                  <button 
                    className={` border border-[#303132] hover:text-white hover:bg-[#303132] p-2 rounded-md text-[#303132] h-10 w-10 flex items-center justify-center`}
                  >
                    <Refresh size={16} />

                 </button>
                </div> */}
              </div>

            <div className='shadow-lg'>
                <div className="overflow-x-auto md:overflow-x-auto px-4 text-white scrollbar-change rounded-md">
                    <table className="min-w-full leading-normal table-auto overflow-x-auto relative order-table">
                        <thead className="font-normal">
                            <tr className="text-[#313131]">
                                <th
                                    scope="col"
                                    className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap w-1/12"
                                >
                                    S/N
                                </th>
                                <th 
                                    
                                    scope="col"
                                    className="px-5 py-3  border-b border-[#363636]   text-left text-sm   whitespace-nowrap w-8/12"
                                >
                                    Questions
                                </th>
                                <th
                                    scope="col"
                                    className="px-5 py-3 border-b border-[#363636]  text-left text-sm   whitespace-nowrap w-3/12"
                                >
                                    &nbsp;
                                </th>

                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#A19B99]">
                            {filteredAllQuestions.length < 1 &&
                                <tr>
                                    <td colSpan={3} className="px-2 py-4 text-base whitespace-nowrap text-center">
                                        <span className="text-[#313131] text-base">
                                            No data found
                                        </span>
                                    </td>
                                </tr>
                            }
                            {filteredAllQuestions?.map((question, index) => (
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
                                                    <b>
                                                        {shortenTitle2(question?.questionPlain ? question?.questionPlain : question?.question)}
                                                    </b>
                                                </p>
                                            </div>

                                            <div className="bg-[#bac3d0] text-[#000000de] max-w-fit px-3 py-1 rounded-3xl text-xs inline-flex items-center gap-2 mt-2 ">
                                                {question?.difficulty?.title}
                                            </div>
                                        </div>
                                        
                                    </td>
                                    <td className="px-2 py-4 text-sm whitespace-nowrap flex items-center justify-end h-full">
                                        <div className="text-[#313131] text-xs flex items-center gap-2 flex-row">
                                            <div>

                                                {isAddingMark[question.id]  && question.is_added ? 
                                                    <div className='inline-flex' >
                                                        <input 
                                                            type="number" 
                                                            className="border border-[#303132]  p-2  text-[#303132] h-8 focus:outline-none" 
                                                            value={questionMarks[question.id] ?? question.question_test_mark}
                                                            onChange={(e) =>
                                                                handleChange(e, question.id)
                                                            }
                                                            disabled={loading}

                                                        />
                                                        <button
                                                            className="px-2 py-1 bg-[#303132] text-white flex items-center h-8"
                                                            onClick={()=>handleSave(question.id, question.question_test_id)}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            className="px-2 py-1 bg-red-900 text-white flex items-center h-8"
                                                            onClick={() => handleCancel(question.id)}
                                                            >
                                                            Cancel
                                                        </button>
                                                    </div> :
                                                    <button 
                                                        onClick={() => toggleIsAddingMark(question.id, question.question_test_mark)}
                                                        disabled={!question.is_added} 
                                                        className={`px-2 py-1 bg-[#303132] text-white flex items-center justify-center h-8 rounded min-w-20 text-sm ${!question.is_added ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                                            { question.question_test_mark??0 } marks
                                                    </button>
                                                }
                                            </div>
                                            <button 
                                                onClick={()=>setQuestionToExam(question, question.id)} className={`rounded px-2 py-1 min-w-20 text-sm ${question.is_added? 'bg-red-900' : 'bg-[#5cb85c] border-[#4cae4c]'} text-white flex items-center justify-center h-8`}>
                                                {question.is_added ? 
                                                    <> 
                                                        <Minus size={18}/>
                                                            Added
                                                    </> 
                                                : <> 
                                                        <Add size={16}/>
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
