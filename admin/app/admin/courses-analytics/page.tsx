'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics";

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <CourseAnalytics />
    </>
  )
}

export default page