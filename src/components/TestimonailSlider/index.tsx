import React from 'react';
import { testtimonialsData } from '@/data';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
// import '../slider.css'

import { Pagination } from 'swiper'
import Image from 'next/image';
type Props = {}

const TestimonailSliderComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Swiper slidesPerView={'auto'} centeredSlides={true} spaceBetween={29} pagination={{
      clickable: true,
    }}
      modules={[Pagination]}
      className='mySwipper'>
      {testtimonialsData.map((item, idx) => {
        const { image, message, name, web } = item
        return (
          <SwiperSlide key={name + idx}
            className='bg-white rounded border border-accent-primary xl:max-w-[645px] max-h-[330px] pt-[60px] px-[35px] xl:px-[70px] pb-[50px] flex items-start gap-x-[30px] shadow-xl'>
            {/* Avatar Image */}
            <Image src={image} alt="" />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default TestimonailSliderComponent