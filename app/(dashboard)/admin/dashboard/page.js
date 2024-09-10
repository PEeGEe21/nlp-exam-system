"use client"
import React, {useEffect} from 'react'
import { db } from '@/app/appwrite/database'

const Dashboard = () => {

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    const response = await db.notes.list()
    console.log(response.documents)
  }

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
