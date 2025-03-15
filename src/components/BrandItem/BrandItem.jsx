import React from 'react'

export default function BrandItem({brandInfo}) {

    const {image, name} = brandInfo

  return (
    <>
        <div className="brand border border-gray-300  hover:border-primary-500 hover:shadow-xl transition-all duration-300 rounded">
                <img className='w-full' src={image} alt={name} />
                <h3 className='text-center py-5'>{name}</h3>
        </div>
    </>
  )
}
