import React from 'react'

import image1 from '../../assets/images/image1.jpg';
import image2 from '../../assets/images/image2.jpg';

import sliderImage1 from '../../assets/images/slider-image-1.jpeg';
import sliderImage2 from '../../assets/images/slider-image-2.jpeg';
import sliderImage3 from '../../assets/images/slider-image-3.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function HomeSlider() {
  return (
    <>
        <section className='grid grid-cols-12 mb-8'>
            <div className="col-span-8" >
                <Swiper loop={true} slidesPerView={1}>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' src={sliderImage3} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' src={sliderImage2} alt="" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img className='w-full h-full object-cover' src={sliderImage1} alt="" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="col-span-4">
                <img className='w-full' src={image1} alt="" />
                <img className='w-full' src={image2} alt="" />
            </div>
        </section>
    </>
  )
}
