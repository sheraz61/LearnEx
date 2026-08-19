'use client'
import React from 'react'
import Heading from '../../utils/Heading';
import UserAnalytics from '../../components/Admin/Analytics/UserAnalytics';

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="LearnEx - Admin"
        description="LearnEx is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <UserAnalytics />
    </>
  )
}

export default page