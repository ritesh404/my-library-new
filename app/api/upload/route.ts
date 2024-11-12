import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const url = await uploadToCloudinary(file);
  console.log(url);

  return NextResponse.json({ success: true, url });
}
