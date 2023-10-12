import React, { useContext, useState } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { AuthContext } from '../../Context/AuthContext';

export default function Product1({ product }) {
  const {setUserIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate()
  const [isLiked, setIsLiked] = useState(false);

  async function addProductToCard(productId) {
   
    let res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
      productId
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    }).catch((err) => {
      toast.error(err.response.data.message)
      setUserIsLoggedIn(false)
      localStorage.removeItem("token")
      navigate("/login")
    })

    if(res){
      toast.success(res.data.message)
      setIsLiked(true);
    }

  }


  async function addProductToWishlist(productId) {
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId,},
        {
        headers: {
        token: localStorage.getItem('token'),},});

      toast.success(res.data.message);
      setIsLiked(true);
    } catch (err) {
      toast.error(err.response.data.message);
      setUserIsLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  return (
    <div className="col-md-3 my-4">
    <div className="product overflow-hidden mt-2 px-2 py-3 cursor-pointer">
    <Link to={'/ProductDetails/' + product._id} className="p-1 text-decoration-none text-black">
    <img className='w-100' src={product.imageCover} alt="" />
    <h6 className='font-sm text-main mt-2'>{product.category.name}</h6>
    <h5 className='fw-bolder'>{product.title.split(" ").slice(0,2).join(" ")}</h5>
    <p className='d-flex justify-content-between'>
        <span className='fw-light'>{product.price} EGP</span>
        <span><i className='fas fa-star rating-color'></i> {product.ratingsAverage} </span>
        </p>
        </Link>
        <i onClick={() => {addProductToWishlist(product._id);}}className={`h3 fa-solid fa-heart${isLiked ? ' text-danger' : ''}`}></i>
        <button onClick={() => addProductToCard(product._id)} className='btn bg-main text-white w-100'>+Add To Cart</button>
    </div>
  </div>
  )
}
