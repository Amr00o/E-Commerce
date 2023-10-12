import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import Product1 from '../Product1/Product1';

export default function Wishlist() {
  const {setUserIsLoggedIn} = useContext(AuthContext)
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist()
  }, []);

  async function fetchWishlist() {
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token'),
        }
      });
      setWishlist(response.data.data);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      setUserIsLoggedIn(false);
    }
  }
  fetchWishlist();

  return (
    <div>
    <div className="row my-5 py-5">
    {wishlist.map((product) => (
        <Product1 key={product._id} product={product} />
    ))}
    </div>

</div>
  );  
}
