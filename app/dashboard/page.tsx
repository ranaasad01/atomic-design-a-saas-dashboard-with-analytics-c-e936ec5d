"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, MoreHorizontal, RefreshCw, Download, Calendar } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$284,590",
    rawValue: 284590,
    change: 12.4,
    changeLabel: "vs last month",
    prefix: "$",
    icon: DollarSign,
    color: "indigo",
    gradient: "from-indigo-500 to-violet-600",
    bgGlow: "shadow-indigo-500/20",
  },
  {
    id: "mrr",
    label: "Monthly Recurring",
    value: "$48,320",
    rawValue: 48320,
    change: 8.1,
    changeLabel: "vs last month",
    prefix: "$",
    icon: TrendingUp,
    color: "violet",
    gradient: "from-violet-500 to-purple-600",
    bgGlow: "shadow-violet-500/20",
  },
  {
    id: "users",
    label: "Active Users",
    value: "24,891",
    rawValue: 24891,
    change: 5.7,
    changeLabel: "vs last month",
    icon: Users,
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    bgGlow: "shadow-cyan-500/20",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.4%",
    rawValue: 2.4,
    change: -0.6,
    changeLabel: "vs last month",
    suffix: "%",
    icon: Activity,
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    bgGlow: "shadow-emerald-500/20",
  },
];

const revenueData = [
  { month: "Jan", revenue: 38200, target: 35000 },
  { month: "Feb", revenue: 42100, target: 38000 },
  { month: "Mar", revenue: 39800, target: 40000 },
  { month: "Apr", revenue: 45600, target: 42000 },
  { month: "May", revenue: 51200, target: 46000 },
  { month: "Jun", revenue: 48900, target: 49000 },
  { month: "Jul", revenue: 55400, target: 51000 },
  { month: "Aug", revenue: 61200, target: 55000 },
  { month: "Sep", revenue: 58700, target: 58000 },
  { month: "Oct", revenue: 67300, target: 62000 },
  { month: "Nov", revenue: 72100, target: 67000 },
  { month: "Dec", revenue: 79800, target: 72000 },
];

const signupData = [
  { day: "Mon", signups: 142, returning: 89 },
  { day: "Tue", signups: 198, returning: 112 },
  { day: "Wed", signups: 167, returning: 134 },
  { day: "Thu", signups: 224, returning: 156 },
  { day: "Fri", signups: 289, returning: 178 },
  { day: "Sat", signups: 134, returning: 98 },
  { day: "Sun", signups: 98, returning: 67 },
];

const trafficData = [
  { name: "Organic Search", value: 38, color: BRAND.chartColors[0] },
  { name: "Direct", value: 24, color: BRAND.chartColors[1] },
  { name: "Social Media", value: 18, color: BRAND.chartColors[2] },
  { name: "Referral", value: 12, color: BRAND.chartColors[3] },
  { name: "Email", value: 8, color: BRAND.chartColors[4] },
];

