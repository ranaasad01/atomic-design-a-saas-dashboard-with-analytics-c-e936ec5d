"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Users, CreditCard, ArrowUpRight, ArrowDownRight, CheckCircle, Clock, XCircle, ChevronDown } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ── Mock Data ────────────────────────────────────────────────────────────────

const kpiCards = [
  {
    id: "mrr",
    label: "Monthly Recurring Revenue",
    value: 84320,
    change: 12.4,
    prefix: "$",
    suffix: "",
    icon: DollarSign,
    color: "indigo",
  },
  {
    id: "arr",
    label: "Annual Recurring Revenue",
    value: 1011840,
    change: 14.1,
    prefix: "$",
    suffix: "",
    icon: TrendingUp,
    color: "violet",
  },
  {
    id: "customers",
    label: "Paying Customers",
    value: 2847,
    change: 8.3,
    prefix: "",
    suffix: "",
    icon: Users,
    color: "cyan",
  },
  {
    id: "arpu",
    label: "Avg. Revenue Per User",
    value: 29.62,
    change: -2.1,
    prefix: "$",
    suffix: "",
    icon: CreditCard,
    color: "emerald",
  },
];

const stackedBarData = [
  { month: "Jan", Basic: 18400, Pro: 31200, Enterprise: 22000 },
  { month: "Feb", Basic: 19100, Pro: 33500, Enterprise: 24500 },
  { month: "Mar", Basic: 17800, Pro: 35800, Enterprise: 27200 },
  { month: "Apr", Basic: 20300, Pro: 37100, Enterprise: 29800 },
  { month: "May", Basic: 21500, Pro: 39400, Enterprise: 33100 },
  { month: "Jun", Basic: 22800, Pro: 41600, Enterprise: 36200 },
];

const donutData = [
  { name: "Enterprise", value: 36200, color: BRAND.chartColors[0] },
  { name: "Pro", value: 41600, color: BRAND.chartColors[1] },
  { name: "Basic", value: 22800, color: BRAND.chartColors[2] },
  { name: "Add-ons", value: 8400, color: BRAND.chartColors[3] },
];

