import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// use relative imports to avoid @ alias issues
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../components/ui/card";

// 👇 NEW: import your logo
import shakLogo from "../assets/Shak.png";

// --- tiny helpers for demo values + localStorage habits ---
const HABITS_KEY = "shak_habits";

function loadHabits() {
  try {
    return JSON.parse(localStorage.getItem(HABITS_KEY)) || [
      { text: "Skip takeout this week", done: false },
      { text: "Set up auto-transfers", done: false },
      { text: "Cook at home 3× this week", done: false },
    ];
  } catch {
    return [];
  }
}
function saveHabits(habits) {
  localStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}

export default function Dashboard() {
  const navigate = useNavigate();

  // Demo summary numbers — replace with backend data later.
  const [summary, setSummary] = useState({
    lastPaycheck: 1800,
    savedToGoal: 1250,
    goalAmount: 2000,
    savingsPct: 15,
    needsPct: 59.5,
    wantsPct: 25.5,
  });

  // Habits stored locally so you can play with them now
  const [habits, setHabits] = useState(loadHabits());

  useEffect(() => {
    saveHabits(habits);
  }, [habits]);

  const percentToGoal = Math.min(
    100,
    Math.round((summary.savedToGoal / Math.max(1, summary.goalAmount)) * 100)
  );

  function handleLogout() {
    localStorage.removeItem("authToken");
    navigate("/");
  }

  function toggleHabit(idx) {
    setHabits((prev) =>
      prev.map((h, i) => (i === idx ? { ...h, done: !h.done } : h))
    );
  }

  function addHabit() {
    const text = prompt("New habit (e.g., “Bring lunch 3x this week”)");
    if (!text?.trim()) return;
    setHabits((prev) => [...prev, { text: text.trim(), done: false }]);
  }

  function removeHabit(idx) {
    setHabits((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <main className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          {/* 👇 Replaced text with logo + title */}
          <div className="flex items-center gap-3">
            <img
              src={shakLogo}
              alt="SHAK logo"
              className="w-12 h-12 rounded-lg object-contain"
            />
            <h1 className="text-3xl font-bold text-[#F46B2E]">Dashboard 💸</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/options">
              <Button variant="outline">Savings Options</Button>
            </Link>
            <Button variant="outline" onClick={handleLogout}>Log Out</Button>
          </div>
        </header>

        {/* Savings Summary */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card className="bg-white border border-orange-200">
            <CardHeader>
              <CardTitle className="text-[#F46B2E]">Last Paycheck</CardTitle>
              <CardDescription>After tax</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              ${summary.lastPaycheck.toLocaleString()}
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-200">
            <CardHeader>
              <CardTitle className="text-[#F46B2E]">Saved Toward Goal</CardTitle>
              <CardDescription>So far</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              ${summary.savedToGoal.toLocaleString()}
            </CardContent>
          </Card>

          <Card className="bg-white border border-orange-200">
            <CardHeader>
              <CardTitle className="text-[#F46B2E]">Goal</CardTitle>
              <CardDescription>Total target</CardDescription>
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              ${summary.goalAmount.toLocaleString()}
            </CardContent>
          </Card>
        </section>

        {/* Progress to Goal */}
        <Card className="bg-white border border-orange-200">
          <CardHeader>
            <CardTitle className="text-[#F46B2E]">Progress to Goal</CardTitle>
            <CardDescription>
              You’re at <strong>{percentToGoal}%</strong> of ${summary.goalAmount.toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-4 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F46B2E] transition-all"
                style={{ width: `${percentToGoal}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percentToGoal}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Plan this month: <strong>{summary.savingsPct}%</strong> to savings,&nbsp;
              <strong>{summary.needsPct}%</strong> to needs,&nbsp;
              <strong>{summary.wantsPct}%</strong> to wants.
            </p>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Link to="/options">
              <Button className="bg-[#F46B2E] hover:bg-[#e45e23]">Adjust Plan</Button>
            </Link>
            <Link to="/userinfo">
              <Button variant="outline">Update Income & Expenses</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Habits / Tasks */}
        <section className="grid md:grid-cols-3 gap-4">
          <Card className="md:col-span-2 bg-white border border-orange-200">
            <CardHeader>
              <CardTitle className="text-[#F46B2E]">Habits & Challenges</CardTitle>
              <CardDescription>Small wins that add up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {habits.length === 0 && (
                <p className="text-sm text-gray-600">No habits yet. Add your first one!</p>
              )}
              <ul className="space-y-2">
                {habits.map((h, i) => (
                  <li key={i} className="flex items-center justify-between gap-3 p-2 rounded-lg border border-orange-100 bg-white">
                    <label className="flex items-center gap-2 select-none">
                      <input
                        type="checkbox"
                        checked={h.done}
                        onChange={() => toggleHabit(i)}
                        className="size-4 accent-[#F46B2E] cursor-pointer"
                      />
                      <span className={h.done ? "line-through text-gray-500" : ""}>
                        {h.text}
                      </span>
                    </label>
                    <Button variant="outline" onClick={() => removeHabit(i)}>Remove</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="bg-[#F46B2E] hover:bg-[#e45e23]" onClick={addHabit}>
                + Add Habit
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-white border border-orange-200">
            <CardHeader>
              <CardTitle className="text-[#F46B2E]">Quick Links</CardTitle>
              <CardDescription>Jump to a section</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              <Link
                to="/options"
                className="p-3 rounded-xl bg-orange-100/60 hover:bg-orange-100 transition border border-orange-200"
              >
                💰 Savings Options
              </Link>
              <Link
                to="/userinfo"
                className="p-3 rounded-xl bg-orange-100/60 hover:bg-orange-100 transition border border-orange-200"
              >
                📊 User Info
              </Link>
              {/* Add more when you create them (transactions, summary, etc.) */}
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
