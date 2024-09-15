'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import React from 'react'

const ResultManager = () => {
  const tests = [
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

  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Result Manager</h1>
                </div>
              </div>

          </div>

          <div>
            <ResultManagerTable tests={tests}/>
          </div>
        </div>

    </div>
  )
}

export default ResultManager
