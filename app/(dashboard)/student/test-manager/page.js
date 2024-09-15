"use client"
import ExamsListTable from '@/app/components/tables/students/ExamsListTable'
import { tests } from '@/app/lib/constants'
import React from 'react'

const TestManager = () => {
  return (
    <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Test List</h1>
                </div>
              </div>

          </div>

          <div>
            <ExamsListTable tests={tests}/>
          </div>
    </div>
  )
}

export default TestManager
