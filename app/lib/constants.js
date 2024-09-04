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
