import React, {useContext, useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';


export default function Register() {

  let navigate = useNavigate()
  let [errMessege, serErrorMess] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let { userIsLoggendIn} = useContext(AuthContext)


  useEffect(()=> {
    if(userIsLoggendIn){
      navigate('/home')
    }
  })



async function register(){
  serErrorMess('')
  setIsLoading(true)
    let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formik.values).catch((err)=>{
      console.log(err.response.data.message);
      serErrorMess(err.response.data.message)
      setIsLoading(false)
    })

    if (data.message === 'success') {
      setIsLoading(true)
      navigate('/login')
    }

    console.log(data);
  }

  let validationSchema = Yup.object({
    name: Yup.string().required('Name is required').min(3, 'Min length 3 characters').max(20, 'Max length 20 characters'),
    email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
    password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[0-9]).{6,16}$/, "Enter a valid password"),
    rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], "repassword and password doesn't match"),
    phone: Yup.string().required('Phone number is required').matches(/^01[0125][0-9]{8}$/)
  })

  

  const formik =  useFormik({
    initialValues:{
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: register,
    validationSchema
  })


  return<>
  <Helmet>
    <title>Register</title>
  </Helmet>
   <div className="w-75 m-auto my-5 py-5">
    <h1 className='mt-3'>Register Now :</h1>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" className='my-1'>Name:</label>
      <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" className='form-control mb-3' id="name" name='name'/>
      {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : null}
      

      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id="email" name='email'/>
      {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null}
      
      <label htmlFor="password" className='my-1'>Password:</label>
      <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id="password" name='password'/>
      {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}
      

      <label htmlFor="rePassword" className='my-1'>RePassword:</label>
      <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id="rePassword" name='rePassword'/>
      {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

      <label htmlFor="phone" className='my-1'>Phone:</label>
      <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" className='form-control mb-3' id="phone" name='phone'/>
      {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger">{formik.errors.phone}</div> : null}

      {errMessege? <div className="alert alert-danger">{errMessege}</div> : null}

      {isLoading?
      <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
      :
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Register</button>}
      
    </form>
  </div>
  </>
}
