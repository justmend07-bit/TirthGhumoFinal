export const runtime = "nodejs";

import nodemailer from "nodemailer";
// import { generateInvoicePDF } from "@/lib/pdf";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const status = searchParams.get("status");
  const price = searchParams.get("price");
  const name = searchParams.get("name") || "Valued Customer"; // Optional name param


  if (!email || !status) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }


  if (status === "decline") {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const date = new Date().toLocaleDateString("en-IN", {
  timeZone: "Asia/Kolkata",
});

const time = new Date().toLocaleTimeString("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
});

    const dateTime = `${date} — ${time}`;
    const safeName = name ? name : "there";

    // Send decline email to the user
    await transporter.sendMail({
      from: `"TirthGhumo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Update on Your TirthGhumo Booking",
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.6; padding:20px;">
          <p>Date: <b>${dateTime}</b></p>
          
          <p>Hey ${safeName},</p>

          <p>
            Thank you for choosing <b>TirthGhumo</b> for your adventure.  
            We wanted to let you know that we've reviewed your recent booking attempt.  
            Unfortunately, we couldn’t verify the payment details on our end.
          </p>

          <p>
            This might be due to a mismatch in the transaction ID or some other discrepancy.
          </p>

          <p>
            If you believe this is an error, please feel free to reach out to us at  
            <b>6260499299 / 6204289831</b> — we’ll be happy to help resolve the issue.
          </p>

          <p>
            We appreciate your understanding and hope to welcome you on another adventure soon.
          </p>

          <p style="margin-top:10px;">
            Warm regards,<br/>
            <b>Team TirthGhumo</b>
          </p>

        </div>
      `,
    });

    // Admin confirmation page
    return new NextResponse(
      `<html><body style="font-family:Arial; text-align:center; padding:50px;">
         <h2 style="color:red;">Registration Declined</h2>
         <p>A decline email has been sent to <b>${email}</b>.</p>
       </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );

  } catch (err) {
    console.error("Decline email error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

  try {
    

    //Configure mail transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
   const date = new Date().toLocaleDateString("en-IN", {
  timeZone: "Asia/Kolkata",
});

const time = new Date().toLocaleTimeString("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
});

    const dateTime = `${date} — ${time}`;
    if (Number(price) === 500) {
      await transporter.sendMail({
        from: `"TirthGhumo" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Partial Payment Received – Action Required",
        html: `
          <div style="font-family:Arial, sans-serif; line-height:1.6; padding:20px;">
            <p>Date: <b>${dateTime}</b></p>
            <h2 style="color:#ff6600;">Hey ${name} 🌿</h2>

            <p>
              We have received your <b>partial payment of ₹500</b> for 
              <b>1 Day Mrignnath Trek on 7th December</b>.
            </p>
              
            <p>
              All essential trip details, including timings and instructions, 
              will be shared shortly on <b>WhatsApp</b>.  
              Please make sure you’ve requested to join the WhatsApp group, 
              as all updates will be shared there.
            </p>

            <p>
              Please ensure that you complete the <b>remaining payment</b> 
              <u>at least 2 days before the trek</u> 
              for a smooth and hassle-free trekking experience.
            </p>

            <p>
              Only after the <b>complete payment</b>, your trek seat will be fully confirmed.
            </p>

            <p>
              Get ready for an exciting adventure and a day full of unforgettable memories! 🌄
            </p>

            <p>
              For assistance, contact us at 
              <b>6260499299</b> / <b>6204289831</b>.
            </p>

            <p style="margin-top:10px;">
              Warm regards,<br/>
              <b>Team TirthGhumo</b>
            </p>
          </div>
        `,
      });

      return new NextResponse(
        `<html><body style="font-family:Arial; text-align:center; padding:50px;">
          <h2 style="color:green;">Partial Payment Approved!</h2>
          <p>A partial payment email has been sent to <b>${email}</b>.</p>
        </body></html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }
    await transporter.sendMail({
      from: `"TirthGhumo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your TirthGhumo One-Day Trek Booking is Confirmed! ",
      html: `
        <div style="font-family:Arial, sans-serif; line-height:1.6; padding:20px;">
          <h2 style="color:#ff6600;">Hey ${name} 🌿</h2>
          <p>
            Great news — your booking for the <b>1Day Mrignnath Trek</b> with TirthGhumo is <b>confirmed</b> for <b>7th December 2025!</b>

          </p>
          <p> Your payment has been approved successfully on <b>${dateTime}</b> </p> 
          <p>
            All essential trip details, including timings and instructions, will be shared shortly on WhatsApp.
            Please make sure you’ve requested to join the WhatsApp group, as all updates will be shared there.
            <br/>
            If you need any help or have questions, feel free to contact us at <b>6260499299 / 6204289831</b>.
            <br/>
            Get ready for an exciting adventure and a day full of unforgettable memories!
            <br/>
            Warm regards,
            Team TirthGhumo
          </p>
          <p>Thank you for choosing <b>TirthGhumo</b> — Aastha Bhi, Suvidha Bhi 🌄</p>
        </div>
      `,
      
    });

    //Confirmation page for admin
    return new NextResponse(
      `<html><body style="font-family:Arial; text-align:center; padding:50px;">
        <h2 style="color:green;">...Approved Successfully!</h2>
        <p>Invoice of <b>${price}</b> has been sent to <b>${email}</b>.</p>
        <p>Thank you for confirming this registration.</p>
      </body></html>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (error) {
    console.error("❌ Error sending invoice:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
