export const runtime = "nodejs"; // ✅ Ensures Node.js runtime (needed for Buffer & Nodemailer)

import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // ✅ Parse form data
    const formData = await req.formData();

    const screenshot = formData.get("payment_screenshot");
    const fullName = formData.get("full_name");
    const email = formData.get("email_address");

    if (!screenshot || !fullName || !email) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // ✅ Convert screenshot to Base64 for email embedding
    const base64Screenshot = await fileToBase64(screenshot);

    // ✅ Configure mail transporter (using Gmail SMTP or App Password)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password (not your regular password)
      },
    });

    // ✅ Base URL for approval links
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://www.tirthghumo.com";

    // ✅ Available price options for admin
    const priceOptions = [500,739,899,909,939];

    // ✅ Generate dynamic approval links
    const priceButtons = priceOptions
  .map(
    (p) => `
      <a href="${baseUrl}/api/approved?email=${encodeURIComponent(
        email
      )}&name=${encodeURIComponent(
        fullName
      )}&status=accept&price=${p}"
        style="
          display:block;
          width:100%;
          max-width:250px;
          padding:12px 0;
          margin:8px 0;
          background:#10B981;
          color:white;
          text-align:center;
          text-decoration:none;
          border-radius:6px;
          font-size:16px;
        ">
        Approve ₹${p}
      </a>`
  )
  .join("");


    // ✅ Decline button
    const declineButton = `
  <a href="${baseUrl}/api/approved?email=${encodeURIComponent(
    email
  )}&name=${encodeURIComponent(
    fullName
  )}&status=decline"
     style="
        display:block;
        width:100%;
        max-width:250px;
        padding:12px 0;
        margin:8px 0;
        background:#EF4444;
        color:white;
        text-align:center;
        text-decoration:none;
        border-radius:6px;
        font-size:16px;
     ">
     Decline
  </a>
`;


    // ✅ Email content (HTML)
    const htmlBody = `
      <div style="font-family:Arial,sans-serif; line-height:1.6;">
        <h2 style="color:#ff6600;">🧾 New Registration Request</h2>
        <p><b>Name:</b> ${fullName}<br><b>Email:</b> ${email}</p>

        <p style="margin-top:10px;">Choose an approval amount:</p>
        <div style="margin-top:10px;">${priceButtons} ${declineButton}</div>

        <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">
        <p><b>Attached:</b> Payment Screenshot</p>
        <img src="cid:screenshot" width="300" alt="Payment Screenshot"
             style="margin-top:10px; border:1px solid #ddd; border-radius:6px;" />

        <p style="margin-top:20px; color:gray; font-size:12px;">
          ⚠️ Please review the payment screenshot carefully before approving.
        </p>
      </div>
    `;

    // ✅ Mail options
    const mailOptions = {
      from: `"TirthGhumo" <${process.env.EMAIL_USER}>`,
      to: "tirthghumo@gmail.com", // Admin email(s)
      subject: `Approval needed: ${fullName}`,
      html: htmlBody,
      attachments: [
        {
          filename: screenshot.name || "payment_screenshot.jpg",
          content: base64Screenshot,
          encoding: "base64",
          cid: "screenshot", // for inline <img src="cid:screenshot" />
        },
      ],
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    // ✅ Return response to frontend
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending admin email:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Helper — convert uploaded file to Base64 string
async function fileToBase64(file) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer.toString("base64");
}
