"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

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

  async function handleLogin() {

    if (!loginInput || !password) {

      setMessage(
        "Please fill all fields"
      );

      return;

    }

    setLoading(true);

    setMessage("");

    let emailToUse = loginInput;

    const isEmail =
      loginInput.includes("@");

    /*
      اذا المستخدم ادخل اسم مستخدم
      نقوم بجلب البريد المرتبط به
    */

    if (!isEmail) {

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("email")
        .eq("username", loginInput)
        .single();

      if (profileError || !profileData) {

        setLoading(false);

        setMessage(
          "Username not found"
        );

        return;

      }

      emailToUse =
        profileData.email;

    }

    const {
      error: loginError,
    } = await supabase.auth.signInWithPassword({

      email: emailToUse,

      password,

    });

    setLoading(false);

    if (loginError) {

      setMessage(
        loginError.message
      );

      return;

    }

    setMessage(
      "Login successful"
    );

    setTimeout(() => {

      router.push("/");

    }, 1000);

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-5 shadow-xl">

        <h1 className="text-3xl font-bold text-center">

          Cashora Login

        </h1>

        <p className="text-center text-gray-400 text-sm">

          Login using email or username

        </p>

        <input
          type="text"
          placeholder="Email or Username"
          value={loginInput}
          onChange={(e) =>
            setLoginInput(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-blue-500"
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
          className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-blue-500"
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition-colors py-3 rounded-xl font-bold disabled:opacity-50"
        >

          {loading
            ? "Loading..."
            : "Login"}

        </button>

        {message && (

          <p className="text-center text-sm text-yellow-400">

            {message}

          </p>

        )}

      </div>

    </main>

  );

}
