import { NextResponse } from "next/server";
import axios from "axios";

const CLIENT_ID = process.env.FITBIT_CLIENT_ID!;
const CLIENT_SECRET = process.env.FITBIT_CLIENT_SECRET!;

export async function POST(req: Request) {
  const { refresh_token } = await req.json();
  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refresh_token);

  const authHeader = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");

  const response = await axios.post(
    "https://api.fitbit.com/oauth2/token",
    params,
    { headers: { Authorization: `Basic ${authHeader}`, "Content-Type": "application/x-www-form-urlencoded" } }
  );

  return NextResponse.json(response.data);
}