const transactions = [
  {
    id: "txn_001",
    customer: "Acme Corporation",
    email: "billing@acme.com",
    amount: 1200,
    status: "paid" as const,
    date: "2024-06-15",
    plan: "Enterprise",
  },
  {
    id: "txn_002",
    customer: "Bright Minds LLC",
    email: "admin@brightminds.io",
    amount: 299,
    status: "paid" as const,
    date: "2024-06-14",
    plan: "Pro",
  },
  {
    id: "txn_003",
    customer: "Nova Startup",
    email: "hello@novastartup.co",
    amount: 49,
    status: "pending" as const,
    date: "2024-06-14",
    plan: "Basic",
  },
  {
    id: "txn_004",
    customer: "Quantum Dynamics",
    email: "finance@quantumdyn.com",
    amount: 1200,
    status: "paid" as const,
    date: "2024-06-13",
    plan: "Enterprise",
  },
  {
    id: "txn_005",
    customer: "Pixel Perfect Co.",
    email: "pay@pixelperfect.design",
    amount: 299,
    status: "failed" as const,
    date: "2024-06-13",
    plan: "Pro",
  },
  {
    id: "txn_006",
    customer: "Greenfield Tech",
    email: "ops@greenfield.tech",
    amount: 49,
    status: "paid" as const,
    date: "2024-06-12",
    plan: "Basic",
  },
  {
    id: "txn_007",
    customer: "Horizon Analytics",
    email: "billing@horizonanalytics.ai",
    amount: 1200,
    status: "paid" as const,
    date: "2024-06-12",
    plan: "Enterprise",
  },
  {
    id: "txn_008",
    customer: "Maple Leaf SaaS",
    email: "accounts@mapleleaf.ca",
    amount: 299,
    status: "pending" as const,
    date: "2024-06-11",
    plan: "Pro",
  },
  {
    id: "txn_009",
    customer: "Ironclad Security",
    email: "finance@ironclad.io",
    amount: 1200,
    status: "paid" as const,
    date: "2024-06-11",
    plan: "Enterprise",
  },
  {
    id: "txn_010",
    customer: "Sunrise Media",
    email: "billing@sunrisemedia.com",
    amount: 49,
    status: "paid" as const,
    date: "2024-06-10",
    plan: "Basic",
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const colorMap: Record<string, string> = {
  indigo: "from-indigo-500 to-indigo-600",
  violet: "from-violet-500 to-violet-600",
  cyan: "from-cyan-500 to-cyan-600",
  emerald: "from-emerald-500 to-emerald-600",
};

const bgMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/20",
  violet: "bg-violet-500/10 border-violet-500/20",
  cyan: "bg-cyan-500/10 border-cyan-500/20",
  emerald: "bg-emerald-500/10 border-emerald-500/20",
};

const textMap: Record<string, string> = {
  indigo: "text-indigo-400",
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  emerald: "text-emerald-400",
};

function formatCurrency(val: number): string {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`;
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`;
  return `$${val.toFixed(2)}`;
}

function formatValue(val: number, prefix: string): string {
  if (prefix === "$") return formatCurrency(val);
  return (val ?? 0).toLocaleString();
}

const statusConfig = {
  paid: {
    label: "Paid",
    icon: CheckCircle,
    className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  pending: {
    label: "Pending",
    icon: Clock,
    className: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "text-red-400 bg-red-500/10 border-red-500/20",
  },
};

const planBadge: Record<string, string> = {
  Enterprise: "text-indigo-300 bg-indigo-500/10 border-indigo-500/20",
  Pro: "text-violet-300 bg-violet-500/10 border-violet-500/20",
  Basic: "text-cyan-300 bg-cyan-500/10 border-cyan-500/20",
};

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomBarTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  const total = (payload ?? []).reduce(
    (sum: number, entry: any) => sum + (entry?.value ?? 0),
    0
  );
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-2xl min-w-[160px]">
      <p className="text-slate-300 text-xs font-semibold mb-2">{label}</p>
      {(payload ?? []).map((entry: any) => (
        <div key={entry?.name} className="flex items-center justify-between gap-4 text-xs mb-1">
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: entry?.fill ?? "#6366f1" }}
            />
            <span className="text-slate-400">{entry?.name}</span>
          </span>
          <span className="text-white font-medium">
            ${((entry?.value ?? 0) / 1000).toFixed(1)}K
          </span>
        </div>
      ))}
      <div className="border-t border-slate-700/60 mt-2 pt-2 flex justify-between text-xs">
        <span className="text-slate-400">Total</span>
        <span className="text-indigo-300 font-semibold">
          ${(total / 1000).toFixed(1)}K
        </span>
      </div>
    </div>
  );
}

