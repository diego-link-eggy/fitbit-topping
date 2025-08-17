
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default function Page() {
 


  const cookieStore = cookies();
  const accessCookie = cookieStore.get("fitbit_access")?.value;


  if (accessCookie) {
    redirect("/dashboard"); // redirect if logged in
  }



  const clientId = process.env.NEXT_PUBLIC_FITBIT_CLIENT_ID;
  const redirectUri = encodeURIComponent(
    "https://fitbit.apptopping.com/oauth/callback"
  );
  const scope = encodeURIComponent(
    "activity weight profile sleep" // adjust scopes as needed
  );

  const fitbitAuthUrl = `https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-5xl font-bold text-indigo-600 mb-4">
          Fitbit Data Manager
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Connect your Fitbit, track your fitness, and manage your data all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={fitbitAuthUrl}
            className="rounded-2xl bg-indigo-600 text-white px-6 py-3 text-lg shadow-lg hover:bg-indigo-700 transition"
          >
            Connect Fitbit
          </a>
          <button className="rounded-2xl border border-indigo-600 text-indigo-600 px-6 py-3 text-lg hover:bg-indigo-50 transition">
            Sign Up Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl text-center">
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Sync Data</h3>
          <p className="text-gray-600">
            Automatically sync your Fitbit activity, heart rate, and sleep data.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Visualize Metrics</h3>
          <p className="text-gray-600">
            See your progress with clean charts and detailed reports.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">Export & Share</h3>
          <p className="text-gray-600">
            Download your data or share insights with friends and trainers.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center text-gray-500">
        © 2025 Fitbit Data Manager. All rights reserved.
      </footer>
    </main>
  );
}
