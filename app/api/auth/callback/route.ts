import { NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

const CLIENT_ID = process.env.FITBIT_CLIENT_ID!;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI!;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    // Redirect to Fitbit authorization
    const authUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=weight%20activity%20profile&expires_in=604800`;
    return NextResponse.redirect(authUrl);
  }

  // Exchange code for tokens
  const params = new URLSearchParams();
  params.append("client_id", CLIENT_ID);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", REDIRECT_URI);
  params.append("code", code);

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await axios.post(
    "https://api.fitbit.com/oauth2/token",
    params,
    { headers: { Authorization: `Basic ${authHeader}`, "Content-Type": "application/x-www-form-urlencoded" } }
  );

  const { access_token, refresh_token, expires_in } = response.data;

  // Save tokens in cookies
  const res = NextResponse.redirect("/dashboard");
  const cookieOptions = {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: expires_in,
  };
  res.cookies.set("access_token", access_token, cookieOptions);
  res.cookies.set("refresh_token", refresh_token, { ...cookieOptions, maxAge: 60 * 60 * 24 * 30 }); // 30 days
  return res;
}
