import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const form = await req.formData();

    // Convert simple fields
    const data = Object.fromEntries(form.entries());

    // Multi-select roles
    const roles = form.getAll("roles");

    // Files
    const aadhar = form.get("aadhar_front");
    const profile = form.get("profile_photo");

    if (!aadhar || !profile) {
      return NextResponse.json(
        { success: false, message: "Missing required files" },
        { status: 400 }
      );
    }

    // Convert to buffers
    const toBuffer = async (file) =>
      Buffer.from(await file.arrayBuffer());

    const aadharBuffer = await toBuffer(aadhar);
    const profileBuffer = await toBuffer(profile);

    console.log("New Sarthi Application:", {
      ...data,
      roles,
      aadharFile: aadhar.name,
      profileFile: profile.name,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );a
  }
}
