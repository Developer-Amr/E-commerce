import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import Loading from "../../components/Loading/Loading";
import WishListItem from "../../components/WishListItem/WishListItem";
import { WishListContext } from "../../context/WishList.context";

export default function WishList() {
  let { getWishListProducts, wishListInfo } = useContext(WishListContext);

  useEffect(() => {
    getWishListProducts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <section>
        <div className="flex gap-8 items-center">
          <i className="fa-brands fa-opencart text-3xl"></i>
          <h2 className="text-xl text-slate-600 font-semibold ps-4 relative before:absolute before:w-0.5 before:h-3/4 before:bg-slate-600 before:-left-1 before:top-1/2 before:-translate-y-1/2">
            My Wish List
          </h2>
        </div>

        {wishListInfo == null ? (
          <Loading />
        ) : (
          <>
            <div className="space-y-4 mt-6">
              {wishListInfo.data.map((product) => (
                <WishListItem key={product.id} productInfo={product} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
