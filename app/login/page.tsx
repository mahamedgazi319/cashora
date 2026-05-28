"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(data);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Login successful");
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-4">

        <h1 className="text-3xl font-bold text-center">
          Cashora Login
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
          onClick={handleLogin}
          className="w-full bg-blue-600 py-3 rounded-xl font-bold"
        >
          Login
        </button>

      </div>

    </main>
  );
}
