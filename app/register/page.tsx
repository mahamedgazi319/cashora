"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [referralInput, setReferralInput] =
    useState("");

  const [hasReferral, setHasReferral] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  function generateReferralCode() {

    const randomPart =
      crypto.randomUUID()
        .replaceAll("-", "")
        .slice(0, 10);

    return `cashora_${randomPart}`;

  }

  function validateUsername(
    value: string
  ) {

    const usernameRegex =
      /^[a-zA-Z0-9_]{3,20}$/;

    return usernameRegex.test(value);

  }

  function validatePassword(
    value: string
  ) {

    return value.length >= 8;

  }

  async function handleRegister() {

    try {

      setLoading(true);

      setMessage("");

      const normalizedEmail =
        email
          .trim()
          .toLowerCase();

      const normalizedUsername =
        username.trim();

      const normalizedReferral =
        referralInput.trim();

      if (
        !normalizedEmail ||
        !password ||
        !normalizedUsername
      ) {

        setMessage(
          "Please fill all fields"
        );

        return;

      }

      if (
        !validateUsername(
          normalizedUsername
        )
      ) {

        setMessage(
          "Username must be 3-20 characters and contain only letters, numbers, and underscores"
        );

        return;

      }

      if (
        !validatePassword(password)
      ) {

        setMessage(
          "Password must be at least 8 characters"
        );

        return;

      }

      /*
        Check username uniqueness
      */

      const {
        data: existingUsername,
      } = await supabase
        .from("profiles")
        .select("id")
        .eq(
          "username",
          normalizedUsername
        )
        .maybeSingle();

      if (existingUsername) {

        setMessage(
          "Username already taken"
        );

        return;

      }

      let referredBy = null;

      let referralOwner = null;

      /*
        Validate referral code
      */

      if (
        hasReferral &&
        normalizedReferral
      ) {

        const {
          data: referralUser,
          error: referralError,
        } = await supabase
          .from("profiles")
          .select("*")
          .eq(
            "referral_code",
            normalizedReferral
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

        referredBy =
          referralUser.id;

        referralOwner =
          referralUser;

      }

      /*
        Create unique referral code
      */

      let referralCode =
        generateReferralCode();

      let isUnique = false;

      while (!isUnique) {

        const {
          data: existingCode,
        } = await supabase
          .from("profiles")
          .select("id")
          .eq(
            "referral_code",
            referralCode
          )
          .maybeSingle();

        if (!existingCode) {

          isUnique = true;

        } else {

          referralCode =
            generateReferralCode();

        }

      }

      /*
        Create auth user
      */

      const {
        data,
        error,
      } = await supabase.auth.signUp({

        email: normalizedEmail,

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

      /*
        Starter bonus
      */

      let starterCoins = 0;

      if (referredBy) {

        starterCoins = 100;

      }

      /*
        Create profile
      */

      const {
        error: profileError,
      } = await supabase
        .from("profiles")
        .insert([

          {

            id: data.user.id,

            username:
              normalizedUsername,

            referral_code:
              referralCode,

            referred_by:
              referredBy,

            task_coins:
              starterCoins,

            referral_coins: 0,

            locked_referral_coins: 0,

            withdrawable_coins: 0,

            total_coins:
              starterCoins,

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

      /*
        Referral reward logic
      */

      if (
        referredBy &&
        referralOwner
      ) {

        const updatedLockedCoins =
          (
            referralOwner.locked_referral_coins || 0
          ) + 250;

        const updatedTotalCoins =
          (
            referralOwner.total_coins || 0
          ) + 250;

        const updatedReferralsCount =
          (
            referralOwner.referrals_count || 0
          ) + 1;

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

        if (
          referralUpdateError
        ) {

          console.log(
            referralUpdateError
          );

        }

        await supabase
          .from("transactions")
          .insert([

            {

              user_id:
                referralOwner.id,

              type:
                "referral_bonus",

              coins: 250,

              status: "locked",

              description:
                "Referral bonus locked",

            },

            {

              user_id:
                data.user.id,

              type:
                "welcome_bonus",

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

      setEmail("");

      setPassword("");

      setUsername("");

      setReferralInput("");

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

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-6 shadow-xl">

        <h1 className="text-4xl font-bold text-center">

          Create Account

        </h1>

        <div className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-green-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-green-500"
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
            className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-green-500"
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
              className="w-full p-3 rounded-xl bg-zinc-800 outline-none border border-zinc-700 focus:border-green-500"
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
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 transition-colors py-3 rounded-xl font-bold disabled:opacity-50"
          >

            {loading
              ? "Creating account..."
              : "Create Account"}

          </button>

        </div>

        {message && (

          <p className="text-center text-yellow-400 text-sm">

            {message}

          </p>

        )}

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
