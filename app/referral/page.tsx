"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function ReferralPage() {

  const [referralCode, setReferralCode] =
    useState("");

  const [referralsCount, setReferralsCount] =
    useState(0);

  const [lockedCoins, setLockedCoins] =
    useState(0);

  const [inviteLink, setInviteLink] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {

    async function loadReferralData() {

      const { data: userData } =
        await supabase.auth.getUser();

      if (!userData.user) {
        return;
      }

      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single();

      if (profileData) {

        setReferralCode(
          profileData.referral_code
        );

        setReferralsCount(
          profileData.referrals_count
        );

        setLockedCoins(
          profileData.locked_referral_coins
        );

        setInviteLink(
          `${window.location.origin}/register?ref=${profileData.referral_code}`
        );

      }

    }

    loadReferralData();

  }, []);

  async function copyCode() {

    await navigator.clipboard.writeText(
      referralCode
    );

    setMessage(
      "Referral code copied"
    );

  }

  async function copyInviteLink() {

    await navigator.clipboard.writeText(
      inviteLink
    );

    setMessage(
      "Invite link copied"
    );

  }

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-6">

        <h1 className="text-4xl font-bold text-center">
          Referral System
        </h1>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400 text-sm">
            Referral Code
          </p>

          <p className="text-xl font-bold text-yellow-400 break-all">
            {referralCode}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400 text-sm">
            Invite Link
          </p>

          <p className="text-sm break-all">
            {inviteLink}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400 text-sm">
            Total Referrals
          </p>

          <p className="text-2xl font-bold">
            {referralsCount}
          </p>

        </div>

        <div className="bg-zinc-800 p-4 rounded-xl">

          <p className="text-gray-400 text-sm">
            Locked Referral Coins
          </p>

          <p className="text-2xl font-bold text-orange-400">
            {lockedCoins} Coins
          </p>

        </div>

        <button
          onClick={copyCode}
          className="w-full bg-blue-600 py-3 rounded-xl font-bold"
        >
          Copy Referral Code
        </button>

        <button
          onClick={copyInviteLink}
          className="w-full bg-purple-600 py-3 rounded-xl font-bold"
        >
          Copy Invite Link
        </button>

        <div className="bg-zinc-800 p-4 rounded-xl space-y-2">

          <h2 className="text-xl font-bold">
            Referral Rules
          </h2>

          <p className="text-sm text-gray-300">
            • Invite users using your referral code
          </p>

          <p className="text-sm text-gray-300">
            • You receive 250 locked coins
          </p>

          <p className="text-sm text-gray-300">
            • New users receive 100 coins
          </p>

          <p className="text-sm text-gray-300">
            • Locked coins unlock after requirements are completed
          </p>

        </div>

        <Link
          href="/"
          className="block w-full bg-green-600 py-3 rounded-xl text-center font-bold"
        >
          Back To Dashboard
        </Link>

        <p className="text-center text-yellow-400 text-sm">
          {message}
        </p>

      </div>

    </main>

  );

}
