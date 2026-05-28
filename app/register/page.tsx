"use client";

import { useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [username, setUsername] = useState("");

  const [referralInput, setReferralInput] =
    useState("");

  const [hasReferral, setHasReferral] =
    useState(true);

  const [message, setMessage] = useState("");

  function generateReferralCode() {

    const randomPart =
      Math.random()
        .toString(36)
        .substring(2, 7);

    return `cashora_${randomPart}`;

  }

  async function handleRegister() {

    setMessage("");

    if (
      !email ||
      !password ||
      !username
    ) {

      setMessage("Please fill all fields");

      return;

    }

    let referredBy = null;

    let referralOwner = null;

    if (hasReferral && referralInput) {

      const {
        data: referralUser,
        error: referralError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq(
          "referral_code",
          referralInput
        )
        .single();

      if (
        referralError ||
        !referralUser
      ) {

        setMessage(
          "Invalid referral code"
        );

        return;

      }

      referredBy = referralUser.id;

      referralOwner = referralUser;

    }

    const referralCode =
      generateReferralCode();

    const { data, error } =
      await supabase.auth.signUp({

        email,
        password,

      });

    if (error) {

      setMessage(error.message);

      return;

    }

    if (!data.user) {

      setMessage(
        "User creation failed"
      );

      return;

    }

    let starterCoins = 0;

    if (referredBy) {

      starterCoins = 100;

    }

    const { error: profileError } =
      await supabase
        .from("profiles")
        .insert([

          {
            id: data.user.id,

            username: username,

            referral_code: referralCode,

            referred_by: referredBy,

            task_coins: starterCoins,

            referral_coins: 0,

            locked_referral_coins: 0,

            withdrawable_coins: 0,

            total_coins: starterCoins,

            referrals_count: 0,

            email_verified: false,

            referral_bonus_given: false,

            task_requirement_completed: false,
          },

        ]);

    if (profileError) {

      setMessage(
        profileError.message
      );

      return;

    }

    if (referredBy && referralOwner) {

      const updatedLockedCoins =
        referralOwner.locked_referral_coins + 250;

      const updatedTotalCoins =
        referralOwner.total_coins + 250;

      const updatedReferralsCount =
        referralOwner.referrals_count + 1;

      const {
        error: referralUpdateError,
      } = await supabase
        .from("profiles")
        .update({

          locked_referral_coins:
            updatedLockedCoins,

          total_coins:
            updatedTotalCoins,

          referrals_count:
            updatedReferralsCount,

        })
        .eq(
          "id",
          referralOwner.id
        );

      if (referralUpdateError) {

        setMessage(
          referralUpdateError.message
        );

        return;

      }

      await supabase
        .from("transactions")
        .insert([

          {
            user_id: referralOwner.id,

            type: "referral_bonus",

            coins: 250,

            status: "locked",

            description:
              "Referral bonus locked",
          },

          {
            user_id: data.user.id,

            type: "welcome_bonus",

            coins: 100,

            status: "completed",

            description:
              "Referral signup bonus",
          },

        ]);

    }

    setMessage(
      "Account created successfully"
    );

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-6">

        <h1 className="text-4xl font-bold text-center">
          Create Account
        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-800"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-800"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-zinc-800"
          />

          {hasReferral && (

            <input
              type="text"
              placeholder="Referral Code"
              value={referralInput}
              onChange={(e) =>
                setReferralInput(
                  e.target.value
                )
              }
              className="w-full p-3 rounded-xl bg-zinc-800"
            />

          )}

          <button
            onClick={() =>
              setHasReferral(
                !hasReferral
              )
            }
            className="text-sm text-blue-400"
          >

            {hasReferral
              ? "I don't have a referral code"
              : "I have a referral code"}

          </button>

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 py-3 rounded-xl font-bold"
          >
            Create Account
          </button>

        </div>

        <p className="text-center text-yellow-400">
          {message}
        </p>

        <div className="text-center">

          <Link
            href="/login"
            className="text-blue-400"
          >
            Already have account?
          </Link>

        </div>

      </div>

    </main>

  );

}
