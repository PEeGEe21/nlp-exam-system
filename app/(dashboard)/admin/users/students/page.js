import StudentsTable from '@/app/components/tables/StudentsTable'
import React from 'react'

const Page = () => {
  return (
    <div>
        <div>
          <div className="flex flex-row items-center justify-between mb-8">
              <div className="flex flex-row items-center justify-start gap-8">
                <div className="w-full">
                  <h1 className=" whitespace-nowrap text-2xl font-medium lg:text-4xl">Students</h1>
                </div>
              </div>
          </div>
          <StudentsTable/>
        </div>
    </div>
  )
}

export default Page