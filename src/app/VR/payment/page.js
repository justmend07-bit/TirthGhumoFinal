import { redirect } from "next/navigation";
import Payment from "@/component/virtual-darshan/payment";

export default async function PaymentPage({ searchParams }) {
  const orderId = searchParams?.orderId;

  // 1️⃣ No orderId → no access
  if (!orderId) {
    redirect("/vr-darshan");
  }

  // 2️⃣ Verify orderId with backend
  const res = await fetch(
    `${process.env.API_BASE_URL}/registrations/${orderId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    redirect("/vr-darshan");
  }

  const registration = await res.json();

  // 3️⃣ Only allow if status is PENDING
  if (registration.status !== "PENDING") {
    redirect("/vr-darshan");
  }

  return (
    <main>
      <Payment
        orderId={orderId}
        amount={registration.total_amount} // 👈 backend source of truth
      />
    </main>
  );
}
