"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

interface Transaction {

  id: number;

  type: string;

  coins: number;

  created_at: string;

}

export default function HomePage() {

  const [userId, setUserId] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [taskCoins, setTaskCoins] =
    useState(0);

  const [totalCoins, setTotalCoins] =
    useState(0);

  const [referralCoins, setReferralCoins] =
    useState(0);

  const [
    withdrawableCoins,
    setWithdrawableCoins,
  ] = useState(0);

  const [referralCode, setReferralCode] =
    useState("");

  const [referralsCount, setReferralsCount] =
    useState(0);

  const [
    lockedReferralCoins,
    setLockedReferralCoins,
  ] = useState(0);

  const [lastClaim, setLastClaim] =
    useState<string | null>(null);

  const [message, setMessage] =
    useState("");

  const [transactions, setTransactions] =
    useState<Transaction[]>([]);

  useEffect(() => {

    async function loadUser() {

      const { data: userData } =
        await supabase.auth.getUser();

      if (!userData.user) {
        return;
      }

      setUserId(userData.user.id);

      setEmail(
        userData.user.email || ""
      );

      const {
        data: profileData,
        error,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (error) {

        console.log(error);

        return;

      }

      if (profileData) {

        setUsername(
          profileData.username
        );

        setTaskCoins(
          profileData.task_coins || 0
        );

        setTotalCoins(
          profileData.total_coins || 0
        );

        setReferralCoins(
          profileData.referral_coins || 0
        );

        setWithdrawableCoins(
          profileData.withdrawable_coins || 0
        );

        setReferralCode(
          profileData.referral_code
        );

        setReferralsCount(
          profileData.referrals_count
        );

        setLockedReferralCoins(
          profileData.locked_referral_coins
        );

        setLastClaim(
          profileData.last_claim
        );

      }

      const { data: transactionData } =
        await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", userData.user.id)
          .order("created_at", {
            ascending: false,
          });

      if (transactionData) {

        setTransactions(
          transactionData
        );

      }

    }

    loadUser();

  }, []);

  async function claimDailyReward() {

    if (!userId) {

      setMessage(
        "User not found"
      );

      return;

    }

    if (lastClaim) {

      const lastClaimTime =
        new Date(lastClaim).getTime();

      const currentTime =
        new Date().getTime();

      const hoursPassed =
        (currentTime - lastClaimTime)
        / (1000 * 60 * 60);

      if (hoursPassed < 24) {

        const remainingHours =
          Math.ceil(
            24 - hoursPassed
          );

        setMessage(
          `You must wait ${remainingHours} more hours`
        );

        return;

      }

    }

    const rewardCoins = 500;

    const updatedTaskCoins =
      taskCoins + rewardCoins;

    const updatedTotalCoins =
      totalCoins + rewardCoins;

    const claimTime =
      new Date().toISOString();

    const {
      error: profileError,
    } = await supabase
      .from("profiles")
      .update({

        task_coins:
          updatedTaskCoins,

        total_coins:
          updatedTotalCoins,

        last_claim:
          claimTime,

      })
      .eq("id", userId);

    if (profileError) {

      setMessage(
        profileError.message
      );

      return;

    }

    const {
      data: newTransaction,
      error: transactionError,
    } = await supabase
      .from("transactions")
      .insert([

        {

          user_id: userId,

          type: "daily_reward",

          coins: rewardCoins,

          description:
            "Daily reward claimed",

        },

      ])
      .select()
      .single();

    if (transactionError) {

      setMessage(
        transactionError.message
      );

      return;

    }

    setTransactions([

      newTransaction,

      ...transactions,

    ]);

    setTaskCoins(
      updatedTaskCoins
    );

    setTotalCoins(
      updatedTotalCoins
    );

    setLastClaim(
      claimTime
    );

    setMessage(
      "Daily reward claimed successfully"
    );

  }

  async function handleLogout() {

    await supabase.auth.signOut();

    location.reload();

  }

  async function copyReferralCode() {

    await navigator.clipboard.writeText(
      referralCode
    );

    setMessage(
      "Referral code copied"
    );

  }

  const estimatedUsd =
    (totalCoins / 1000).toFixed(2);

  const canWithdraw =
    taskCoins >= 10000;

  const inviteLink =
    `${window.location.origin}/register?ref=${referralCode}`;

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl space-y-6">

        <h1 className="text-4xl font-bold text-center">

          Cashora Dashboard

        </h1>

        {email ? (

          <div className="space-y-4">

            <DashboardCard
              title="Username"
              value={username}
            />

            <DashboardCard
              title="Email"
              value={email}
            />

            <DashboardCard
              title="Total Coins"
              value={`${totalCoins} Coins`}
              color="text-yellow-400"
            />

            <DashboardCard
              title="Task Coins"
              value={`${taskCoins} Coins`}
              color="text-green-400"
            />

            <DashboardCard
              title="Referral Coins"
              value={`${referralCoins} Coins`}
              color="text-blue-400"
            />

            <DashboardCard
              title="Locked Referral Coins"
              value={`${lockedReferralCoins} Coins`}
              color="text-orange-400"
            />

            <DashboardCard
              title="Withdrawable Coins"
              value={`${withdrawableCoins} Coins`}
              color="text-purple-400"
            />

            <DashboardCard
              title="Estimated USD"
              value={`$${estimatedUsd}`}
              color="text-emerald-400"
            />

            <div className="bg-zinc-800 p-4 rounded-xl space-y-3">

              <h2 className="text-xl font-bold">

                Referral System

              </h2>

              <p className="text-sm text-gray-400">

                Referral Code

              </p>

              <p className="font-bold text-yellow-400 break-all">

                {referralCode}

              </p>

              <p className="text-sm text-gray-400">

                Invite Link

              </p>

              <p className="text-sm break-all">

                {inviteLink}

              </p>

              <p className="text-sm">

                Referrals:
                {" "}
                {referralsCount}

              </p>

              <button
                onClick={copyReferralCode}
                className="w-full bg-blue-600 py-2 rounded-xl font-bold"
              >

                Copy Referral Code

              </button>

            </div>

            <div className="bg-zinc-800 p-4 rounded-xl">

              <p className="text-sm text-gray-400">

                Withdrawal Status

              </p>

              <p
                className={`font-bold ${
                  canWithdraw
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >

                {canWithdraw
                  ? "Eligible For Withdrawal"
                  : "Need 10,000 Task Coins"}

              </p>

            </div>

            <button
              onClick={claimDailyReward}
              className="w-full bg-green-600 py-3 rounded-xl font-bold"
            >

              Claim Daily Reward (+500 Coins)

            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 py-3 rounded-xl font-bold"
            >

              Logout

            </button>

            <p className="text-center text-yellow-400 text-sm">

              {message}

            </p>

            <div className="bg-zinc-800 p-4 rounded-xl">

              <h2 className="text-xl font-bold mb-4">

                Transactions

              </h2>

              <div className="space-y-3">

                {transactions.map(
                  (transaction) => (

                    <div
                      key={transaction.id}
                      className="bg-zinc-700 p-3 rounded-xl"
                    >

                      <p className="font-bold">

                        {transaction.type}

                      </p>

                      <p className="text-yellow-400">

                        +{transaction.coins} Coins

                      </p>

                      <p className="text-xs text-gray-400">

                        {new Date(
                          transaction.created_at
                        ).toLocaleString()}

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        ) : (

          <p className="text-center text-red-400">

            No user logged in

          </p>

        )}

      </div>

    </main>

  );

}

function DashboardCard({

  title,

  value,

  color = "text-white",

}: {

  title: string;

  value: string;

  color?: string;

}) {

  return (

    <div className="bg-zinc-800 p-4 rounded-xl">

      <p className="text-gray-400 text-sm">

        {title}

      </p>

      <p className={`text-xl font-bold ${color}`}>

        {value}

      </p>

    </div>

  );

}
