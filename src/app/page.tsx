"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";
import { useAppDispatch } from "@/lib/redux/store";
import { addPaymentMethod,setTotal } from "@/lib/redux/paymentSlice";
import { calculateTotalPrice } from "@/lib/CalculateTotal";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const dispatch = useAppDispatch();

  let data;

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        "https://groww-intern-assignment.vercel.app/v1/api/order-details"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await response.json();
      setProducts(data?.products);
      const total:number = calculateTotalPrice(data?.products);
      dispatch(addPaymentMethod(data?.paymentMethods));
      dispatch(setTotal(total));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow ">
        {loading ? (
          <>
            <div className="flex justify-center items-center h-full">
              <Loading />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" />
            {products?.length > 0 ? (
              <>
                <div className="border-t border-b py-4">
                  <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
                  <div>
                    {products.map((product) => {
                      return (
                        <>
                          <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <img
                              className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                              src={product?.image}
                              alt=""
                            />
                            <div className="flex w-full flex-col px-4 py-4">
                              <span className="font-semibold">
                                {product?.title}
                              </span>
                              <span className="float-right text-gray-400">
                                Quantity : {product?.quantity}
                              </span>
                              <p className="text-lg font-bold">
                                ${product?.price}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                    <p className="mb-2 font-bold text-black">
                      Total: $ {calculateTotalPrice(products)}{" "}
                    </p>
                  </div>
                  <Link href="/payment">
                    <Button className="w-full">Proceed to Payment</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-lg">Your cart is empty.</p>
                  <Button className="mt-4">Continue Shopping</Button>
                </div>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}
