"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Transaction {
  id: number;
  type: string;
  coins: number;
  created_at: string;
  description?: string | null;
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

    let isMounted = true;

    async function loadUser() {

      const {
        data: userData,
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {

        console.log(userError);

        return;

      }

      if (!userData.user) {
        return;
      }

      const user = userData.user;

      if (!isMounted) {
        return;
      }

      setUserId(user.id);

      setEmail(user.email || "");

      const {
        data: profileData,
        error: profileError,
      } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {

        console.log(profileError);

        return;

      }

      if (profileData && isMounted) {

        setUsername(
          profileData.username || ""
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

        setLockedReferralCoins(
          profileData.locked_referral_coins || 0
        );

        setLastClaim(
          profileData.last_claim || null
        );

      }

      const {
        data: transactionData,
        error: transactionError,
      } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (transactionError) {

        console.log(transactionError);

        return;

      }

      if (transactionData && isMounted) {

        setTransactions(
          transactionData
        );

      }

    }

    loadUser();

    return () => {

      isMounted = false;

    };

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

          status: "completed",

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

    if (newTransaction) {

      setTransactions((prev) => [

        newTransaction,

        ...prev,

      ]);

    }

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

  const estimatedUsd =
    useMemo(() => {

      return (
        totalCoins / 1000
      ).toFixed(2);

    }, [totalCoins]);

  const canWithdraw =
    taskCoins >= 10000;

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-md bg-zinc-900 p-5 sm:p-8 rounded-2xl space-y-6 shadow-xl">

        <h1 className="text-3xl sm:text-4xl font-bold text-center">

          Cashora Dashboard

        </h1>

        {email ? (

          <div className="space-y-4">

            <DashboardCard
              title="Username"
              value={username || "-"}
            />

            <DashboardCard
              title="Email"
              value={email || "-"}
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
              className="w-full bg-green-600 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors"
            >

              Claim Daily Reward (+500 Coins)

            </button>

            <p className="text-center text-yellow-400 text-sm">

              {message}

            </p>

            <div className="bg-zinc-800 p-4 rounded-xl">

              <h2 className="text-xl font-bold mb-4">

                Transactions

              </h2>

              <div className="space-y-3">

                {transactions.length > 0 ? (

                  transactions.map((transaction) => (

                    <div
                      key={transaction.id}
                      className="bg-zinc-700 p-3 rounded-xl"
                    >

                      <p className="font-bold capitalize">

                        {transaction.type.replaceAll("_", " ")}

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

                  ))

                ) : (

                  <p className="text-sm text-gray-400">

                    No transactions yet

                  </p>

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
