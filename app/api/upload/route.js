import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("photo") || formData.get("logo");

  const filename = `${Date.now()}-${file.name}`;
  const { url } = await put(filename, file, { access: "public" });

  return NextResponse.json({ url });
}
