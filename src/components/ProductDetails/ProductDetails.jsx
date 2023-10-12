import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast'

function ProductDetails() {

    let params = useParams()
    let [productDetails, setProductsDetails] = useState()
    let [isLoading, setIsLoading] = useState(false)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    useEffect(()=>{
        getProductDetails(params.id)
    }, [])

    async function getProductDetails(productId) {
        setIsLoading(true)
        let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products/' + productId)
        setIsLoading(false)
        setProductsDetails(data.data)
    }

    async function addProductToCard(productId) {
   
        let res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
          productId
        }, {
          headers: {
            token: localStorage.getItem("token")
          }
        }).catch((err) => {
          toast.error(err.response.data.message)
          localStorage.removeItem("token")
        })
    
        if(res){
          toast.success(res.data.message)
        }
    
      }
      

return (
    <>
    <Helmet>
      <title>{productDetails?.title}</title>
    </Helmet>
    <div className="row align-items-center my-5 py-5">
    {isLoading? <>
    <div className='d-flex align-items-center justify-content-center my-5 py-5'>
        <i className='fas fa-spinner fa-2x fa-spin'></i>
    </div>
    </> :<>
    <div className="col-md-3 mt-4">
    
    <Slider {...settings}>
        {productDetails?.images?.map((img, index) => {
            return <img key={index} className='w-100' src={img} />;
    })}
</Slider>

    </div>
    <div className="col-md-9">
        <h2 className='mt-2'>{productDetails?.title}</h2>
        <h5 className='font-sm text-main mt-2'>{productDetails?.category?.name}</h5>
        <p className='mt-2'>{productDetails?.description}</p>
        <p className='d-flex justify-content-between mt-2'>
            <span>{productDetails?.price} EGP</span>
            <span>
                <i className='fas fa-star rating-color'></i>
            <span>{productDetails?.ratingsAverage}</span>
            </span>
        </p>
        <button onClick={() => addProductToCard(productDetails?._id)}className='btn bg-main text-white w-100 mt-2'>Add To Cart</button>


        </div>
        </>
    }
    </div>
    </>
  )
}

export default ProductDetails

