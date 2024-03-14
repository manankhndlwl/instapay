'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppSelector } from "@/lib/redux/store";

// Function to generate a random 3-digit order number
const generateOrderNumber = () => {
  return Math.floor(100 + Math.random() * 900);
};

// Function to randomly select an order status
const getRandomOrderStatus = () => {
  const statuses = ['Pending', 'Completed', 'Failed'];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const Page = ({
  params,
}: {
  params: { type: string }
}) => {
  const total = useAppSelector((state) => state.payment.total);
  const orderNumber = generateOrderNumber();
  const orderStatus = getRandomOrderStatus();
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow mt-8">
        <h1 className="text-2xl font-semibold mb-4">Order Confirmation</h1>
        <div className="border-t border-b py-4">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p className="mb-2">Order Number: {orderNumber}</p>
          <p className="mb-2">Payment Method: {params?.type}</p>
          <p className="mb-2">Total: ${total}</p>
          <p className={`${orderStatus === 'Completed' ? 'text-green-600' : 'text-red-600' }`}>
            Your transaction status: {orderStatus}
          </p>
        </div>
      </section>
    </div>
  );
}

export default Page;
