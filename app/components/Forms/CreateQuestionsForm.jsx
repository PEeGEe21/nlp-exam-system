"use client"
import { questionDifficulty, questionTypes } from '@/app/lib/constants';
import { Add, Trash } from 'iconsax-react';
import React, { useEffect, useState, useMemo } from 'react'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";


const CreateQuestionsForm = ({ questions, questionToEdit }) => {
    const [questionType, setQuestionType] = useState("");
    const [question, setQuestion] = useState("");
    const [qDifficulty, setQDifficulty] = useState(0);
    const [answers, setAnswers] = useState([]);

    const [richTextOptions, setRichTextOptions] = useState(false);
    const [inputs, setInputs] = useState({
        title: '',
        difficultyType: '',
        question_type: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    
    useEffect(()=>{
        if (questionToEdit) {
            setIsEditing(true);
            setQuestionType(questionToEdit.questionType);
            setQuestion(questionToEdit.question);
            setQDifficulty(questionToEdit.qDifficulty);
            setAnswers(questionToEdit.answers || []);
          } else {
            setIsEditing(false);
            setQuestionType("");
            setQuestion("");
            setQDifficulty(0);
            setAnswers([
                {
                    id: 1,
                    content: "",
                    isCorrect: false
                },
                {
                    id: 2,
                    content: "",
                    isCorrect: false
                },
            ])
            }
    }, [questionToEdit]);

    const updateAnswerContent = (id, newContent) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer.id === id
                    ? { ...answer, content: newContent }
                    : answer
            )
        );
    };

    const selectCorrectOption = (id) => {
        setAnswers(prevAnswers =>
            prevAnswers.map(answer =>
                answer.id === id
                    ? { ...answer, isCorrect: !answer.isCorrect }
                    : { ...answer, isCorrect: false }
            )
        );
    };

    const deleteOption = (id) => {
        setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== id));
    };

    const addOption = () => {
        const newOption = {
            id: answers.length + 1,
            content: "",
        };
        setAnswers((prev) => [...prev, newOption]);
        console.log('clicked');
        console.log(answers, 'clicked');
    };

    const handleSubmit = () => {
        if (isEditing) {
          // Call API to update the question
          console.log("Updating question:");
        } else {
          // Call API to create a new question
          console.log("Creating question:");
        }
      };

    return (
      <>
        <div className="py-6">
            <div className="shadow-md border border-black px-5 py-4 rounded-lg text-gray-900 bg-white">
                <div>
                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nouniquewrap">
                        <div className="relative flex flex-col w-full gap-1 mb-6 ">
                            <label
                                htmlFor="question_type"
                                className="text-lg mb-1 font-medium"
                            >Question Type</label>
                            <select
                                id="question_type"
                                className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                name="question_type"
                                value={questionType}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setQuestionType(value);
                                }}
                            >
                                <option value={''}>
                                        select an option
                                </option>
                                {questionTypes.map((item, index) => (
                                    <option key={index} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                        <div className="relative flex flex-col w-full gap-1 mb-6">
                            <label
                                htmlFor="description"
                                className="text-lg mb-1 font-medium"
                            >Question</label>
                            <ReactQuill
                                theme="snow"
                                value={question}
                                onChange={(value) => {
                                    setQuestion(value);
                                }}
                                className="border border-[#464849] h-auto min-h-72"
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <label
                                htmlFor="difficulty_level"
                                className="text-lg mb-1  font-medium"
                            >Difficulty Level</label>
                            <select
                                id="difficulty_level"
                                className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                name="difficulty_level"
                                value={qDifficulty}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setQDifficulty(value);
                                }}
                            >
                                <option value={0}>Select Difficulty Level</option>
                                {questionDifficulty.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(questionType == 1) &&
                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                            <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                <div className='flex items-center justify-between'>
                                    <label
                                        htmlFor="token_name"
                                        className="text-lg mb-1 font-medium"
                                    >Question Options</label>
                                    {/* <span onClick={()=>(setRichTextOptions(!richTextOptions))} className='text-blue-600 cursor-pointer'>
                                        rich text
                                    </span> */}
                                </div>
                                <div>
                                    {questionType == 1 ?
                                        <div>
                                            {(answers).map((answer, index)=>(
                                                <div key={answer.id} className="relative flex flex-row w-full gap-4 mb-6  whitespace-nowrap items-center">
                                                    <label
                                                        htmlFor={`name-${index}`}
                                                        className="text-sm mb-1"
                                                    >
                                                        Option {index+1}
                                                    </label>
                                                    <input
                                                            type="text"
                                                            id={`name-${index}`}
                                                            className="block px-2 w-full text-sm text-gray-800 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent disabled:bg-[#3E3D3C] h-12 rounded-md focus:outline-0"
                                                            name="name"
                                                            value={answer.content}
                                                            required
                                                            autoComplete="off"
                                                            onChange={(e) => updateAnswerContent(answer.id, e.target.value)}
                                                        />
                                                    <input
                                                        type="checkbox"
                                                        name="correctOption"
                                                        checked={answer.isCorrect || false}
                                                        onChange={() => selectCorrectOption(answer.id)}
                                                    />
                                                    <button
                                                        onClick={() => deleteOption(answer.id)}
                                                        disabled={answers.length <= 2}
                                                        className="ml-2 p-2 bg-red-500 text-white rounded cursor-pointer"
                                                    >
                                                        <Trash size={14}/>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    : ""
                                    }  
                                    <div className='flex items-center justify-end w-full'>
                                        <button
                                            onClick={addOption}
                                            type={"button"}
                                            className="bg-[#008080] disabled:cursor-wait hover:bg-[#008080] min-w-[100px] whitespace-nowrap w-full md:w-auto
                                            disabled:opacity-50 rounded-lg 
                                            transition-all duration-75 border-none px-5 
                                            font-medium p-3 text-white block text-sm inline-flex items-center gap-1"
                                        >
                                            <Add size={14}/> Add option
                                        </button>
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                    }
                    

                    
                    
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-end w-full gap-3 mt-4">
                <button
                    // onClick={handleNext}
                    type={"button"}
                    className="bg-[#008080] disabled:cursor-wait hover:bg-[#008080] min-w-[200px] whitespace-nowrap w-full md:w-auto
                    disabled:opacity-50 rounded-lg 
                    transition-all duration-75 border-none px-5 
                    font-medium p-3 text-base text-white block"
                >
                    Submit
                </button>
            </div>
        
        </div>
    </>
  )
}

export default CreateQuestionsForm
