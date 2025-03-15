import React from 'react'

export default function CategoryCard({categoryInfo}) {

    const {image, name} = categoryInfo

  return (
    <>
        <div className="category border border-gray-300  hover:border-primary-500 hover:shadow-xl transition-all duration-300 rounded">
                <img className='w-full h-64 object-cover' src={image} alt={name} />
                <h3 className='text-center py-5 text-primary-900 font-semibold text-xl'>{name}</h3>
        </div>
    </>
  )
}
