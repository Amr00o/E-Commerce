import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword() {
    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        email: formik.values.email,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Enter a valid email'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: resetPassword,
    validationSchema,
  });

  return (<>
    <Helmet>
      <title>Forgot Password</title>
    </Helmet>
    <div className="w-75 m-auto my-5 py-5">
    <h1 className='mt-3'>Forgot Password:</h1>
    <form onSubmit={formik.handleSubmit}>
    <label htmlFor="email" className="my-1">
        Email:
    </label>
    <input value={formik.values.email}onBlur={formik.handleBlur}onChange={formik.handleChange}type="email"className="form-control mb-3"id="email"name="email"/>
    {formik.errors.email && formik.touched.email ? (
        <div className="alert alert-danger">{formik.errors.email}</div>
    ) : null}

    {message ? <div className="alert">{message}</div> : null}

    {isLoading ? (
        <button disabled type="button" className="btn bg-main px-3 text-white ms-auto d-block">
        <i className="fas fa-spin fa-spinner"></i>
        </button>
    ) : (
        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main px-3 text-white ms-auto d-block">Reset Password</button>
    )}
      </form>
    </div>
    </> );
}
