'use client'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useAppSelector } from "@/lib/redux/store";
import Link from "next/link";

export default function Payment() {
  const payments = useAppSelector((state) => state.payment.paymentMethods);
  const total = useAppSelector((state) => state.payment.total);
  console.log(total)
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <section className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow mt-8">
        <h1 className="text-2xl font-semibold mb-4">Payment Options</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {payments?.map((method) => {
            return (
              <>
                <Card className="w-full">
                  <CardContent>
                    <h2 className="text-lg font-semibold">{method}</h2>
                    <p>Pay using {method}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Link href={`/order/${method}`} >
                    <Button variant="outline">Select</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </>
            );
          })}
        </div>
      </section>
    </div>
  );
}
