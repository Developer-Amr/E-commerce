import React, { useEffect, useState } from 'react'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'
import { Helmet } from 'react-helmet'

export default function Categories() {

    const [categories, setCategories] = useState(null)

    async function getCategories() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET'
        }
        let {data} = await axios.request(options)
        setCategories(data.data)      
    }

    useEffect(()=>{
        getCategories()
    }, [])

  return (
    <>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    {!categories ? (
            <Loading/>
          ) : (
            <div className="grid pt-2 gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard categoryInfo={category} key={category._id} />
              ))}
            </div>
          )}
    </>
  )
}
