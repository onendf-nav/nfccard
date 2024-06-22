import React from 'react'
import "./style.css"
import profilepic from "../profilepic.png"
import addtocontact from "./assets/contact.png"
import callicon from "./assets/Call@2x.svg"

export const Profileshow = () => {
  return (
    <div className='w-full back-image h-[90vh] flex items-center justify-center ' >
      <div className='w-[90%] lg:w-[30%] h-[80%] py-8 px-8 flex items-center justify-center' style={{borderRadius:"20px", backgroundColor:"#0000009e" , border:"1px solid #ffffff29"}} >
        <div className='flex items-center justify-center flex-col gap-6' >
          <div>
            <img src={profilepic} alt="" className='rounded-full w-[50%] lg:w-[100%] m-auto ' style={{border:"2px solid grey"}} />
          </div>
          <div  className='text-center text-2xl flex flex-col gap-4 lg:gap-8'>
            <h1 className='text-3xl lg:text-[40px]' style={{fontWeight:"700" , lineHeight:"32px"}}>Nav verma</h1>
            <h1 className='text-2xl lg:text-[32px]' style={{fontWeight:"500" , lineHeight:"24px"}} >Front-end Developer | OneNDF</h1>
            <h1 className='text-2xl lg:text-[32px]' style={{fontWeight:"400" , lineHeight:"24px"}} >+91-9876543210</h1>
          </div>
          <div className='flex items-center justify-center flex-col w-full gap-4'  >
            <button className='w-full h-fit flex items-center justify-center gap-4 text-lg rounded-lg' style={{backgroundColor:"#ffffff"}} >
              <img src={addtocontact} width="30px" height="40px" alt="" className='py-3'/>
              <p className='text-black' style={{fontWeight:"600" , lineHeight:"20px"}} >
                Add to contact
              </p>
            </button>
            <button className='w-full h-fit flex items-center justify-center gap-4 text-lg rounded-lg' style={{border:"1px solid #ffffff"}} >
              <img src={callicon} width="30px" height="40px" alt="" className='py-3'/>
              <p className='text-white' style={{fontWeight:"600" , lineHeight:"20px"}} >
                Call Me
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
