import { google } from "@/lib/auth";
import { generateState, generateCodeVerifier } from "arctic";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  
  const existingState = cookieStore.get("oauth_state")?.value;
  if (existingState) {
    const existingUrl = cookieStore.get("oauth_url")?.value;
    if (existingUrl) {
      return NextResponse.redirect(existingUrl);
    }
  }

  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "openid",
    "profile",
    "email",
  ]);

  const urlString = url.toString();
  const response = NextResponse.redirect(urlString);
  
  response.cookies.set("oauth_state", state, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  response.cookies.set("code_verifier", codeVerifier, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  response.cookies.set("oauth_url", urlString, {
    httpOnly: true,
    maxAge: 600,
    path: "/",
    sameSite: "lax",
    secure: true,
  });
  
  return response;
}