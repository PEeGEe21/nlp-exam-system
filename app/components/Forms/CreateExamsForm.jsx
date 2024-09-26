"use client"
import { counts, tests } from '@/app/lib/constants';
import { Add, Trash } from 'iconsax-react';
import React, { useEffect, useState, useMemo } from 'react'
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Switch } from "@chakra-ui/switch"
import { useSearchParams } from 'next/navigation';
import { LoaderIcon } from '../ui/IconComponent';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateExamsForm = ({testToEdit, id}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [examTitle, setExamTitle] = useState("");
    const [examCode, setExamCode] = useState("");
    const [questionMark, setQuestionMark] = useState(0);
    const [examDescription, setExamDescription] = useState("");
    const [startDateTime, setStartDateTime] = useState("2023-09-24T14:30");
    const [endDateTime, setEndDateTime] = useState("2023-09-24T14:30");
    const [examDurationHr, setExamDurationHr] = useState(0);
    const [examDurationMin, setExamDurationMin] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);

    useEffect(()=>{
        const fetchData = async () => {
            if (id) {
                try {
                    const res = await fetch(`http://localhost:3001/api/tests/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        const result = data.test
                        console.log(result)
                        const sDateString = result.startDate;
                        const sFormattedDate = sDateString.slice(0, 16);

                        const eDateString = result.endDate;
                        const eFormattedDate = eDateString.slice(0, 16);

                        setIsEditing(true);
                        setExamTitle(result.title);
                        setExamCode(result.code);
                        setQuestionMark(result.markPerQuestion);
                        setExamDescription(result.instructions);
                        setStartDateTime(sFormattedDate)
                        setEndDateTime(eFormattedDate)
                        setExamDurationHr(result.durationHours)
                        setExamDurationMin(result.durationMinutes)
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
        setIsLoading(false);

    }, [testToEdit, id]);

    const resetForm = () => {
        setExamTitle("");
        setExamCode("");
        setQuestionMark(0);
        setExamDescription("");
        setStartDateTime("2023-09-24T14:30");
        setEndDateTime("2023-09-24T14:30");
        setExamDurationHr(0)
        setExamDurationMin(0)
    };

    const handleSubmit = async () => {
        const sDateToSend = new Date(startDateTime);
        const eDateToSend = new Date(endDateTime);

        const sIsoDate = sDateToSend.toISOString();
        const eIsoDate = eDateToSend.toISOString();

        const data = {
            userId: 1,
            markPerQuestion: questionMark,
            title: examTitle,
            code: examCode,
            durationHours: examDurationHr,
            durationMinutes: examDurationMin,
            startDate: sIsoDate,
            endDate: eIsoDate,
            instructions: examDescription
        }
        if (isEditing) {
            console.log("Updating exam");
            try {

                const response = await axios.put(`http://localhost:3001/api/tests/edit/${id}`, data);
                if (response.data.success){
                    setError('');
                    setSuccess('Exam updated successfully!');
                }
            } catch (err) {
                setSuccess('');
                setError('Failed to update exam. Please try again.');
                console.error(err);
            }
        } else {
            console.log("Creating exam:");
            
            try {
                const response = await axios.post('http://localhost:3001/api/tests/create', data);
                if (response.data.success){
                    setError('');
                    setSuccess('Exam added successfully!');
                    router.push('/admin/test-management');
                }
            } catch (err) {
                setSuccess('');
                setError('Failed to add exam. Please try again.');
                console.error(err);
            }
        }
    };

    return (
    <>
        {!isLoading ? 

            <div className="py-6">
                <div className="shadow-md border border-black px-5 py-4 rounded-lg text-gray-900 bg-white">
                    <div>
                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                            <div className="relative flex flex-col w-full gap-1 mb-6 ">
                                <label
                                    htmlFor="type"
                                    className="text-lg mb-1 font-medium"
                                >Title</label>
                                <input
                                    id="title"
                                    className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-10 rounded-md focus:outline-0"
                                    name="title"
                                    type='text'
                                    required
                                    value={examTitle}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setExamTitle(value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                            <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                <label
                                    htmlFor="code"
                                    className="text-lg mb-1 font-medium"
                                >Code</label>
                                <input
                                    id="code"
                                    className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-10 rounded-md focus:outline-0"
                                    name="code"
                                    type='text'
                                    required
                                    value={examCode}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setExamCode(value);
                                    }}
                                />
                            </div>

                            <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                <label
                                    htmlFor="marks_per_question"
                                    className="text-lg mb-1 font-medium"
                                >Marks per question</label>
                                <input
                                    id="marks_per_question"
                                    className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-10 rounded-md focus:outline-0"
                                    name="marks_per_question"
                                    type='number'
                                    required
                                    value={questionMark}                       
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setQuestionMark(value);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                            <div className="relative flex flex-col w-full gap-1 mb-6">
                                <label
                                    htmlFor="instruction"
                                    className="text-lg mb-1 font-medium"
                                >Instruction</label>
                                <ReactQuill
                                    theme="snow"
                                    required
                                    value={examDescription}
                                    onChange={(value) => {
                                        setExamDescription(value);
                                    }}
                                    className="border border-[#464849] h-auto min-h-72"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                            <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                <label
                                    htmlFor="start_date_time"
                                    className="text-lg mb-1 font-medium"
                                >Start Date and Time</label>
                                <input
                                    id="start_date_time"
                                    className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-10 rounded-md focus:outline-0"
                                    name="start_date_time"
                                    type='datetime-local'
                                    value={startDateTime}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setStartDateTime(value);
                                        console.log(startDateTime)
                                    }}
                                />
                            </div>
                            <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                <label
                                    htmlFor="end_date_time"
                                    className="text-lg mb-1 font-medium"
                                >End Date and Time</label>
                                <input
                                    id="end_date_time"
                                    className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-10 rounded-md focus:outline-0"
                                    name="end_date_time"
                                    type='datetime-local'
                                    value={endDateTime}
                                    onChange={(event) => {
                                        const value = event.target.value;
                                        setEndDateTime(value);
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                className="text-lg mb-2 font-medium"
                            >Duration
                            </label>
                            <div className="flex flex-wrap items-center w-full gap-5 lg:flex-nowrap">
                                <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                    <label
                                        htmlFor="duration_hours"
                                        className="text-sm mb-1 font-medium"
                                    >Hours</label>
                                    <select
                                        id="duration_hours"
                                        className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                        name="duration_hours"
                                        // defaultValue={0}
                                        value={examDurationHr}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            setExamDurationHr(value);
                                        }}
                                    >
                                        {counts.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="relative flex flex-col w-full md:w-1/2 gap-1 mb-6 ">
                                    <label
                                        htmlFor="duration_minutes"
                                        className="text-sm mb-1 font-medium"
                                    >Minutes</label>
                                    <select
                                        id="duration_minutes"
                                        className="block px-2 w-full text-sm text-gray-700 border-[#464849] focus:outline-none focus:border-[#524F4D] border bg-transparent h-12 rounded-md focus:outline-0"
                                        name="duration_minutes"
                                        // defaultValue={0}
                                        value={examDurationMin}
                                        onChange={(event) => {
                                            const value = event.target.value;
                                            setExamDurationMin(value);
                                        }}
                                    >
                                        {counts.map((item, index) => (
                                            <option key={index} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-5 ">
                            <div className="relative flex flex-col w-full gap-1 mb-6 ">
                                <label
                                    htmlFor="random_questions"
                                    className="text-lg mb-1 font-medium"
                                >
                                    Shuffle Questions
                                </label>
                                <div className=''>
                                    <Switch size='lg' id='random_questions'/>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full gap-1 mb-6 ">
                                <label
                                    htmlFor="shuffle_answers"
                                    className="text-lg mb-1 font-medium"
                                >
                                    Shuffle Answer
                                </label>
                                <div className=''>
                                    <Switch size='lg' id='shuffle_answers'/>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full gap-1 mb-6 ">
                                <label
                                    htmlFor="view_correct_answers"
                                    className="text-lg mb-1 font-medium"
                                >
                                    Allow to view correct answers
                                </label>
                                <div>
                                    <Switch size='lg' id='view_correct_answers'/>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-full gap-1 mb-6 ">
                                <label
                                    htmlFor="auto_publish_result"
                                    className="text-lg mb-1 font-medium"
                                >
                                    Publish Result Automatically
                                </label>
                                <div>
                                    <Switch size='lg' id='auto_publish_result'/>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                </div>
                </div>
                <div className="flex flex-wrap items-center justify-end w-full gap-3 mt-4">
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

            : <>
                <LoaderIcon/>
            </>
        }
    </>
  )
}

export default CreateExamsForm