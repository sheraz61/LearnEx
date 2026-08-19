'use client'
import React from 'react'
import Heading from '../../../app/utils/Heading';
import OrdersAnalytics from "../../components/Admin/Analytics/OrdersAnalytics";

type Props = {}

const page = (props: Props) => {
  return (
    <>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <OrdersAnalytics />
    </>
  )
}

export default page