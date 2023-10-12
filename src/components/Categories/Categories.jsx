import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    setIsLoading(true);
    try {
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
    <div className="container my-5 py-5">
      <div className="row">
      {isLoading? <>
        <div className='d-flex align-items-center justify-content-center my-5 py-5'>
            <i className='fas fa-spinner fa-2x fa-spin'></i>
        </div>
        </> : 
      categories.map((category) => (
        <div key={category.id} className="col-md-4">
        <div className='category text-center border-2 mt-4 mb-4'>
        <div className="img">
          <img className="w-100 border-bottom-2" height={370} src={category.image} alt={`Image for ${category.name}`} />
            </div>
        <div className="text p-3">
        <h3 className='text-main fw-bold'>{category.name}</h3>
        </div>
        </div>
        </div>
          ))
        }
      </div>
    </div>
    </>
  );
}

