'use client'
import Heading from '@/app/utils/Heading'
import React from 'react'
import AllUsers from "../../components/Admin/Users/AllUsers";

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <AllUsers />
    </>
  )
}

export default page