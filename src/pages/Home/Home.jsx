import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import Card from '../../components/Card/Card'
import axios from 'axios'
import HomeSlider from '../../components/HomeSlider/HomeSlider'
import CategorySlider from '../../components/categorySlider/categorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  const [products, setProducts] = useState(null)

  async function getProducts() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    }

    let {data} = await axios.request(options)
    setProducts(data.data)
  }

  useEffect(()=>{
    getProducts()
  }, [])

  return (
    <>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="FreshCart| Home Page, ......."/>
      <meta name="keywords" content="E-commerce, FreshCart"/>
    </Helmet>
      <HomeSlider />
      <CategorySlider />

      {!products ? <Loading/> : <div className="grid gap-4 sm:grid-cols-2 md-grid-cols-3 lg-grid-cols-4 xl:grid-cols-6">
        {products.map((product)=> <Card productInfo={product} key={product.id}/>)}
    </div>}
    </>
  )
}
