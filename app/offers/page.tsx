"use client";

import { Layers, Search, Filter, Coins } from "lucide-react";
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

type TaskStatus = {
  status: "pending" | "completed";
  started_at?: string | null;
  completed_at?: string | null;
  rowId?: number;
};

export default function OffersPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [taskStatuses, setTaskStatuses] = useState<Record<number, TaskStatus>>(
    {}
  );

  useEffect(() => {
    async function loadData() {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.log(userError);
        return;
      }

      if (userData.user) {
        setUserId(userData.user.id);
      }

      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq("active", true)
        .order("id", { ascending: false });

      if (taskError) {
        console.log(taskError);
        return;
      }

      if (taskData) {
        setTasks(taskData);
      }

      if (userData.user) {
        const { data: completedData, error: completedError } = await supabase
          .from("completed_tasks")
          .select("*")
          .eq("user_id", userData.user.id);

        if (completedError) {
          console.log(completedError);
          return;
        }

        const statusMap: Record<number, TaskStatus> = {};

        (completedData || []).forEach((row: any) => {
          const existing = statusMap[row.task_id];

          if (!existing) {
            statusMap[row.task_id] = {
              status: row.status === "completed" ? "completed" : "pending",
              started_at: row.started_at || null,
              completed_at: row.completed_at || null,
              rowId: row.id,
            };
            return;
          }

          if (row.status === "completed") {
            statusMap[row.task_id] = {
              status: "completed",
              started_at: row.started_at || existing.started_at || null,
              completed_at: row.completed_at || existing.completed_at || null,
              rowId: row.id,
            };
            return;
          }

          if (
            existing.status !== "completed" &&
            row.started_at &&
            (!existing.started_at ||
              new Date(row.started_at).getTime() >
                new Date(existing.started_at).getTime())
          ) {
            statusMap[row.task_id] = {
              status: "pending",
              started_at: row.started_at,
              completed_at: row.completed_at || null,
              rowId: row.id,
            };
          }
        });

        setTaskStatuses(statusMap);
      }
    }

    loadData();
  }, []);

  async function startTask(task: Task) {
    if (!userId) {
      setMessage("Login required");
      return;
    }

    const currentStatus = taskStatuses[task.id];

    if (currentStatus?.status === "completed") {
      setMessage("Task already completed");
      return;
    }

    if (currentStatus?.status === "pending") {
      setMessage("Task already started");
      return;
    }

    const startedAt = new Date().toISOString();

    const { data, error } = await supabase
      .from("completed_tasks")
      .insert([
        {
          user_id: userId,
          task_id: task.id,
          reward: task.reward,
          status: "pending",
          provider: "internal",
          started_at: startedAt,
        },
      ])
      .select("*")
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setTaskStatuses((prev) => ({
      ...prev,
      [task.id]: {
        status: "pending",
        started_at: data?.started_at || startedAt,
        rowId: data?.id,
      },
    }));

    setMessage("Task started successfully");
  }

  async function completeTask(task: Task) {
    if (!userId) {
      setMessage("Login required");
      return;
    }

    const currentStatus = taskStatuses[task.id];

    if (!currentStatus || currentStatus.status !== "pending") {
      setMessage("Start the task first");
      return;
    }

    const startedAt = currentStatus.started_at;

    if (!startedAt) {
      setMessage("Task start time not found");
      return;
    }

    const startedMs = new Date(startedAt).getTime();
    const nowMs = new Date().getTime();
    const secondsPassed = (nowMs - startedMs) / 1000;

    if (secondsPassed < 30) {
      const remainingSeconds = Math.ceil(30 - secondsPassed);
      setMessage(`Please wait ${remainingSeconds} more seconds`);
      return;
    }

    const { data: pendingRows, error: pendingError } = await supabase
      .from("completed_tasks")
      .select("*")
      .eq("user_id", userId)
      .eq("task_id", task.id)
      .eq("status", "pending")
      .order("started_at", { ascending: false })
      .limit(1);

    if (pendingError) {
      setMessage(pendingError.message);
      return;
    }

    const pendingTask = pendingRows?.[0];

    if (!pendingTask) {
      setMessage("No pending task found");
      return;
    }

    const completedAt = new Date().toISOString();

    const { error: updateTaskError } = await supabase
      .from("completed_tasks")
      .update({
        status: "completed",
        completed_at: completedAt,
      })
      .eq("id", pendingTask.id);

    if (updateTaskError) {
      setMessage(updateTaskError.message);
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

    const { error: profileUpdateError } = await supabase
      .from("profiles")
      .update({
        task_coins: updatedTaskCoins,
        total_coins: updatedTotalCoins,
      })
      .eq("id", userId);

    if (profileUpdateError) {
      setMessage(profileUpdateError.message);
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

    setTaskStatuses((prev) => ({
      ...prev,
      [task.id]: {
        status: "completed",
        started_at: currentStatus.started_at,
        completed_at: completedAt,
        rowId: pendingTask.id,
      },
    }));

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
          {tasks.map((task) => {
            const state = taskStatuses[task.id];

            return (
              <Card key={task.id} hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-white">{task.title}</h2>
                        <Badge variant="warning">Offer</Badge>
                        {state?.status === "pending" && (
                          <Badge variant="warning">Pending</Badge>
                        )}
                        {state?.status === "completed" && (
                          <Badge variant="success">Completed</Badge>
                        )}
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
                        onClick={() => startTask(task)}
                        disabled={state?.status === "pending" || state?.status === "completed"}
                        className="bg-blue-600 hover:bg-blue-700 transition-colors px-5 py-2 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {state?.status === "completed"
                          ? "Completed"
                          : state?.status === "pending"
                            ? "Task Started"
                            : "Start Task"}
                      </button>

                      <button
                        onClick={() => completeTask(task)}
                        disabled={state?.status !== "pending"}
                        className="bg-green-600 hover:bg-green-700 transition-colors px-5 py-2 rounded-xl font-bold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Complete Task
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
