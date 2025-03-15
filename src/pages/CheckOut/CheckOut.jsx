import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/Cart.Context";
import { UserContext } from "../../context/User.Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function CheckOut() {
  const { cartInfo } = useContext(CartContext);
  const { token } = useContext(UserContext);
  const navigate = useNavigate();
  const [paymentMethod, setpaymentMethod] = useState(null)

  async function creatCashOrder(values) {
    let toastId = toast.loading("We are creating your order ...");
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
        method: "POST",
        headers: {
          token,
        },
        data: values,
      };
      let { data } = await axios.request(options);
      if (data.status == "success") {
        toast.success("Your order has been created");
        setTimeout(() => {
          navigate("/allorders");
        }, 2000);
      }
    } catch (error) {
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleOnlinePayment(values) {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
        method: 'POST',
        headers: {
          token
        },
        data: values
      }
  
      let {data} = await axios.request(options)

      if(data.status = 'success'){
        toast.loading('Redirecting you to stripe ...')
        setTimeout(()=>{
          location.href = data.session.url
        }, 2000)
      }
    } catch (error) {
      
    } finally {
      
    }
  }

  // const phoneRegex = /^(02)?01[0125][0-9]{8}$/

  // const validationSchema = object({
  //   city: string().required('City is required').min(3, "Name must be at least 3 characters"),
  //   phone: string().required("Phone is required").matches(phoneRegex, "Sorry, We accept egyptian phone numbers only")
  // })

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
    // validationSchema,
    onSubmit: (values)=>{
      if(paymentMethod == 'cash') creatCashOrder(values);
      else handleOnlinePayment(values)
    },
  });

  

  return (
    <>
      <section>
        <h1 className="text-xl text-gray-600 font-semibold mb-4">
          Shiping Address
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
          <div className="city">
            <input
              type="text"
              className="form-control w-full"
              placeholder="City"
              value={formik.values.shippingAddress.city}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              name="shippingAddress.city"
            />
            {/* {formik.errors.city && formik.touched.city && <p className="text-red-500 mt-1 text-sm">*{formik.errors.city}</p>} */}
          </div>
          <div className="phone">
            <input
              type="tel"
              className="form-control w-full"
              placeholder="Phone"
              value={formik.values.shippingAddress.phone}
              onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              name="shippingAddress.phone"
            />
            {/* {formik.errors.phone && formik.touched.phone && <p className="text-red-500 mt-1 text-sm">*{formik.errors.phone}</p>} */}
          </div>
          <div className="details">
            <textarea
              className="form-control w-full"
              placeholder="Details"
              value={formik.values.shippingAddress.details}
              onChange={formik.handleChange}
              name="shippingAddress.details"
            ></textarea>
          </div>

          <button
          onClick={()=>{
            setpaymentMethod('cash')
          }}
            type="submit"
            className="btn me-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            Cash Order
          </button>
          <button
          onClick={()=>{
            setpaymentMethod('online')
          }}
            type="submit"
            className="btn bg-lime-500 hover:bg-lime-600 text-white font-semibold"
          >
            Online Payment
          </button>
        </form>
      </section>
    </>
  );
}
