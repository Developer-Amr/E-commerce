import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup.jsx/Signup";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./components/GuestRoute/GuestRoute";
import UserProvider from "./context/User.Context";
import CartProvider from "./context/Cart.Context";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CheckOut from "./pages/CheckOut/CheckOut";
import Orders from "./pages/Orders/Orders";
import Online from "./components/Online/Online";
import Offline from "./components/Offline/Offline";
import Brands from "./pages/Brans/Brands";
import Categories from "./pages/Categories/Categories";
import Products from "./pages/Products/Products";
import WishList from "./pages/WishList/WishList";
import WishListProvider from "./context/WishList.Context";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "cart", element: <Cart /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "checkout", element: <CheckOut /> },
        { path: "allorders", element: <Orders /> },
        { path: "brands", element: <Brands /> },
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },
        { path: "wishlist", element: <WishList /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <Signup /> },
      ],
    },
  ]);

  return (
    <>
      <UserProvider>
        <CartProvider>
          <WishListProvider>
            <RouterProvider router={router} />
          </WishListProvider>
        </CartProvider>
      </UserProvider>

      <Toaster />

      <Offline>
        <div className="p-4 fixed right-8 bottom-8 z-50 rounded-lg shadow bg-gray-200 text-gray-600 font-semibold">
          <i className="fa-solid fa-wifi me-2 text-red-600"></i>
          <span>Check Your Internet Connection</span>
        </div>
      </Offline>
    </>
  );
}
