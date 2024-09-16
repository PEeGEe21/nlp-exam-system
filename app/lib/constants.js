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


export const mainQuestions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: [
      { id: 1, text: "Berlin" },
      { id: 2, text: "Madrid" },
      { id: 3, text: "Paris" }, // correct
      { id: 4, text: "Lisbon" }
    ],
    correctAnswerId: 3
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: [
      { id: 1, text: "Earth" },
      { id: 2, text: "Mars" }, // correct
      { id: 3, text: "Jupiter" },
      { id: 4, text: "Saturn" }
    ],
    correctAnswerId: 2
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: [
      { id: 1, text: "Atlantic Ocean" },
      { id: 2, text: "Indian Ocean" },
      { id: 3, text: "Pacific Ocean" }, // correct
      { id: 4, text: "Arctic Ocean" }
    ],
    correctAnswerId: 3
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      { id: 1, text: "Mark Twain" },
      { id: 2, text: "William Shakespeare" }, // correct
      { id: 3, text: "Charles Dickens" },
      { id: 4, text: "Jane Austen" }
    ],
    correctAnswerId: 2
  },
  {
    id: 5,
    question: "Which country is home to the kangaroo?",
    options: [
      { id: 1, text: "India" },
      { id: 2, text: "Australia" }, // correct
      { id: 3, text: "South Africa" },
      { id: 4, text: "Brazil" }
    ],
    correctAnswerId: 2
  },
  {
    id: 6,
    question: "What is the smallest prime number?",
    options: [
      { id: 1, text: "1" },
      { id: 2, text: "2" }, // correct
      { id: 3, text: "3" },
      { id: 4, text: "5" }
    ],
    correctAnswerId: 2
  },
  {
    id: 7,
    question: "What is the chemical symbol for water?",
    options: [
      { id: 1, text: "O2" },
      { id: 2, text: "H2O" }, // correct
      { id: 3, text: "CO2" },
      { id: 4, text: "H2" }
    ],
    correctAnswerId: 2
  },
  {
    id: 8,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: [
      { id: 1, text: "China" },
      { id: 2, text: "United Kingdom" },
      { id: 3, text: "Brazil" }, // correct
      { id: 4, text: "USA" }
    ],
    correctAnswerId: 3
  },
  {
    id: 9,
    question: "Which element is the most abundant in the Earth's atmosphere?",
    options: [
      { id: 1, text: "Oxygen" },
      { id: 2, text: "Hydrogen" },
      { id: 3, text: "Nitrogen" }, // correct
      { id: 4, text: "Carbon Dioxide" }
    ],
    correctAnswerId: 3
  },
  {
    id: 10,
    question: "In which year did World War II end?",
    options: [
      { id: 1, text: "1940" },
      { id: 2, text: "1942" },
      { id: 3, text: "1945" }, // correct
      { id: 4, text: "1948" }
    ],
    correctAnswerId: 3
  },
  {
    id: 11,
    question: "What is the square root of 144?",
    options: [
      { id: 1, text: "10" },
      { id: 2, text: "11" },
      { id: 3, text: "12" }, // correct
      { id: 4, text: "13" }
    ],
    correctAnswerId: 3
  },
  {
    id: 12,
    question: "Who was the first man to step on the moon?",
    options: [
      { id: 1, text: "Yuri Gagarin" },
      { id: 2, text: "Buzz Aldrin" },
      { id: 3, text: "Neil Armstrong" }, // correct
      { id: 4, text: "Michael Collins" }
    ],
    correctAnswerId: 3
  },
  {
    id: 13,
    question: "Which continent is the Sahara Desert located on?",
    options: [
      { id: 1, text: "Africa" }, // correct
      { id: 2, text: "Asia" },
      { id: 3, text: "Australia" },
      { id: 4, text: "North America" }
    ],
    correctAnswerId: 1
  },
  {
    id: 14,
    question: "What is the powerhouse of the cell?",
    options: [
      { id: 1, text: "Nucleus" },
      { id: 2, text: "Ribosome" },
      { id: 3, text: "Mitochondria" }, // correct
      { id: 4, text: "Cell Membrane" }
    ],
    correctAnswerId: 3
  },
  {
    id: 15,
    question: "Which gas do plants absorb from the atmosphere?",
    options: [
      { id: 1, text: "Oxygen" },
      { id: 2, text: "Hydrogen" },
      { id: 3, text: "Nitrogen" },
      { id: 4, text: "Carbon Dioxide" }, // correct
    ],
    correctAnswerId: 4
  }
];
