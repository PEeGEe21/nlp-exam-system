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
  // {
  //     description: "An option type where one can select multiple answer", 
  //     id: 2, 
  //     title: "Multiple Selection"
  // },
  {
      description: "An option type where explanations are required as answer.", 
      id: 2, 
      title: "Subjective Question"
  },
  {
      description: "An option type where one can give their own answer", 
      id: 3, 
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
      correctAnswer: "Paris",
      difficulty: "Medium",
      mark: "3"
    },
    {
      id: 2,
      question: "Who won the Nobel Prize in Literature in 2020?",
      answer: "Jane Austen",
      options: ["Jane Austen", "George Orwell", "Stephen King", "J.K. Rowling"],
      correctAnswer: "Jane Austen",
      difficulty: "Easy",
      mark: "3"
    }
]

export const scoredQuestions = [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "London",
      options: ["New York", "London", "Paris", "Tokyo"],
      correctAnswer: "Paris",
      difficulty: "Medium",
      mark: "10",
      score: "0",
      isCorrect: false,
    },
    {
      id: 2,
      question: "Who won the Nobel Prize in Literature in 2020?",
      answer: "Jane Austen",
      options: ["Jane Austen", "George Orwell", "Stephen King", "J.K. Rowling"],
      correctAnswer: "Jane Austen",
      difficulty: "Easy",
      mark: "10",
      score: "10",
      isCorrect: true,

    }
]

export const slidesData = [
  {
    title: 'Create a Test.',
    image: '/images/create-test.png',
    quotes: {
      top: {
        text: 'Success is the result of preparation, hard work, and learning from failure.',
        author: 'Colin Powell'
      },
      bottom: {
        text: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay'
      }
    }
    
  },
  {
    title: 'Test Table.',
    image: '/images/test-list.png',
    quotes: {
      top: {
        text:'AI is likely to be either the best or worst thing to happen to humanity.',
        author: 'Stephen Hawking'
      },
      bottom: {
        text: 'The true test of intelligence is not knowledge but imagination.',
        author: 'Albert Einstein'
      }
    }
  },
  {
    title: 'Create a Question.',
    image: '/images/create-question.png',
    quotes: {
      top: {
        text:' Software is a great combination of artistry and engineering.',
        author: 'Bill Gates'
      },
      bottom: {
        text: 'In examinations, those who do not wish to know ask questions of those who cannot tell.',
        author: 'Oscar Wilde'
      }
    }
  }
]

export const signInTexts = [
  "Welcome to your examination dashboard.",
  "Please sign in to begin your exam.",
  "Preparing the best testing experience for you...",
  "Get ready! Your exam is about to begin.",
  "You are one step closer to completing this assessment!",
  "Keep calm and focus. Time is on your side.",
  "Submit your answers confidently. You've got this!",
  "Your test results will be available shortly.",
  "Best of luck! Give it your best shot!",
  "Remember, every answer counts toward your success."
];

export const signUpTexts = [
  "Please sign up to begin your exam.",
  "Preparing the best testing experience for you...",
];

export const demostudents = [
  {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
    date: "24th April, 2024",
    testId: 1,
    marks: 90,
    time_elapsed: '40mins',
    status: 'completed'
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: "password456",
    date: "24th April, 2024",
    testId: 2,
    marks: 80,
    time_elapsed: '35mins',
    status: 'active'
  }
]


export const tests = [
  {
    id: 1,
    title: "Social Studies Test",
    answer: "Paris",
    options: ["New York", "London", "Paris", "Tokyo"],
    correctAnswer: "Paris"
  },
  {
    id: 2,
    title: "English Language Test",
    answer: "Jane Austen",
    options: ["Jane Austen", "George Orwell", "Stephen King", "J.K. Rowling"],
    correctAnswer: "Jane Austen"
  }
]
