"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log(data);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Check your email for confirmation");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-4">

        <h1 className="text-3xl font-bold text-center">
          Cashora Register
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-600 py-3 rounded-xl font-bold"
        >
          Create Account
        </button>

      </div>

    </main>
  );
}
