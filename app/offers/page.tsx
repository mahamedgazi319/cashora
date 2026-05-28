"use client";

import {
  Layers,
  Search,
  Filter,
  Coins,
} from "lucide-react";

import { useEffect, useState } from "react";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/Card";

import { Badge } from "@/components/ui/Badge";

import { supabase } from "@/lib/supabase";

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  url: string;
}

export default function OffersPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function loadData() {
      const { data: userData } = await supabase.auth.getUser();

      if (userData.user) {
        setUserId(userData.user.id);
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("active", true)
        .order("id", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setTasks(data);
      }
    }

    loadData();
  }, []);

  async function completeTask(task: Task) {
    if (!userId) {
      setMessage("Login required");
      return;
    }

    const { data: existingTask, error: existingError } = await supabase
      .from("completed_tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("task_id", task.id)
      .maybeSingle();

    if (existingError) {
      setMessage(existingError.message);
      return;
    }

    if (existingTask) {
      setMessage("Task already completed");
      return;
    }

    const { error: completedError } = await supabase
      .from("completed_tasks")
      .insert([
        {
          user_id: userId,
          task_id: task.id,
          reward: task.reward,
          status: "completed",
          provider: "internal",
        },
      ]);

    if (completedError) {
      setMessage(completedError.message);
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileError) {
      setMessage(profileError.message);
      return;
    }

    if (!profileData) {
      setMessage("Profile not found");
      return;
    }

    const updatedTaskCoins = (profileData.task_coins || 0) + task.reward;
    const updatedTotalCoins = (profileData.total_coins || 0) + task.reward;

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        task_coins: updatedTaskCoins,
        total_coins: updatedTotalCoins,
      })
      .eq("id", userId);

    if (updateError) {
      setMessage(updateError.message);
      return;
    }

    const { error: transactionError } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: userId,
          type: "task_reward",
          coins: task.reward,
          status: "completed",
          description: task.title,
        },
      ]);

    if (transactionError) {
      setMessage(transactionError.message);
      return;
    }

    setMessage(`Task completed successfully +${task.reward} Coins`);
  }

  return (
    <div className="page-container space-y-8 animate-slide-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="section-title mb-0">Offers</h1>
            <Badge variant="success">Live</Badge>
          </div>
          <p className="section-subtitle">Complete tasks and earn coins</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-2 bg-surface-card border border-surface-border rounded-lg text-sm text-gray-500 opacity-50">
            <Search className="w-4 h-4" />
            <span>Search offers...</span>
          </div>

          <button
            disabled
            className="p-2 bg-surface-card border border-surface-border rounded-lg text-gray-500 opacity-50"
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-yellow-400 text-sm">{message}</p>

      {tasks.length > 0 ? (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <Card key={task.id} hover>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{task.title}</h2>
                      <Badge variant="warning">Offer</Badge>
                    </div>

                    <p className="text-gray-400 text-sm">{task.description}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold text-lg">
                      <Coins className="w-5 h-5" />
                      {task.reward}
                    </div>

                    <a
                      href={task.url}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-brand-500 hover:bg-brand-600 transition-colors px-5 py-2 rounded-xl font-bold text-white text-center"
                    >
                      Start Task
                    </a>

                    <button
                      onClick={() => completeTask(task)}
                      className="bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 rounded-xl font-bold text-white"
                    >
                      Complete Task
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="w-14 h-14 rounded-2xl bg-surface-hover border border-surface-border flex items-center justify-center mx-auto mb-4">
              <Layers className="w-7 h-7 text-gray-600" />
            </div>
            <h3 className="font-semibold text-white mb-1">No offers available</h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              New tasks will appear here soon.
            </p>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center">
        <Link
          href="/dashboard"
          className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-xl font-bold"
        >
          Back To Dashboard
        </Link>
      </div>
    </div>
  );
}
