import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/Cart.Context";
import ReactImageGallery from "react-image-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import "Swiper/css";
import Card from "../../components/Card/Card";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);

  let { id } = useParams();

  const { addProductToCart } = useContext(CartContext);

  async function getproductDetails() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      console.log(data);

      setProductDetails(data.data);
    } catch (error) {}
  }

  async function getRelatedProducts() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
        method: "GET",
      };

      let { data } = await axios.request(options);
      setRelatedProducts(data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getproductDetails();
  }, [id]);

  useEffect(() => {
    if (productDetails == null) return;
    getRelatedProducts();
  }, [productDetails]);

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      {productDetails ? (
        <>
          <Helmet>
            <title>{productDetails.title}</title>
          </Helmet>
          <section className="grid gap-12 grid-cols-12">
            <div className="col-span-3">
              <ReactImageGallery
                showNav={false}
                showPlayButton={false}
                showFullscreenButton={false}
                items={productDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>
            <div className="col-span-9 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-600">
                  {productDetails.title}
                </h2>
                <h3 className="text-primary-600 font-semibold">
                  {productDetails.category.name}
                </h3>
              </div>
              <p className="text-gray-400">{productDetails.description}</p>

              <div className="flex justify-between items-center">
                <span>{productDetails.price} L.E</span>
                <div>
                  <i className="fa-solid fa-star me-2 text-yellow-500"></i>
                  <span>{productDetails.ratingsAverage}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  addProductToCart({ productId: id });
                }}
                className="btn bg-primary-800 hover:bg-primary-900 text-white font-semibold w-full"
              >
                Add To Cart
              </button>
            </div>
          </section>
          <section>
            <h2 className="text-2xl text-gray-600 mt-8 mb-4">
              Related Product
            </h2>
            {relatedProducts ? (
              <Swiper slidesPerView={6} spaceBetween={15}>
                {relatedProducts.map((product) => (
                  <SwiperSlide key={product.id}>
                    <Card productInfo={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <Loading />
            )}
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
