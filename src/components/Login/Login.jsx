import React, {useContext, useEffect, useState} from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Helmet } from 'react-helmet';


export default function Login() {
  let navigate = useNavigate()
  let [errMessege, serErrorMess] = useState('')
  let [isLoading, setIsLoading] = useState(false)
  let {setUserIsLoggedIn, userIsLoggendIn} = useContext(AuthContext)


  useEffect(()=> {
    if(userIsLoggendIn){
      navigate('/home')
    }
  })


  async function login(){
    serErrorMess('')
    setIsLoading(true)
      let {data} =await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formik.values).catch((err)=>{
        console.log(err.response.data.message);
        serErrorMess(err.response.data.message)
        setIsLoading(false)
      })

      if (data.message === 'success') {
        setIsLoading(true)
        localStorage.setItem("token", data.token)
        setUserIsLoggedIn(true)
        navigate('/home')
      }

      console.log(data);
    }

    let validationSchema = Yup.object({
      email: Yup.string().required('Email is required').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, "Enter valid email"),
      password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[0-9]).{6,16}$/, "Enter a valid password"),
    })

  

  const formik =  useFormik({
    initialValues:{
      email: '',
      password: '',
    },
    onSubmit: login,
    validationSchema
  })


  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
  <div className="w-75 m-auto my-5 py-5">
    <h1 className='mt-3'>Login Now :</h1>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email" className='my-1'>Email:</label>
      <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control mb-3' id="email" name='email'/>
      {formik.errors.email && formik.touched.email? <div className="alert alert-danger">{formik.errors.email}</div> : null}
      
      <label htmlFor="password" className='my-1'>Password:</label>
      <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control mb-3' id="password" name='password'/>
      {formik.errors.password && formik.touched.password? <div className="alert alert-danger">{formik.errors.password}</div> : null}
      
      {errMessege? <div className="alert alert-danger">{errMessege}</div> : null}
      <Link to="/forgotPassword" className='forgot text-decoration-none text-main'>Forgot Password?</Link>

      {isLoading?
      <button disabled type='button' className='btn bg-main px-3 text-white ms-auto d-block'><i className='fas fa-spin fa-spinner'></i></button>
      :
      <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main px-3 text-white ms-auto d-block'>Login</button>}
      
    </form>
  </div>
  </>
}