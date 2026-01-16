"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log({ email, password });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen  items-center justify-center bg-[#F5EDDE] px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="bg-[#e6d9c1] px-6 py-8 shadow rounded-xl ">
          <div className="space-y-2">
            <Link
              href="/"
              className="text-4xl md:text-5xl font-bold text-[#39180F] text-center "
            >
              <h1 className="mb-5"> Nubuke</h1>
            </Link>
            <p className="text-[#39180F] text-lg font-bold">Sign in</p>
            <p className="text-[#39180F] text-sm">
              Sign in or create an account
            </p>

            <button className="btn btn-primary w-full text-[16px] py-6 rounded-lg  font-semibold">
              Continue with shop{" "}
            </button>
          </div>
          <div className="divider text-xs text-[#39180F]">OR</div>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border py-2.5 px-2 text-[#39180F]   border-[#c9c2c1]  placeholder:[#39180F] focus:ring-2 focus:ring-inset focus:ring-[#39180F] outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="
                text-center w-full border py-4 rounded-lg bg-[#39180F]
                disabled:opacity-50 cursor-pointer hover:bg-[#250d07]  disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
