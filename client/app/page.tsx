'use client'
import React , {FC,useState} from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Route/Hero'


interface Props {

}
const Page : FC<Props> = (props)=>{
  const [open , setOpen] = useState(false)
  const [activeItem,setActiveITem] = useState(0)
return (
  <div>
      <Heading
        title="LearnEx"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <Header
      open={open}
      setOpen={setOpen}
      activeItem={activeItem}
      />
      <Hero/>
  </div>
)
}

export default Page