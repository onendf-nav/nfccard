import React from 'react'
import "./style.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react';

import { toast } from 'sonner';

export const EditProfile = () => {
    const navigate = useNavigate()

    const [initialValues, setInitialValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        user_name: '',
        company_name: '',
        phone_number: '',
        alternative_number: '',
        website: '',
        address: '',
        postal_code: '',
        gst: '',
        department: ''
    });



    useEffect(() => {
        const id = localStorage.getItem("user_id")
        if (!id) {
            navigate("/login")
        }
        fetch(`http://127.0.0.1:3000/api/nfc_users?id=${id}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                id,
            },
            mode: 'cors',
            credentials: 'include',
        }).then(res => res.json()).then((res => {
            console.log("responce from api")
            console.log(res)
            if (!res.user) {
                navigate("/notfound")
            }
            setInitialValues({
                first_name: res.user.first_name,
                last_name: res.user.last_name,
                email: res.user.email,
                user_name: res.user.user_name,
                company_name: res.user.company_name,
                phone_number: res.user.phone_number,
                alternative_number: res.user.alternate_phone_number,
                website: res.user.website_url,
                address: res.user.address,
                postal_code: res.user.zip_code,
                gst: res.user.gst,
                department: res.user.department,
            });
            console.log(initialValues)
        })).catch(err => {
            console.log(err)
        })


    }, [])

    const SignupSchema = Yup.object().shape({
        first_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('First Name Required'),
        last_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Last Name Required'),
        email: Yup.string().email('Invalid email').required('Email Required'),
        user_name: Yup.string()
            .required('Username Required'),
        company_name: Yup.string()
            .required('Company Name Required'),
        phone_number: Yup.string()
            .required('Phone Number Required'),
    });
    const formik = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        validationSchema: SignupSchema,
        onSubmit: values => {
            fetch("http://127.0.0.1:3000/api/nfc_users", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-Token':localStorage.getItem("token")
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify({
                    email: values.email,
                    user_name: values.user_name,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    company_name: values.company_name,
                    department: values.department,
                    phone_number: values.phone_number,
                    alternate_phone_number: values.alternative_number,
                    website_url: values.website,
                    address: values.address,
                    zip_code: values.postal_code,
                    gst: values.gst
                })
            }).then(res => res.json()).then(res => {
                console.log(res)
                localStorage.setItem("user_id", res.user.id)
                navigate(`/${res.user.id}/${res.user.first_name}`)
            }).catch(err => {
                toast.error('Unable to create user . Try Again!');
            })
        },
    });


    console.log(initialValues)


    return (
        <form onSubmit={formik.handleSubmit}>

            <div className='w-full p-8 h-fit flex items-center justify-center ' >
                <div className='w-[100%] lg:w-[80%] h-fit py-8 px-8 flex items-center justify-center overflow-auto' style={{ borderRadius: "20px", backgroundColor: "#0000009e", border: "1px solid #ffffff29" }} >
                    <div className='flex items-center justify-center flex-col gap-6 text-white w-full overflow-auto p-2' >
                        <h1 className='text-3xl'>Edit your Profile Details</h1>
                        <div className='flex w-full gap-4 flex-col lg:flex-row ' >
                            <input onChange={formik.handleChange} value={formik.values.first_name} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter First Name' name="first_name" type="text" />
                            <input onChange={formik.handleChange} value={formik.values.last_name} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Last Name' name="last_name" type="text" />
                        </div>
                        <input onChange={formik.handleChange} value={formik.values.user_name} className='w-full bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter User Name' name="user_name" type="text" />
                        <div className='flex w-full gap-4 flex-col lg:flex-row' >
                            <input onChange={formik.handleChange} value={formik.values.company_name} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Company Name' name="company_name" type="text" />
                            <input onChange={formik.handleChange} value={formik.values.department} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Department/Desgination' name="department" type="text" />
                        </div>
                        <div className='flex w-full gap-4 flex-col lg:flex-row' >
                            <input onChange={formik.handleChange} value={formik.values.phone_number} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Phone Number' name="phone_number" type="text" />
                            <input onChange={formik.handleChange} value={formik.values.alternative_number} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Alternative Number' name="alternative_number" type="text" />
                        </div>
                        <div className='flex w-full gap-4 flex-col lg:flex-row' >
                            <input onChange={formik.handleChange} value={formik.values.email} className='w-[100%] lg:w-[50%] bg-grey px-4 text-lg rounded-lg py-4 text-grey ' style={{ border: "2px solid grey" }} placeholder='Enter Email' name="email" type="text" disabled/>
                            <input onChange={formik.handleChange} value={formik.values.website} className='w-[100%] lg:w-[50%] bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter WebsiteURL' name="website" type="text" />
                        </div>
                        <div className='flex w-full gap-4 flex-col lg:flex-row' >
                            <div className='w-[100%] lg:w-[50%]'>
                                <h2 className='text-2xl mb-6'>Upload your logo or profile picture</h2>
                                <div className='w-full text-center' >
                                    <label htmlFor="profilepic" className='flex w-full text-center m-auto bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} >Upload image</label>
                                    <input type="file" className='hidden' id='profilepic' name='profilepic' />
                                </div>

                            </div>
                            <div className='w-[100%] lg:w-[50%] flex gap-6  flex-col'>
                                <h2 className='text-2xl'>Address</h2>
                                <input onChange={formik.handleChange} value={formik.values.address} className='w-full bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Address' name="address" type="text" />
                                <input onChange={formik.handleChange} value={formik.values.postal_code} className='w-full bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter Postal Code' name="postal_code" type="text" />
                                <input onChange={formik.handleChange} value={formik.values.gst} className='w-full bg-transparent px-4 text-lg rounded-lg py-4' style={{ border: "2px solid #ffffff80" }} placeholder='Enter GST' name="gst" type="text" />
                            </div>
                        </div>
                        <div className='text-red-400 text-sm text-left w-full' >

                            {formik.errors.first_name && <p  >*{formik.errors.first_name}</p>}
                            {formik.errors.last_name && <p  >*{formik.errors.last_name}</p>}
                            {formik.errors.email && <p>*{formik.errors.email}</p>}
                            {formik.errors.user_name && <p>*{formik.errors.user_name}</p>}
                            {formik.errors.company_name && <p>*{formik.errors.company_name}</p>}
                            {formik.errors.phone_number && <p>*{formik.errors.phone_number}</p>}
                        </div>
                        <div className='flex w-full gap-4 flex-col lg:flex-row items-center justify-center' >
                            <button className='m-auto w-fit px-8 py-4 rounded-lg text-black bg-white' type='submit'>Edit Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
