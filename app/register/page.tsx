"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister() {

    setMessage("Starting register...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    if (!data.user) {
      setMessage("User not created");
      return;
    }

    setMessage("User created in auth");

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        {
          id: data.user.id,
          username: username,
        },
      ]);

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    setMessage("Profile created successfully");

  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-4">

        <h1 className="text-3xl font-bold text-center">
          Cashora Register
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

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

        <p className="text-center text-sm text-yellow-400">
          {message}
        </p>

      </div>

    </main>
  );
}
