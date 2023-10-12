import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet';

export default function Brands() {

  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(()=> {
    getAllBrands()
  }, [])

  async function getAllBrands() {
    setIsLoading(true)
    let {data} =await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    setIsLoading(false)
    setBrands(data.data)
  }


  return (
    <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
    <div className="container mb-5 my-5 py-5">
        <div className="row">
      {isLoading? <>
      <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <i className='fas fa-spinner fa-2x fa-spin'></i>
      </div>
      </> :<>
          <h1 className='text-center text-main fw-bold mt-4 mb-4'>All Brands</h1>
        {brands.map((brand)=>{
        return <div key={brand.id} className="col-md-3">
        <div className='category text-center border-2 mt-4 mb-4'>
        <div className="img">
          <img className="w-100 border-bottom-2" src={brand.image} alt={`Image for ${brand.name}`} />
            </div>
        <div className="text p-3">
        <p className=''>{brand.name}</p>
            </div>
          </div>
        </div>
          })}
          </>
        }
        </div>
        </div>
    </>
  )
}
