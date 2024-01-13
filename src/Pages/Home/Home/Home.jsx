import React from 'react'
import Testimonials from '../Testimonials/Testimonials'
import Category from '../Category/Category'
import Banner from '../Banner/Banner'
import About from '../About/About'
import Recommends from '../Recommends/Recommends'
import ChooseUs from '../ChooseUs/ChooseUs'
import ContactUs from '../ContactUs/ContactUs'

const Home = () => {
  return (
    <div>
      <Banner/>
      <About/>
      <Category/>
      <ChooseUs/>
      <Recommends/>
      <Testimonials/>
      <ContactUs/>
    </div>
  )
}

export default Home