'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import AllInvoices from "../../../app/components/Admin/Order/AllInvoices";

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="LearnEx - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <AllInvoices />
    </>
  )
}

export default page