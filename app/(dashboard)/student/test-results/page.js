'use client'
import ResultManagerTable from '@/app/components/tables/ResultManagerTable'
import ResultManagerStudentTable from '@/app/components/tables/students/ResultManagerTable'
import { tests } from '@/app/lib/constants'
import React from 'react'

const ResultManager = () => {
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
            <ResultManagerStudentTable tests={tests}/>
          </div>
        </div>

    </div>
  )
}

export default ResultManager
