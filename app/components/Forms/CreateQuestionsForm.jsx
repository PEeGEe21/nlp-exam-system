"use client"
import { questionDifficulty, questionTypes, questions } from '@/app/lib/constants';
import { Add, Trash } from 'iconsax-react';
import React, { useEffect, useState, useMemo } from 'react'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateQuestionsForm = ({id}) => {
    const [questionType, setQuestionType] = useState("");
    const [question, setQuestion] = useState("");
    const [qDifficulty, setQDifficulty] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [questionToEdit, setQuestionToEdit] = useState(null)
    const router = useRouter();

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);


    useEffect(()=>{
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await fetch(`http://localhost:3001/api/questions/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.question
                        console.log(result)

                        setQuestionToEdit(result);
                        setIsEditing(true);
                        setQuestionType(result.optionTypeId);
                        setQuestion(result.question);
                        setQDifficulty(result.difficultyId);
                        setAnswers(result.answers || []);
                    } else {
                        throw new Error('Failed to fetch the question');
                    }
                } catch (err) {
                    console.error('Error fetching data:', err?.message);
                }
            } else {
                setIsEditing(false);
                resetForm();
            }
        };

        fetchData();
    }, [id]);

    const resetForm = () => {
        setQuestionType("");
        setQuestion("");
        setQDifficulty(0);
        setAnswers([
            { id: 1, content: "", isCorrect: false },
            { id: 2, content: "", isCorrect: false },
        ]);
    };

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

    const deleteOption = async (id) => {
        console.log("Deleting option with ID:", id);
        if (id > 0) {
            try {
                console.log("Deleting from db");
                const response = await axios.delete(`http://localhost:3001/api/questions/delete-answer/${id}`);
                if (response.status >= 200 && response.status < 300 ) {
                    console.log("Answer successfully deleted from the database");
                    setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== id));
                } else {
                    console.error("Failed to delete answer");
                }
            } catch (err) {
                console.error("Error deleting answer from the database:", err);
            }
        } else {
            setAnswers(prevAnswers => prevAnswers.filter(answer => answer.id !== id));
            console.log("Answer successfully deleted from local state");
        }
    };
    

    const addOption = () => {
        const newOption = {
            id: -Math.abs(answers.length + 1),
            content: "",
            isCorrect: false,
        };
    
        setAnswers((prev) => [...prev, newOption]);
    };
    
    
    const handleSubmit = async () => {
        const data = {
            userId: 2,
            difficultyId: qDifficulty,
            optionTypeId: questionType,
            question: question,
            answers: answers
        }

        if (isEditing) {
          // Call API to update the question
            console.log("Updating question:");

            try {

                const response = await axios.put(`http://localhost:3001/api/questions/edit/${id}`, data);
                if (response.data.success){
                    setError('');
                    setSuccess('Question updated successfully!');
                }
            } catch (err) {
                setSuccess('');
                setError('Failed to update question. Please try again.');
                console.error(err);
            }

        } else {
            console.log("Creating question: " + question);
            
            try {
                const response = await axios.post('http://localhost:3001/api/questions/create', data);
                if (response.data.success){
                    setError('');
                    setSuccess('Question added successfully!');
                    router.push('/admin/question-bank');
                }
            } catch (err) {
                setSuccess('');
                setError('Failed to add question. Please try again.');
                console.error(err);
            }
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
                                required
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
                                required
                                value={question}
                                onChange={(value) => {
                                    setQuestion(value);
                                    console.log(question)
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
                                required
                                value={qDifficulty}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    setQDifficulty(value);
                                }}
                            >
                                <option value={0}>Select Difficulty Level</option>
                                {questionDifficulty.map((item, index) => (
                                    <option key={index} value={item.id}>
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
                                </div>
                                <div>
                                    {questionType == 1 ?
                                        <div>
                                            {(answers).map((answer, index)=>(
                                                <div key={index} className="relative flex flex-row w-full gap-4 mb-6  whitespace-nowrap items-center">
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
                <div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
            </div>
            <div className="flex flex-wrap items-center justify-between w-full gap-3 mt-4">
                <button
                    onClick={() => router.back()}
                    type={"button"}
                    className="bg-red-900 disabled:cursor-wait hover:bg-red-900 min-w-[200px] whitespace-nowrap w-full md:w-auto
                    disabled:opacity-50 rounded-lg 
                    transition-all duration-75 border-none px-5 
                    font-medium p-3 text-base text-white block"
                >
                    Close
                </button>

                <button
                    onClick={handleSubmit}
                    type={"button"}
                    className="bg-[#008080] disabled:cursor-wait hover:bg-[#008080] min-w-[200px] whitespace-nowrap w-full md:w-auto
                    disabled:opacity-50 rounded-lg 
                    transition-all duration-75 border-none px-5 
                    font-medium p-3 text-base text-white block"
                >
                    {isEditing ? "Update" : "Create"}
                    </button>
            </div>
        
        </div>
    </>
  )
}

export default CreateQuestionsForm
