'use client';

import Link from 'next/link';
import Image from 'next/image';

export const successtoastOptions = {
  duration: 8000,
  // position: 'top',
  style: {},
  className: '',
  // Custom Icon
  icon: '👏',
  // Change colors of success/error/loading icon
  iconTheme: {
    primary: 'red',
    secondary: '#fff',
  },
  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
};

export const questionTypes = [
  {
      description: "An option type where you can choose on in the list of options", 
      id: 1, 
      title: "Multiple Choice Single Answer"
  },
  {
      description: "An option type where one can select multiple answer", 
      id: 2, 
      title: "Multiple Selection"
  },
  {
      description: "An option type where explanations are required as answer.", 
      id: 3, 
      title: "Subjective Question"
  },
  {
      description: "An option type where one can give their own answer", 
      id: 4, 
      title: "Theoretical Question"
  },
]

export const questionDifficulty = [
  {
      description: "An option type where you can choose on in the list of options", 
      id: 1, 
      title: "Easy"
  },
  {
      description: "An option type where you can choose on in the list of options", 
      id: 2, 
      title: "Medium"
  },
]

export const counts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26
  , 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59];

export const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris",
      options: ["New York", "London", "Paris", "Tokyo"],
      correctAnswer: "Paris"
    },
    {
      id: 2,
      question: "Who won the Nobel Prize in Literature in 2020?",
      answer: "Jane Austen",
      options: ["Jane Austen", "George Orwell", "Stephen King", "J.K. Rowling"],
      correctAnswer: "Jane Austen"
    }
  ]

