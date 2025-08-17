import { NextResponse } from "next/server";
import cookie from "cookie";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Clear both access and refresh cookies
  response.headers.set(
    "Set-Cookie",
    [
      cookie.serialize("fitbit_access", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }),
      cookie.serialize("fitbit_refresh", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }),
    ].join(", ")
  );

  return response;
}