function CustomDonutTooltip({ active, payload }: any) {
  if (!active || !payload || !payload.length) return null;
  const entry = payload[0];
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-2xl">
      <p className="text-slate-300 text-xs font-semibold mb-1">{entry?.name}</p>
      <p className="text-white text-sm font-bold">
        ${((entry?.value ?? 0) / 1000).toFixed(1)}K
      </p>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  const [statusFilter, setStatusFilter] = useState<"all" | "paid" | "pending" | "failed">("all");

  const filteredTransactions =
    statusFilter === "all"
      ? transactions
      : transactions.filter((tx) => tx.status === statusFilter);

  const totalDonut = donutData.reduce((s, d) => s + (d.value ?? 0), 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-1">
                Revenue
              </h1>
              <p className="text-slate-400 text-sm">
                MRR, ARR, and transaction history — June 2024
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-colors duration-200"
            >
              <DollarSign className="w-4 h-4" />
              Export Report
            </motion.button>
          </div>
        </motion.div>

        {/* ── KPI Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10"
        >
          {kpiCards.map((card) => {
            const Icon = card.icon;
            const isPositive = card.change >= 0;
            return (
              <motion.div
                key={card.id}
                variants={scaleIn}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative bg-slate-900/60 border border-slate-800/60 rounded-2xl p-5 overflow-hidden group cursor-default"
              >
                {/* Glow */}
                <div
                  className={`absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 bg-gradient-to-br ${colorMap[card.color]}`}
                />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center ${bgMap[card.color]}`}
                    >
                      <Icon className={`w-5 h-5 ${textMap[card.color]}`} />
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                        isPositive
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-red-400 bg-red-500/10"
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
                  <p className="text-2xl font-bold text-white mb-1">
                    {formatValue(card.value, card.prefix)}
                  </p>
                  <p className="text-slate-400 text-xs font-medium">{card.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Charts Row ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

          {/* Stacked Bar Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="xl:col-span-2 bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue by Plan Tier</h2>
                <p className="text-slate-400 text-xs mt-0.5">Jan – Jun 2024 · Stacked by tier</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { label: "Basic", color: BRAND.chartColors[2] },
                  { label: "Pro", color: BRAND.chartColors[1] },
                  { label: "Enterprise", color: BRAND.chartColors[0] },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                    <span
                      className="w-2.5 h-2.5 rounded-sm inline-block"
                      style={{ background: item.color }}
                    />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={stackedBarData}
                margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                barCategoryGap="28%"
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#1e293b"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
                  width={52}
                />
                <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(99,102,241,0.06)" }} />
                <Bar dataKey="Basic" stackId="a" fill={BRAND.chartColors[2]} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Pro" stackId="a" fill={BRAND.chartColors[1]} radius={[0, 0, 0, 0]} />
                <Bar dataKey="Enterprise" stackId="a" fill={BRAND.chartColors[0]} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Donut Chart */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col"
          >
            <div className="mb-4">
              <h2 className="text-base font-semibold text-white">Revenue Breakdown</h2>
              <p className="text-slate-400 text-xs mt-0.5">June 2024 · By plan</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full" style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={58}
                      outerRadius={88}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {donutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomDonutTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold text-white">
                    ${(totalDonut / 1000).toFixed(0)}K
                  </span>
                  <span className="text-slate-400 text-[11px]">Total MRR</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 space-y-2">
              {donutData.map((item) => {
                const pct = totalDonut > 0 ? ((item.value / totalDonut) * 100).toFixed(1) : "0.0";
                return (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-2 text-slate-400">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="text-slate-300 font-medium">
                      ${(item.value / 1000).toFixed(1)}K
                      <span className="text-slate-500 ml-1">({pct}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ── Transactions Table ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-slate-800/60">
            <div>
              <h2 className="text-base font-semibold text-white">Recent Transactions</h2>
              <p className="text-slate-400 text-xs mt-0.5">
                {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? "s" : ""}
                {statusFilter !== "all" ? ` · ${statusFilter}` : ""}
              </p>
            </div>
            {/* Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {(["all", "paid", "pending", "failed"] as const).map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200 ${
                    statusFilter === f
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                      : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/60"
                  }`}
                >
                  {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  {["Customer", "Plan", "Amount", "Date", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {(filteredTransactions ?? []).map((tx) => {
                  const sc = statusConfig[tx.status];
                  const StatusIcon = sc.icon;
                  return (
                    <motion.tr
                      key={tx.id}
                      variants={fadeIn}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className="border-b border-slate-800/40 last:border-0 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-white text-sm">
                          {tx.customer ?? "—"}
                        </div>
                        <div className="text-slate-500 text-xs mt-0.5">{tx.email ?? ""}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                            planBadge[tx.plan] ?? "text-slate-400 bg-slate-800 border-slate-700"
                          }`}
                        >
                          {tx.plan ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-white">
                          ${(tx.amount ?? 0).toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        {tx.date ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sc.className}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {sc.label}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </motion.tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden divide-y divide-slate-800/40">
            {(filteredTransactions ?? []).map((tx) => {
              const sc = statusConfig[tx.status];
              const StatusIcon = sc.icon;
              return (
                <motion.div
                  key={tx.id}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="px-4 py-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-white text-sm font-medium">{tx.customer ?? "—"}</p>
                      <p className="text-slate-500 text-xs">{tx.email ?? ""}</p>
                    </div>
                    <span className="font-bold text-white text-sm">
                      ${(tx.amount ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                        planBadge[tx.plan] ?? "text-slate-400 bg-slate-800 border-slate-700"
                      }`}
                    >
                      {tx.plan ?? "—"}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${sc.className}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {sc.label}
                    </span>
                    <span className="text-slate-500 text-xs ml-auto">{tx.date ?? "—"}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredTransactions.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-slate-500 text-sm">No transactions match this filter.</p>
            </div>
          )}
        </motion.div>

      </div>
    </main>
  );
}