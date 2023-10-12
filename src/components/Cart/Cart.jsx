import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {

  let [errorMessage, setErrorMessage] = useState('');
  let [cartProducts, setCartProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [reqTimeOut, setReqTimeOut] = useState();
  let [totalCartPrice, setTotalCartPrice] = useState(0);
  let [cartId, setCartId] = useState();


  useEffect(() => {
    getLoggedUserCart()
  }, [])

  async function getLoggedUserCart(){
    setIsLoading(true)
    let response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers:{
        token: localStorage.getItem('token')
      }
    }).catch((err) =>{
      setErrorMessage(err.response.data.message)
    })

    if(response) {
      setCartId(response.data.data._id)
      setCartProducts(response.data.data.products)
      setTotalCartPrice(response.data.data.totalCartPrice)
    }
    setIsLoading(false)
    
  }

  async function removeProductCart(productId) {
    setIsLoading(true)
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/' + productId, {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setIsLoading(false)

    if(res) {
       setTotalCartPrice(res.data.data.totalCartPrice)
      setCartProducts(res.data.data.products)
    }
    
  }

  async function clearProductCart(productId) {
    setIsLoading(true)
    let res = await axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
      headers: {
        token: localStorage.getItem('token')
      }
    })
    setIsLoading(false)

    if(res) {
      setCartProducts([])
      setTotalCartPrice(0)
      setErrorMessage("dfd")
    }
    
  }

  function updateProductCount(productId, count, index) {
    let res
    let newProducts = [...cartProducts] 
    cartProducts[index].count = count

    setCartProducts(newProducts)

    clearTimeout(reqTimeOut)
    setReqTimeOut(setTimeout(async() => {
      res = await axios.put('https://ecommerce.routemisr.com/api/v1/cart/'+ productId, {
        count
      }, {
        headers:{
          token: localStorage.getItem('token')
        }
      })
      if(res) {
        setTotalCartPrice(res.data.data.totalCartPrice)
        setCartProducts(res.data.data.products)
      }
    }, 500))

  }


  return <>
  <Helmet>
      <title>Cart</title>
    </Helmet>
    <div className='my-5 py-5'>
  {isLoading ? <div className='text-center'>
    <i className='fas fa-spinner fa-spin fa-2x py-5 my-5'></i>
    </div>: <>
     {cartProducts.length == 0? <h2 className='alert alert-success text-center my-5'>No product in your cart</h2> 
  : 
  <>
    <button onClick={clearProductCart} className='btn btn-outline-success d-block ms-auto w-25 mt-3'>Clear Cart</button>
    {cartProducts?.map((product, index) => {
      return <div key={product._id} className="cart-product shadow rounded-2 my-3">
        <div className="row align-items-center">
          <div className="col-md-2">
            <img className='w-100' src={product.product.imageCover} alt="" />
          </div>
          <div className="col-md-8">
            <h2>{product.product.title}</h2>
            <h5>{product.product.category.name}</h5>
            <p className='d-flex justify-content-between'>
              <span>{product.price} EGP</span>
              <span><i className='fas fa-star rating-color me-1'></i> {product.product.ratingsAverage}</span></p>
              <p><span className='fw-bolder mb-0'>Total Price:</span> {product.count * product.price}</p>
              <button onClick={() => removeProductCart(product.product._id)} className='btn text-danger m-0 p-0'><i className='fa fa-trash'></i> Remove</button>
          </div>
          <div className="col-md-2">
            <div className="d-flex align-items-center mt-2 mb-2">
              <button onClick={() => updateProductCount(product.product._id, product.count - 1, index)} className='btn bg-main text-white mx-2'>-</button>
              <span>{product.count}</span>
              <button onClick={() => updateProductCount(product.product._id, product.count + 1, index)} className='btn bg-main text-white mx-2'>+</button>
            </div>
          </div>
        </div>
      </div>

    })}

    <div className='d-flex justify-content-between '>
      <Link to={"/address/"+ cartId} className='btn bg-main text-white '>CeakOut</Link>
      <p>Total Cart Price: {totalCartPrice} EGP</p>
    </div>
    </>
   }</>}
   </div>
  </>
}
