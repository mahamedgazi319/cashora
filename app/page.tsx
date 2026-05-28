"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HomePage() {

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    async function getUser() {

      const { data, error } = await supabase.auth.getUser();

      console.log(data);
      console.log(error);

      if (data.user) {
        setUserEmail(data.user.email || "");
      }

    }

    getUser();

  }, []);

  async function handleLogout() {

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    location.reload();
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center space-y-4">

        <h1 className="text-4xl font-bold">
          Cashora
        </h1>

        {userEmail ? (
          <div className="space-y-4">

            <p className="text-green-400">
              Logged in as: {userEmail}
            </p>

            <button
              onClick={handleLogout}
              className="bg-red-600 px-6 py-3 rounded-xl font-bold"
            >
              Logout
            </button>

          </div>
        ) : (
          <p className="text-red-400">
            No user logged in
          </p>
        )}

      </div>

    </main>
  );
}
