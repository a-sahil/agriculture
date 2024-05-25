'use client'
import React from 'react'
import AddCrop from '../pages/addCrops'

const Modal = ({isVisible , onClose , children}) => {
  if(!isVisible) return null;

  const handleClose = (e) => {
    if(e.target.id === 'wrapper') onClose();
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20 " id="wrapper" onClick={handleClose}>
      <div className='ww-[600px]  flex flex-col'>
      <button className='text-black text-xl place-self-end relative top-16 right-8 hover:bg-gray-200 p-2 rounded z-20' onClick={() => onClose()}>X</button>
        <div className=''>
         <div className=''>
           {children}
         </div>
        </div>
      </div>
    </div>
  )
}

export default Modal