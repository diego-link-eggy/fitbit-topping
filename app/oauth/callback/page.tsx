"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FitbitCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("OAuth error:", error);
      return;
    }

    if (code) {
      // Send code to your backend API to exchange for access token
      fetch("/api/fitbit/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then(() => router.push("/dashboard")) // redirect to dashboard
        .catch((err) => console.error(err));
    }
  }, [searchParams, router]);

  return <p>Connecting your Fitbit account...</p>;
}
