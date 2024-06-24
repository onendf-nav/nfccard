import React, { useEffect, useState } from 'react'
import "./style.css"
import profilepic from "../profilepic.png"
import addtocontact from "./assets/contact.png"
import callicon from "./assets/Call@2x.svg"
import { useParams } from "react-router-dom"

export const Profileshow = () => {

  const { id } = useParams()
  console.log(id)

  const [userObject, setuserObject] = useState({})

  useEffect(() => {
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
      console.log(res.user)
      setuserObject(res.user)
    })).catch(err => {
      console.log(err)
    })


  }, [])

  const addContact = async () => {
    var contact = {
      name: `${userObject.first_name} ${userObject.last_name}`,
      phone: userObject.phone_number,
      email: userObject.email
    };
    // create a vcard file
    var vcard = "BEGIN:VCARD\nVERSION:4.0\nFN:" + contact.name + "\nTEL;TYPE=work,voice:" + contact.phone + "\nEMAIL:" + contact.email + "\nEND:VCARD";
    var blob = new Blob([vcard], { type: "text/vcard" });
    var url = URL.createObjectURL(blob);

    const newLink = document.createElement('a');
    newLink.download = contact.name + ".vcf";
    newLink.textContent = contact.name;
    newLink.href = url;

    newLink.click();

  };




  return (
    <div className='w-full  h-[90vh] flex items-center justify-center ' >
      <div className='w-[90%] lg:w-[30%] h-[80%] py-8 px-8 flex items-center justify-center' style={{ borderRadius: "20px", backgroundColor: "#0000009e", border: "1px solid #ffffff29" }} >
        <div className='flex items-center justify-center flex-col gap-6' >
          <div>
            <img src={profilepic} alt="" className='rounded-full w-[50%] lg:w-[100%] m-auto ' style={{ border: "2px solid grey" }} />
          </div>
          <div className='text-center text-2xl flex flex-col gap-4 lg:gap-8'>
            <h1 className='text-3xl lg:text-[40px]' style={{ fontWeight: "700", lineHeight: "32px" }}>{userObject.first_name + userObject.last_name}</h1>
            <h1 className='text-2xl lg:text-[32px]' style={{ fontWeight: "500", lineHeight: "24px" }} >{userObject.department} | {userObject.company_name}</h1>
            <h1 className='text-2xl lg:text-[32px]' style={{ fontWeight: "400", lineHeight: "24px" }} >{userObject.phone_number}</h1>
          </div>
          <div className='flex items-center justify-center flex-col w-full gap-4'  >
            <button className='w-full h-fit flex items-center justify-center gap-4 text-lg rounded-lg' style={{ backgroundColor: "#ffffff" }} >
              <img src={addtocontact} width="30px" height="40px" alt="" className='py-3' />
              <p className='text-black' style={{ fontWeight: "600", lineHeight: "20px" }} onClick={addContact} >
                Add to contact
              </p>
            </button>
            <button className='w-full h-fit flex items-center justify-center gap-4 text-lg rounded-lg' style={{ border: "1px solid #ffffff" }} >
              <img src={callicon} width="30px" height="40px" alt="" className='py-3' />
              <p className='text-white' style={{ fontWeight: "600", lineHeight: "20px" }} >
                Call Me
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
