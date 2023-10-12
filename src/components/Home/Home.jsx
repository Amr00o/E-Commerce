import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Product1 from '../Product1/Product1';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';

export default function Home() {

  const [product, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=> {
    getAllProdct()
  }, [])

  async function getAllProdct() {
    setIsLoading(true)
    let {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    setIsLoading(false)
    setProducts(data.data)
  }

  return  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <div className="container mt-5 mb-5 my-5 py-5">
    {isLoading? <>
      <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spinner fa-2x fa-spin'></i>
      </div>
      </> :<>
      <MainSlider/>
        <CategorySlider/>
          <div className="container">
          <div className="row">
          {product.map((product)=>{
            return <Product1 key={product._id} product={product}/>
            })}
          </div>
          </div>
          </>
        }
        </div>
        </>
}
