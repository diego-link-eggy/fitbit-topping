"use client";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Fitbit Data Manager</h1>
      <Link
        href={`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_REDIRECT_URI!)}&scope=weight&expires_in=604800`}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Login with Fitbit
      </Link>
    </div>
  );
}
