"use client";

import { useState } from "react";
import Link from "next/link";
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
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ShoppingCart, ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Download, RefreshCw, Calendar, Filter, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ── Mock data ──────────────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, expenses: 28000, profit: 14000 },
  { month: "Feb", revenue: 47500, expenses: 30000, profit: 17500 },
  { month: "Mar", revenue: 44200, expenses: 27500, profit: 16700 },
  { month: "Apr", revenue: 53800, expenses: 32000, profit: 21800 },
  { month: "May", revenue: 61200, expenses: 34500, profit: 26700 },
  { month: "Jun", revenue: 58900, expenses: 33000, profit: 25900 },
  { month: "Jul", revenue: 67400, expenses: 36000, profit: 31400 },
  { month: "Aug", revenue: 72100, expenses: 38500, profit: 33600 },
  { month: "Sep", revenue: 69800, expenses: 37000, profit: 32800 },
  { month: "Oct", revenue: 78300, expenses: 40000, profit: 38300 },
  { month: "Nov", revenue: 84600, expenses: 42500, profit: 42100 },
  { month: "Dec", revenue: 91200, expenses: 45000, profit: 46200 },
];

const userGrowthData = [
  { week: "W1", newUsers: 320, activeUsers: 2100, churned: 45 },
  { week: "W2", newUsers: 410, activeUsers: 2380, churned: 52 },
  { week: "W3", newUsers: 380, activeUsers: 2590, churned: 38 },
  { week: "W4", newUsers: 520, activeUsers: 2940, churned: 61 },
  { week: "W5", newUsers: 490, activeUsers: 3180, churned: 44 },
  { week: "W6", newUsers: 610, activeUsers: 3520, churned: 57 },
  { week: "W7", newUsers: 580, activeUsers: 3820, churned: 49 },
  { week: "W8", newUsers: 720, activeUsers: 4210, churned: 63 },
];

const trafficSourceData = [
  { name: "Organic Search", value: 38, color: BRAND.chartColors[0] },
  { name: "Direct", value: 24, color: BRAND.chartColors[1] },
  { name: "Social Media", value: 18, color: BRAND.chartColors[2] },
  { name: "Referral", value: 12, color: BRAND.chartColors[3] },
  { name: "Email", value: 8, color: BRAND.chartColors[4] },
];

const transactions = [
  {
    id: "TXN-8821",
    customer: "Sophia Hartwell",
    email: "sophia@acmecorp.io",
    plan: "Enterprise",
    amount: 1299,
    status: "paid" as const,
    date: "Dec 14, 2024",
  },
  {
    id: "TXN-8820",
    customer: "Marcus Chen",
    email: "m.chen@brightlabs.com",
    plan: "Pro",
    amount: 299,
    status: "paid" as const,
    date: "Dec 14, 2024",
  },
  {
    id: "TXN-8819",
    customer: "Priya Nair",
    email: "priya@stackflow.dev",
    plan: "Starter",
    amount: 49,
    status: "pending" as const,
    date: "Dec 13, 2024",
  },
  {
    id: "TXN-8818",
    customer: "James Okafor",
    email: "james@novavault.co",
    plan: "Enterprise",
    amount: 1299,
    status: "paid" as const,
    date: "Dec 13, 2024",
  },
  {
    id: "TXN-8817",
    customer: "Elena Vasquez",
    email: "elena@pixelcraft.studio",
    plan: "Pro",
    amount: 299,
    status: "failed" as const,
    date: "Dec 12, 2024",
  },
  {
    id: "TXN-8816",
    customer: "Liam Thornton",
    email: "liam@cloudnine.io",
    plan: "Pro",
    amount: 299,
    status: "paid" as const,
    date: "Dec 12, 2024",
  },
  {
    id: "TXN-8815",
    customer: "Aisha Kamara",
    email: "aisha@meridian.ai",
    plan: "Starter",
    amount: 49,
    status: "pending" as const,
    date: "Dec 11, 2024",
  },
];

