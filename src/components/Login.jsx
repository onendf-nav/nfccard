import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./style.css"
import { Password } from '@mui/icons-material';
export const Login = () => {



  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First Name Required'),
    email: Yup.string().email('Invalid email').required('Email Required'),

  });


  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""

    },
    validationSchema: SignupSchema,
    onSubmit: values => {
      fetch("http://localhost:3000/api/nfc_users", {
        method: 'POST',
        body: {
          email: values.email,
          password: values.password
        }
      }).then(res => res.json()).then(res => {
        alert("working")
      }).catch(err => {
        alert("gya" + err)
      })
    },
  });
  console.log(formik.errors)


  return (
    <form onSubmit={formik.handleSubmit}>

      <div className='w-full back-image h-[90vh] flex items-center justify-center ' >
        <div className='w-[40%] h-[60%] py-8 px-8 flex items-center justify-center' style={{ borderRadius: "20px", backgroundColor: "#0000009e", border: "1px solid #ffffff29" }} >
          <div className='flex items-center justify-center flex-col gap-6 text-white w-full' >
            <h1 className='text-6xl'>Login</h1>
            <div className='w-full' >
              <label htmlFor="email" className='text-xl' >Enter Email </label>
              <input onChange={formik.handleChange} value={formik.values.email} type="text" placeholder='example@company.com' name='email' className='w-full h-12 text-xl bg-transparent px-4 rounded-lg' style={{ border: "1px solid #ffffff29" }} />
            </div>
            <div className='w-full' >
              <label htmlFor="password" className='text-xl'>Enter Password</label>
              <input onChange={formik.handleChange} value={formik.values.password} type="text" placeholder='********' name='password' className='w-full h-12 text-xl bg-transparent px-4 rounded-lg' style={{ border: "1px solid #ffffff29" }} />
            </div>
            <div className='flex w-full gap-4 items-center justify-center' >
              <button className='m-auto w-fit px-8 py-4 rounded-lg text-black bg-white' type='submit'>Contine</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
