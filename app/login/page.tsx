"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const router = useRouter();

  const [loginInput, setLoginInput] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  /*
    Redirect if already logged in
  */

  useEffect(() => {

    async function checkUser() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {

        router.replace("/");

      }

    }

    checkUser();

  }, [router]);

  function isValidEmail(
    value: string
  ) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );

  }

  async function handleLogin() {

    try {

      if (loading) {
        return;
      }

      setMessage("");

      const normalizedInput =
        loginInput.trim();

      const normalizedPassword =
        password.trim();

      if (
        !normalizedInput ||
        !normalizedPassword
      ) {

        setMessage(
          "Please fill all fields"
        );

        return;

      }

      let emailToUse =
        normalizedInput.toLowerCase();

      const isEmail =
        normalizedInput.includes("@");

      /*
        Login using username
      */

      if (!isEmail) {

        const {
          data: profileData,
          error: profileError,
        } = await supabase
          .from("profiles")
          .select("email")
          .eq(
            "username",
            normalizedInput
          )
          .maybeSingle();

        if (
          profileError ||
          !profileData
        ) {

          setMessage(
            "Invalid login credentials"
          );

          return;

        }

        emailToUse =
          profileData.email;

      } else {

        /*
          Validate email format
        */

        if (
          !isValidEmail(
            emailToUse
          )
        ) {

          setMessage(
            "Invalid email format"
          );

          return;

        }

      }

      setLoading(true);

      const {
        error: loginError,
      } = await supabase.auth.signInWithPassword({

        email: emailToUse,

        password:
          normalizedPassword,

      });

      if (loginError) {

        setMessage(
          "Invalid login credentials"
        );

        return;

      }

      setMessage(
        "Login successful"
      );

      setTimeout(() => {

        router.push("/");

      }, 800);

    } catch (error) {

      console.log(error);

      setMessage(
        "Unexpected error occurred"
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-5 shadow-xl border border-zinc-800">

        <h1 className="text-3xl font-bold text-center">

          Cashora Login

        </h1>

        <p className="text-center text-gray-400 text-sm">

          Login using email or username

        </p>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Email or Username"
            value={loginInput}
            onChange={(e) =>
              setLoginInput(
                e.target.value
              )
            }
            autoComplete="username"
            className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-blue-500 transition-colors"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            autoComplete="current-password"
            className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-blue-500 transition-colors"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >

            {loading
              ? "Loading..."
              : "Login"}

          </button>

        </div>

        {message && (

          <p className="text-center text-sm text-yellow-400">

            {message}

          </p>

        )}

        <div className="text-center text-sm">

          <Link
            href="/register"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >

            Don't have an account?

          </Link>

        </div>

      </div>

    </main>

  );

}
