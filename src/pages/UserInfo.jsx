import React, { useState } from "react";


const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
const INTAKE_API = `${API_BASE}/api/user-finances/intake`;



// Simplified MVP version — orange and white theme
export default function UserInfo() {
  const [formData, setFormData] = useState({
    lastPaycheck: "",
    currentBalance: "",
    savedToGoal: "",
    needs: "",
    wants: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const toCents = v => Math.round(Number(v || 0) * 100);

const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await fetch(INTAKE_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lastPaycheckCents: toCents(formData.lastPaycheck),
      currentBalanceCents: toCents(formData.currentBalance),
      savedToGoalCents: toCents(formData.savedToGoal),
      needsMonthlyCents: toCents(formData.needs),
      wantsMonthlyCents: toCents(formData.wants),
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error || "Request failed");
  alert("Saved!");
};
  
  return (
    <main className="min-h-screen bg-orange-950 text-white flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-orange-900 p-6 rounded-2xl border border-orange-700 space-y-4 shadow-xl shadow-black/30"
      >
        <h1 className="text-2xl font-semibold text-center text-orange-100">
          Let's set up your saving info 💸
        </h1>

        <InputField
          label="Last Paycheck (after tax)"
          name="lastPaycheck"
          value={formData.lastPaycheck}
          onChange={handleChange}
          placeholder="e.g. 1800"
        />

        <InputField
          label="Current Money Balance"
          name="currentBalance"
          value={formData.currentBalance}
          onChange={handleChange}
          placeholder="e.g. 500"
        />

        <InputField
          label="Current Savings Toward Goal"
          name="savedToGoal"
          value={formData.savedToGoal}
          onChange={handleChange}
          placeholder="e.g. 200"
        />

        <InputField
          label="Monthly Needs (Rent, Groceries, etc.)"
          name="needs"
          value={formData.needs}
          onChange={handleChange}
          placeholder="e.g. 1000"
        />

        <InputField
          label="Monthly Wants (Entertainment, Shopping, etc.)"
          name="wants"
          value={formData.wants}
          onChange={handleChange}
          placeholder="e.g. 400"
        />

        <button
          type="submit"
          className="w-full bg-orange-400 text-black font-semibold py-2 rounded-xl hover:bg-orange-300 transition"
        >
          Save & Continue
        </button>
      </form>
    </main>
  );
}

function InputField({ label, name, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="block text-sm mb-1 text-orange-200">{label}</span>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min="0"
        step="0.01"
        className="w-full bg-orange-800 border border-orange-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-orange-300"
      />
    </label>
  );
}
