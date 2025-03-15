import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'
import { UserContext } from '../../context/User.Context'
import { Helmet } from 'react-helmet'

export default function Login() {
  let {setToken} = useContext(UserContext);

  const [incorrectEmailOrPasswordError, setincorrectEmailOrPasswordError] =  useState(null)

  const navigate = useNavigate()

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string().required("Password is required").matches(passwordRegex, "Password should be at least minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character"),
  })

  async function sendDataToLogin(values){
    const loadingTestId = toast.loading('Waiting ...')
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      } 
      let {data} = await axios.request(options);
      if(data.message == 'success'){
        localStorage.setItem("token", data.token)
        setToken(data.token);
        toast.success('User logged in successfully')
        setTimeout(()=>{
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setincorrectEmailOrPasswordError(error.response.data.message)
    } finally {
      toast.dismiss(loadingTestId)
    }
  }

  const formik = useFormik({
    initialValues: {
      "password":"",
    },
    validationSchema,
    onSubmit: sendDataToLogin
  })

  return (
    <>
    <Helmet>
      <title>Login</title>
    </Helmet>
      <h1 className='text-xl text-slate-700 font-semibold mb-5'>
        <i className='fa-regular fa-circle-user me-2'></i> Login
      </h1>
      <form className='space-y-3' onSubmit={formik.handleSubmit}>
        <div className="email">
          <input type="email" className='form-control w-full' placeholder='Email Address' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name='email'/>
          {formik.errors.email && formik.touched.email && (<p className='text-red-500 mt-1 text-sm'>*{formik.errors.email}</p>)}
        </div>
        <div className="password">
          <input type="password" className='form-control w-full' placeholder='Password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name='password'/>
          {formik.errors.password && formik.touched.password && (<p className='text-red-500 mt-1 text-sm'>*{formik.errors.password}</p>)}
          {incorrectEmailOrPasswordError && <p className='text-red-500 mt-1 text-sm'>*{incorrectEmailOrPasswordError}</p>}
        </div>

        <button type='submit' className='btn w-full bg-primary-700 hover:bg-primary-800 text-white'>Login</button>
      </form>
    </>
  )
}
