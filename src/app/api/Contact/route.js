import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    // --- Determine Final Destination ---
    const finalDestination =
      body.destination === "other"
        ? body.custom_destination
        : body.destination;

    // --- Determine Referral ---
    const finalReferral =
      body.referral_source === "other"
        ? body.referral_other
        : body.referral_source;

    // -------- 1️⃣ SEND DATA TO YOUR BACKEND -------- //
    const backendResponse = await fetch(process.env.BACKEND_ENQUIRY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        destination: finalDestination,
        referral: finalReferral,
      }),
    });

    if (!backendResponse.ok) {
      throw new Error("Failed to send data to backend");
    }

    // -------- 2️⃣ SEND EMAIL TO ADMIN -------- //
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD, // Gmail App Password
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: "📩 New Travel Enquiry Received",
      html: `
        <h2>New Travel Enquiry</h2>
        <p><strong>Name:</strong> ${body.full_name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        
        <p><strong>Destination:</strong> ${finalDestination}</p>

        <p><strong>Travel Date:</strong> ${body.start_date}</p>
        <p><strong>Adults:</strong> ${body.adults}</p>
        <p><strong>Children:</strong> ${body.children}</p>

        <p><strong>Departure City:</strong> ${body.departure_city}</p>

        <p><strong>How They Heard About Us:</strong> ${finalReferral}</p>

        <p><strong>Special Request:</strong> ${
          body.special_request || "None"
        }</p>

        <br/>
        <p>This enquiry was submitted from your website Contact Page.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json(
      { success: true, message: "Enquiry submitted successfully" },
      { status: 200 }
    );

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
}
