import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.Context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);

export default function WishListProvider({ children }) {
  const [wishListInfo, setWishListInfo] = useState(null);
  const { token } = useContext(UserContext);
  const [liked, setLiked] = useState({});

  async function addProductToWishList({ productId }) {
    let toastId = toast.loading("Adding Product ...");

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "POST",
        headers: {
          token,
        },
        data: {
          productId,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(data.message);
        getWishListProducts();
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function getWishListProducts() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/wishlist",
        method: "GET",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      setWishListInfo(data);
    } catch (error) {}
  }

  async function removeProductFromWishList({ productId }) {
    const toastId = toast.loading("Deleting Product");

    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        method: "DELETE",
        headers: {
          token,
        },
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success(data.message);
        setWishListInfo(data);
        setLiked((prev) => {
          const updatedLiked = { ...prev };
          delete updatedLiked[productId];
          return updatedLiked;
      });
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }

  return (
    <WishListContext.Provider
      value={{
        addProductToWishList,
        getWishListProducts,
        wishListInfo,
        removeProductFromWishList,
        liked, 
        setLiked
      }}
    >
      {children}
    </WishListContext.Provider>
  );
}