const recentTransactions = [
  {
    id: "txn_001",
    customer: "Sophia Hartwell",
    email: "sophia@acmecorp.io",
    amount: 299,
    status: "paid" as const,
    date: "Dec 18, 2024",
    plan: "Pro",
  },
  {
    id: "txn_002",
    customer: "Marcus Chen",
    email: "m.chen@techflow.co",
    amount: 99,
    status: "paid" as const,
    date: "Dec 18, 2024",
    plan: "Starter",
  },
  {
    id: "txn_003",
    customer: "Priya Nair",
    email: "priya@growthlab.ai",
    amount: 599,
    status: "pending" as const,
    date: "Dec 17, 2024",
    plan: "Enterprise",
  },
  {
    id: "txn_004",
    customer: "James Okafor",
    email: "james@launchpad.dev",
    amount: 299,
    status: "paid" as const,
    date: "Dec 17, 2024",
    plan: "Pro",
  },
  {
    id: "txn_005",
    customer: "Elena Vasquez",
    email: "elena@cloudnine.io",
    amount: 99,
    status: "failed" as const,
    date: "Dec 16, 2024",
    plan: "Starter",
  },
  {
    id: "txn_006",
    customer: "Tobias Müller",
    email: "tobias@databridge.eu",
    amount: 599,
    status: "paid" as const,
    date: "Dec 16, 2024",
    plan: "Enterprise",
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <p className="text-slate-400 text-xs font-medium mb-2">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {entry.name === "revenue" || entry.name === "target"
              ? `$${(entry.value ?? 0).toLocaleString()}`
              : (entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
};

// ─── Status Badge ─────────────────────────────────────────────────────────────

const StatusBadge = ({ status }: { status: "paid" | "pending" | "failed" }) => {
  const styles = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    failed: "bg-red-500/15 text-red-400 border-red-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${styles[status]}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "paid"
            ? "bg-emerald-400"
            : status === "pending"
            ? "bg-amber-400"
            : "bg-red-400"
        }`}
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// ─── Donut Center Label ───────────────────────────────────────────────────────

const DonutLabel = ({ cx, cy }: { cx?: number; cy?: number }) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle">
    <tspan
      x={cx}
      dy="-0.4em"
      className="fill-white font-bold"
      style={{ fontSize: 22, fontWeight: 700, fill: "#fff" }}
    >
      100%
    </tspan>
    <tspan
      x={cx}
      dy="1.4em"
      style={{ fontSize: 11, fill: "#94a3b8" }}
    >
      Traffic
    </tspan>
  </text>
);

// ─── Page Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d" | "1y">("1y");

  const ranges: Array<"7d" | "30d" | "90d" | "1y"> = ["7d", "30d", "90d", "1y"];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back — here&apos;s what&apos;s happening with your product today.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/60 hover:text-white transition-all duration-200"
            >
              <Calendar className="w-4 h-4" />
              Dec 2024
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-300 text-sm font-medium hover:bg-slate-700/60 hover:text-white transition-all duration-200"
            >
              <Download className="w-4 h-4" />
              Export
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, rotate: 180 }}
              whileTap={{ scale: 0.96 }}
              transition={{ rotate: { duration: 0.4 } }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/25 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            const isChurn = card.id === "churn";
            const goodChange = isChurn ? !isPositive : isPositive;

            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 p-5 shadow-xl ${card.bgGlow} hover:border-slate-700/60 transition-all duration-300 cursor-pointer`}
              >
                {/* Glow blob */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl pointer-events-none`}
                />

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </motion.button>
                </div>

                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className="text-2xl font-bold text-white tracking-tight mb-3">
                  {card.value}
                </p>

                <div className="flex items-center gap-1.5">
                  {goodChange ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  )}
                  <span
                    className={`text-xs font-semibold ${
                      goodChange ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {isPositive ? "+" : ""}
                    {card.change}%
                  </span>
                  <span className="text-slate-500 text-xs">{card.changeLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Revenue Chart + Traffic Donut ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Revenue Line Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 p-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Trend</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  Monthly revenue vs target — 2024
                </p>
              </div>
              <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeRange === r
                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: "#94a3b8", paddingTop: 12 }}
                  iconType="circle"
                  iconSize={8}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#revenueGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="target"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  fill="url(#targetGrad)"
                  dot={false}
                  activeDot={{ r: 4, fill: "#8b5cf6", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Traffic Donut */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 p-6 shadow-xl"
          >
            <div className="mb-5">
              <h2 className="text-base font-semibold text-white">Traffic Sources</h2>
              <p className="text-slate-400 text-xs mt-0.5">Breakdown by acquisition channel</p>
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={trafficData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                >
                  {trafficData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="transparent"
                    />
                  ))}
                  <DonutLabel />
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`${value}%`, "Share"]}
                  contentStyle={{
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(51,65,85,0.6)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="mt-4 space-y-2.5">
              {trafficData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-slate-300 text-xs">{item.name}</span>
                  </div>
                  <span className="text-white text-xs font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Weekly Signups Bar Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">Weekly User Signups</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                New vs returning users — this week
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500 inline-block" />
                New signups
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-violet-500 inline-block" />
                Returning
              </span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={signupData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="signups" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={36} />
              <Bar dataKey="returning" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800/60 shadow-xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-slate-400 text-xs mt-0.5">Latest 6 subscription payments</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="self-start sm:self-auto flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/25 transition-all duration-200"
            >
              View all
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>

          {/* Table — desktop */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {["Customer", "Plan", "Amount", "Status", "Date"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentTransactions ?? []).map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35, ease: "easeOut" }}
                    whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                    className="border-b border-slate-800/40 last:border-0 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {tx.customer?.charAt(0) ?? "?"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">{tx.customer}</p>
                          <p className="text-xs text-slate-500">{tx.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/50">
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        ${(tx.amount ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-400">{tx.date}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <div className="sm:hidden divide-y divide-slate-800/40">
            {(recentTransactions ?? []).map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {tx.customer?.charAt(0) ?? "?"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{tx.customer}</p>
                    <p className="text-xs text-slate-500">{tx.plan} · {tx.date}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="text-sm font-semibold text-white">
                    ${(tx.amount ?? 0).toLocaleString()}
                  </span>
                  <StatusBadge status={tx.status} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}