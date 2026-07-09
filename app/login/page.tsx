"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const role = (session?.user as any)?.role;

      if (role === "ADMIN") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [status, session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password");
      return;
    }

    // Session will update and useEffect will redirect
    router.refresh();
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-600">
            Sign in to continue your journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a
            href="/forgot-password"
            className="text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>

        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-slate-500 mb-4">
            Or continue with
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                signIn("google", {
                  callbackUrl: "/login",
                })
              }
              className="border rounded-lg py-3 hover:bg-slate-50"
            >
              Google
            </button>

            <button
              type="button"
              onClick={() =>
                signIn("github", {
                  callbackUrl: "/login",
                })
              }
              className="border rounded-lg py-3 hover:bg-slate-50"
            >
              GitHub
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}