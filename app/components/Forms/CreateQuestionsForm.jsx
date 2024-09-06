"use client"
import { questionDifficulty, questionTypes } from '@/app/lib/constants';
import { Add, Trash } from 'iconsax-react';
import React, { useEffect, useState, useMemo } from 'react'
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

// const Quill = dynamic(() => import('react-quill'), { ssr: false })

const CreateQuestionsForm = () => {
    const [answers, setAnswers] = useState([]);
    const [richTextOptions, setRichTextOptions] = useState(false);
    const [description, setDescription] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [inputs, setInputs] = useState({
        title: '',
        difficultyType: '',
        question_type: '',
      });
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);



    //   useEffect(() => {
    //     // Set the initial selected question type
    //     setInputs((prevInputs) => ({
    //       ...prevInputs,
    //       questionType: questionTypes[0].id,
    //     }));
    //   }, []);
    
    useEffect(()=>{
        setAnswers([
            {
                id: 1,
                content: "",
            },
            {
                id: 2,
                content: "",
            },
        ])
    }, []);



    const selectCorrectOption = (id) => {
        setAnswers(answers.map((answer) => ({
            ...answer,
            isCorrect: answer.id === id,
        })));
    };

    const deleteOption = (id) => {
        if (answers.length > 2) {
            setAnswers(answers.filter((answer) => answer.id !== id));
        }
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


    
    // const handleChange = (e) => {
    //     setInputs((prev) => {
    //       return { ...prev, [e.target.name]: e.target.value };
    //     });
    //     console.log(inputs, 'inputs')
    //   };
    const handleChange = (e) => {
        setQuestionType(e.target.value)
        console.log(questionType, 'inputs')
      };

    useEffect(() => {
        console.log('clickded', questionType)
      }, [questionType]);
  return (
    <>
        <div className="py-6">
            <div className="shadow-md border border-black px-5 py-4 rounded-lg text-gray-900 bg-white">
                <div>
                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                        <div className="relative flex flex-col w-full gap-1 mb-6 ">
                            <label
                                htmlFor="question_type"
                                className="text-lg mb-1 font-medium"
                            >
                                Question Type
                            </label>

                            <select
                                id="question_type"
                                className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                name="question_type"
                                // value={questionType}
                                // onChange={handleChange}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setQuestionType(value);
                                    // console.log(questionType)
                                }}
                                // defaultValue={null}
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
                            >
                                Question
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={description}
                                onChange={setDescription}
                                className="border border-[#464849] h-auto min-h-72"
                            />
                            {/* <textarea
                                id="description"
                                className="border border-[#464849] h-auto min-h-72"
                                name="description"
                                value={description}
                                onChange={setDescription}
                                rows={15}
                                /> */}
                        </div>

                    </div>

                    <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">

                        <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                            <label
                                htmlFor="difficulty_level"
                                className="text-lg mb-1  font-medium"
                            >
                                Difficulty Level
                            </label>
                            <select
                                id="difficulty_level"
                                className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                name="difficulty_level"
                                // defaultValue={0}
                                // onChange={handleChange}
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
                    {(questionType == 1 || questionType == 2 ) &&
                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">

                            <div className="relative flex flex-col w-full gap-1 mb-6 lg:w-1/2">
                                <div className='flex items-center justify-between'>
                                    <label
                                        htmlFor="token_name"
                                        className="text-lg mb-1 font-medium"
                                    >
                                        Question Options
                                    </label>
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
                                                            // defaultValue={""}
                                                            // onChange={(e) => setName(e.target.value)}
                                                            required
                                                            autoComplete="off"
                                                        />
                                                    <input
                                                        type="checkbox"
                                                        name="correctOption"
                                                        checked={answer.isCorrect || false}
                                                        // defaultChecked={answer.isCorrect || false}
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
