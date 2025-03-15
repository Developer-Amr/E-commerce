import React, { useEffect, useState } from "react";
import BrandItem from "../../components/BrandItem/BrandItem";
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Brands() {
  const [brands, setBrands] = useState(null);

  async function getBrands() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/brands",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setBrands(data.data)
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
    <Helmet>
      <title>Brands</title>
    </Helmet>
      <h2 className="text-4xl font-semibold text-primary-900 text-center mt-2 mb-10">
        All Brands
      </h2>
      {!brands ? (
        <Loading />
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandItem brandInfo={brand} key={brand._id} />
          ))}
        </div>
      )}
    </>
  );
}
