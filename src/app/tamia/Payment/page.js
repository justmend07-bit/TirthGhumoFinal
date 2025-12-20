"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem("booking");
    if (!data) {
      router.push("/");
    } else {
      setBookingData(JSON.parse(data));
    }
  }, [router]);

  if (!bookingData) return null;

  return (
    <main>
      <h1>Payment</h1>
      <p>Total: ₹{bookingData.totalAmount}</p>

      <button onClick={() => router.push("/success")}>
        Payment Done
      </button>
    </main>
  );
}