const kpiCards = [
  {
    label: "Monthly Revenue",
    value: "$91,200",
    change: 12.4,
    changeLabel: "vs last month",
    icon: DollarSign,
    gradient: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "4,210",
    change: 8.7,
    changeLabel: "vs last week",
    icon: Users,
    gradient: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    label: "Conversion Rate",
    value: "3.84%",
    change: -0.6,
    changeLabel: "vs last month",
    icon: Activity,
    gradient: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    label: "Total Orders",
    value: "1,847",
    change: 5.2,
    changeLabel: "vs last month",
    icon: ShoppingCart,
    gradient: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
  },
];

const topPages = [
  { page: "/dashboard", views: 18420, bounce: "24%", time: "4m 12s" },
  { page: "/analytics", views: 12380, bounce: "31%", time: "3m 48s" },
  { page: "/pricing", views: 9740, bounce: "42%", time: "2m 55s" },
  { page: "/users", views: 7210, bounce: "28%", time: "3m 20s" },
  { page: "/revenue", views: 5890, bounce: "19%", time: "5m 01s" },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: "paid" | "pending" | "failed" }) {
  const styles = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    failed: "bg-red-500/15 text-red-400 border-red-500/25",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
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
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-2xl shadow-black/40">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-xs">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">
            {typeof entry.value === "number"
              ? entry.value >= 1000
                ? `$${(entry.value / 1000).toFixed(1)}k`
                : entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function DashboardOverviewPage() {
  const [activeRange, setActiveRange] = useState<"7d" | "30d" | "90d" | "1y">(
    "1y"
  );
  const [chartTab, setChartTab] = useState<"revenue" | "users">("revenue");

  const ranges: Array<"7d" | "30d" | "90d" | "1y"> = ["7d", "30d", "90d", "1y"];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ── Page header ── */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-16 z-30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Welcome back — here's what's happening with your business today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/60 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              Dec 2024
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-sm hover:bg-slate-700/60 transition-all"
            >
              <Filter className="w-3.5 h-3.5" />
              Filter
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-all shadow-lg shadow-indigo-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
            return (
              <motion.div
                key={card.label}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`relative overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/60 p-5 shadow-xl ${card.glow} hover:border-slate-700/60 transition-all duration-300 cursor-default`}
              >
                {/* Glow blob */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-2xl`}
                />
                <div className="relative flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      isPositive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(card.change)}%
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight mb-1">
                  {card.value}
                </p>
                <p className="text-sm text-slate-400">{card.label}</p>
                <p className="text-xs text-slate-600 mt-0.5">{card.changeLabel}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Main chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/60 border border-slate-800/60 p-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-base font-semibold text-white">
                Performance Overview
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Revenue, expenses & profit trends
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Chart tab toggle */}
              <div className="flex items-center bg-slate-800/60 rounded-lg p-1 gap-1">
                {(["revenue", "users"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setChartTab(tab)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      chartTab === tab
                        ? "bg-indigo-600 text-white shadow"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab === "revenue" ? "Revenue" : "Users"}
                  </button>
                ))}
              </div>
              {/* Range selector */}
              <div className="flex items-center bg-slate-800/60 rounded-lg p-1 gap-1">
                {ranges.map((r) => (
                  <button
                    key={r}
                    onClick={() => setActiveRange(r)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      activeRange === r
                        ? "bg-slate-600 text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <motion.button
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.4 }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800/60 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </motion.button>
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              {chartTab === "revenue" ? (
                <AreaChart
                  data={revenueData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
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
                    wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fill="url(#gradRevenue)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#6366f1" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    fill="url(#gradExpenses)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#8b5cf6" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#gradProfit)"
                    dot={false}
                    activeDot={{ r: 5, fill: "#10b981" }}
                  />
                </AreaChart>
              ) : (
                <BarChart
                  data={userGrowthData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1e293b"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
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
                  <Legend
                    wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }}
                  />
                  <Bar
                    dataKey="newUsers"
                    fill="#6366f1"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="activeUsers"
                    fill="#06b6d4"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                  <Bar
                    dataKey="churned"
                    fill="#ef4444"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Middle row: Pie + Top Pages ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-5 gap-6"
        >
          {/* Traffic sources pie */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-2 rounded-2xl bg-slate-900/60 border border-slate-800/60 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Traffic Sources
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Where your visitors come from
                </p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value}%`, "Share"]}
                      contentStyle={{
                        background: "#0f172a",
                        border: "1px solid #334155",
                        borderRadius: "12px",
                        color: "#f1f5f9",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full space-y-2 mt-2">
                {trafficSourceData.map((source) => (
                  <div
                    key={source.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-sm text-slate-300">
                        {source.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${source.value}%`,
                            backgroundColor: source.color,
                          }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-white w-8 text-right">
                        {source.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top pages */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-3 rounded-2xl bg-slate-900/60 border border-slate-800/60 p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-white">
                  Top Pages
                </h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Most visited pages this month
                </p>
              </div>
              <Link
                href="/analytics"
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                <Eye className="w-3.5 h-3.5" />
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800/60">
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                      Page
                    </th>
                    <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                      Views
                    </th>
                    <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                      Bounce
                    </th>
                    <th className="text-right text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">
                      Avg. Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {topPages.map((row, i) => (
                    <motion.tr
                      key={row.page}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-indigo-500/15 text-indigo-400 text-[10px] font-bold flex items-center justify-center">
                            {i + 1}
                          </span>
                          <span className="font-mono text-slate-300 text-xs">
                            {row.page}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right text-slate-200 font-medium">
                        {(row.views ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`text-xs font-medium ${
                            parseInt(row.bounce) < 30
                              ? "text-emerald-400"
                              : parseInt(row.bounce) < 40
                              ? "text-amber-400"
                              : "text-red-400"
                          }`}
                        >
                          {row.bounce}
                        </span>
                      </td>
                      <td className="py-3 text-right text-slate-400 text-xs">
                        {row.time}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Recent Transactions ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/60 border border-slate-800/60 shadow-xl overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">
                Recent Transactions
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Latest subscription payments across all plans
              </p>
            </div>
            <Link
              href="/revenue"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              View all transactions
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/40">
                <tr>
                  {["Transaction", "Customer", "Plan", "Amount", "Status", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider px-6 py-3"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40">
                {transactions.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    whileHover={{ backgroundColor: "rgba(30,41,59,0.4)" }}
                    className="transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md">
                        {tx.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-200">
                          {tx.customer}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {tx.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                          tx.plan === "Enterprise"
                            ? "bg-violet-500/15 text-violet-400"
                            : tx.plan === "Pro"
                            ? "bg-indigo-500/15 text-indigo-400"
                            : "bg-slate-700/60 text-slate-400"
                        }`}
                      >
                        {tx.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-white">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={tx.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {tx.date}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 border-t border-slate-800/60 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Showing 7 of 1,847 transactions
            </p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs hover:text-slate-200 hover:bg-slate-700/60 transition-all">
                Previous
              </button>
              <button className="px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 text-xs hover:text-slate-200 hover:bg-slate-700/60 transition-all">
                Next
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Quick stats row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Avg. Revenue Per User",
              value: "$21.64",
              sub: "Based on 4,210 active users",
              trend: "+3.2%",
              up: true,
            },
            {
              label: "Customer Lifetime Value",
              value: "$842",
              sub: "12-month rolling average",
              trend: "+7.8%",
              up: true,
            },
            {
              label: "Monthly Churn Rate",
              value: "1.49%",
              sub: "63 users churned this month",
              trend: "-0.3%",
              up: false,
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="rounded-2xl bg-slate-900/60 border border-slate-800/60 p-5 shadow-xl hover:border-slate-700/60 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    stat.up
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-slate-600">{stat.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}