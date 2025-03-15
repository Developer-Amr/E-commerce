import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.Context";
import { WishListContext } from "../../context/WishList.context";

export default function WishListItem({productInfo}) {
    const {title, category, price, imageCover, id} = productInfo
    let {removeProductFromWishList} = useContext(WishListContext)
    let {addProductToCart} = useContext(CartContext)
  return (
    <>
      <div className="flex gap-2">
        <div className="card-item flex grow justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
            src={imageCover}
            alt={title}
          />

          <h3 className="text-lg text-gray-700 font-semibold">
            <Link to={`/product/${id}`}>{title}</Link>
          </h3>
          <h4 className="text-gray-500 font-semibold">{category.name}</h4>

          <div className="flex gap-5 items-center">
            <button onClick={()=>{
                addProductToCart({productId: id})
            }} className="btn bg-primary-600 py-2 hover:bg-primary-700 text-white">
              Add To Cart
            </button>
          </div>

          <span>{price} L.E</span>
        </div>
        <button
          onClick={() => {
            removeProductFromWishList({productId: id})
          }}
          className="rounded-md p-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
    </>
  );
}
