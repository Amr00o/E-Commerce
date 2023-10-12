import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import axios from 'axios'

function CategorySlider() {

  let [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
    }, [])

  async function getAllCategories() {
    let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    console.log(data.data);
    setCategories(data.data)
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768, 
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
      },
    },
    ],
  };

  return <Slider {...settings}>
    {categories.map((category) => {
      return <>
      <img className='w-100 mt-3' height={200} src={category.image} alt={category.name} />
      <h5 className='font-sm text-main mt-1'>{category.name}</h5></>
    })}
    </Slider>
}
export default CategorySlider