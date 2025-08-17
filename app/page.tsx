import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LandingPage() {
  // ✅ Server Component: synchronous cookies()
  const cookieStore = await cookies(); // <-- await here
  const accessToken = cookieStore.get("fitbit_access")?.value;

  if (accessToken) {
    redirect("/dashboard"); // auto-redirect if logged in
  }

  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_APP_URL}/oauth/callback`);
  const scope = encodeURIComponent("activity heartrate sleep profile");

  const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <h1 className="text-5xl font-bold text-indigo-600 mb-4">Fitbit Data Manager</h1>
      <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
        Connect your Fitbit, track your fitness, and manage your data all in one place.
      </p>
      <a
        href={fitbitAuthUrl}
        className="rounded-2xl bg-indigo-600 text-white px-6 py-3 text-lg shadow-lg hover:bg-indigo-700 transition"
      >
        Connect Fitbit
      </a>
    </main>
  );
}
