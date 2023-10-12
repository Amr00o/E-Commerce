import React from 'react'
import notFound from '../../Assets/image/error.svg' 

export default function Notfound() {
  return (
    <div className='my-5 py-5'>
      <img className='w-50 m-auto d-block py-5' src={notFound} alt="" />
    </div>
  )
}
