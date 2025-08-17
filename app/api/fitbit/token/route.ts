import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const params = new URLSearchParams({
    client_id: process.env.FITBIT_CLIENT_ID!,
    grant_type: "authorization_code",
    redirect_uri: "https://fitbit.apptopping.com/oauth/callback",
    code,
  });

  const res = await fetch("https://api.fitbit.com/oauth2/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });

  const data = await res.json();



if (data.access_token && data.refresh_token) {
    const response = NextResponse.json({ success: true });
    
    response.headers.set(
      "Set-Cookie",
      [
        cookie.serialize("fitbit_access", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: data.expires_in,
        }),
        cookie.serialize("fitbit_refresh", data.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30, // refresh token ~30 days
        }),
      ].join(", ")
    );

    return response;
  }

  return NextResponse.json(data);
}


