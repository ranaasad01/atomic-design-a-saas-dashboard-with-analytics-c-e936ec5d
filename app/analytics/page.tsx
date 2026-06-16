"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Users, TrendingUp, TrendingDown, Activity, Calendar, ArrowUpRight, ArrowDownRight, Eye, MousePointerClick, Clock, Zap } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const activeUsersData = [
  { date: "Jan 1", users: 4200, sessions: 6100 },
  { date: "Jan 8", users: 4800, sessions: 6900 },
  { date: "Jan 15", users: 5100, sessions: 7400 },
  { date: "Jan 22", users: 4700, sessions: 6800 },
  { date: "Jan 29", users: 5600, sessions: 8100 },
  { date: "Feb 5", users: 6200, sessions: 8900 },
  { date: "Feb 12", users: 6800, sessions: 9700 },
  { date: "Feb 19", users: 7100, sessions: 10200 },
  { date: "Feb 26", users: 6900, sessions: 9900 },
  { date: "Mar 5", users: 7500, sessions: 10800 },
  { date: "Mar 12", users: 8200, sessions: 11700 },
  { date: "Mar 19", users: 8700, sessions: 12400 },
  { date: "Mar 26", users: 9100, sessions: 13000 },
  { date: "Apr 2", users: 8800, sessions: 12600 },
  { date: "Apr 9", users: 9400, sessions: 13500 },
  { date: "Apr 16", users: 10100, sessions: 14400 },
  { date: "Apr 23", users: 10600, sessions: 15100 },
  { date: "Apr 30", users: 11200, sessions: 15900 },
];

const revenueComparisonData = [
  { month: "Jan", current: 42000, previous: 31000 },
  { month: "Feb", current: 48500, previous: 35200 },
  { month: "Mar", current: 53200, previous: 38900 },
  { month: "Apr", current: 51800, previous: 41000 },
  { month: "May", current: 59400, previous: 44500 },
  { month: "Jun", current: 64100, previous: 47800 },
  { month: "Jul", current: 61700, previous: 50200 },
  { month: "Aug", current: 68900, previous: 52600 },
  { month: "Sep", current: 74200, previous: 55100 },
  { month: "Oct", current: 79500, previous: 58400 },
  { month: "Nov", current: 85300, previous: 61700 },
  { month: "Dec", current: 91800, previous: 65000 },
];

const summaryStats = [
  {
    id: "active-users",
    label: "Active Users",
    value: "11,247",
    change: 18.4,
    positive: true,
    icon: Users,
    color: "indigo",
  },
  {
    id: "page-views",
    label: "Page Views",
    value: "284,910",
    change: 12.7,
    positive: true,
    icon: Eye,
    color: "violet",
  },
  {
    id: "avg-session",
    label: "Avg. Session",
    value: "4m 32s",
    change: -3.1,
    positive: false,
    icon: Clock,
    color: "cyan",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "3.84%",
    change: 0.6,
    positive: true,
    icon: MousePointerClick,
    color: "emerald",
  },
  {
    id: "bounce-rate",
    label: "Bounce Rate",
    value: "28.3%",
    change: -5.2,
    positive: true,
    icon: Activity,
    color: "amber",
  },
  {
    id: "new-signups",
    label: "New Signups",
    value: "1,893",
    change: 22.1,
    positive: true,
    icon: Zap,
    color: "pink",
  },
];

const topPages = [
  { path: "/dashboard", views: 48210, change: 12.4, positive: true },
  { path: "/analytics", views: 31540, change: 8.7, positive: true },
  { path: "/pricing", views: 27890, change: -2.3, positive: false },
  { path: "/users", views: 19450, change: 15.1, positive: true },
  { path: "/revenue", views: 16320, change: 5.9, positive: true },
  { path: "/settings", views: 9870, change: -1.2, positive: false },
];

const trafficSources = [
  { source: "Organic Search", visitors: 42180, pct: 38 },
  { source: "Direct", visitors: 27650, pct: 25 },
  { source: "Referral", visitors: 18920, pct: 17 },
  { source: "Social Media", visitors: 13340, pct: 12 },
  { source: "Email", visitors: 8870, pct: 8 },
];

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 90 days", "Last 12 months", "Custom"] as const;
type DateRange = (typeof DATE_RANGES)[number];

// ─── Color helpers ─────────────────────────────────────────────────────────────

const colorMap: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    border: "border-indigo-500/20",
    glow: "shadow-indigo-500/20",
  },
  violet: {
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    border: "border-violet-500/20",
    glow: "shadow-violet-500/20",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/20",
    glow: "shadow-cyan-500/20",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    glow: "shadow-emerald-500/20",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/20",
  },
  pink: {
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    border: "border-pink-500/20",
    glow: "shadow-pink-500/20",
  },
};

// ─── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
  valuePrefix = "",
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  valuePrefix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl shadow-black/40">
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 text-sm">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold ml-auto pl-4">
            {valuePrefix}
            {(entry.value ?? 0).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>("Last 30 days");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[400px] bg-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Header ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" />
                  Live Data
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Analytics live
              </h1>
              <p className="text-slate-400 mt-1 text-sm sm:text-base">
                Deep-dive into user behavior, traffic sources, and revenue trends.
              </p>
            </div>

            {/* Date range filter */}
            <motion.div variants={scaleIn} className="flex items-center gap-2 flex-wrap">
              <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800/60 rounded-xl p-1">
                {DATE_RANGES.filter((r) => r !== "Custom").map((range) => (
                  <button
                    key={range}
                    onClick={() => setDateRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      dateRange === range
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* ── Summary Stat Pills ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
        >
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            const colors = colorMap[stat.color] ?? colorMap.indigo;
            return (
              <motion.div
                key={stat.id}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative bg-slate-900/70 border border-slate-800/60 rounded-2xl p-4 flex flex-col gap-2 cursor-default shadow-lg ${colors.glow}`}
              >
                <div className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${colors.text}`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium leading-tight">{stat.label}</p>
                  <p className="text-lg font-bold text-white mt-0.5">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${stat.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {stat.positive ? (
                    <ArrowUpRight className="w-3 h-3" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Active Users Area Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 mb-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Active Users Trend</h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Weekly active users and sessions — {dateRange}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                Users
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" />
                Sessions
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeUsersData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="sessionsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  interval={2}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fill="url(#usersGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fill="url(#sessionsGrad)"
                  dot={false}
                  activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ── Revenue Comparison Line Chart ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 mb-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">Revenue: Current vs Previous Period</h2>
              <p className="text-sm text-slate-400 mt-0.5">
                Monthly revenue comparison — this year vs last year
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                Current
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-slate-500 inline-block border-dashed" />
                Previous
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueComparisonData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
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
                <Tooltip content={<CustomTooltip valuePrefix="$" />} />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#6366f1", strokeWidth: 0 }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="#475569"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={{ r: 3, fill: "#475569", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#475569", strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* YoY summary */}
          <div className="mt-4 pt-4 border-t border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Revenue (Current)", value: "$780,400", change: "+34.2%" },
              { label: "Total Revenue (Previous)", value: "$581,400", change: "baseline" },
              { label: "YoY Growth", value: "+34.2%", change: "vs last year" },
              { label: "Best Month", value: "December", change: "$91,800" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-xs text-slate-500">{item.label}</p>
                <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
                <p className="text-xs text-emerald-400 mt-0.5">{item.change}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Bottom Grid: Top Pages + Traffic Sources ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Top Pages */}
          <motion.div
            variants={fadeInUp}
            className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Top Pages</h2>
                <p className="text-xs text-slate-400 mt-0.5">By page views this period</p>
              </div>
              <span className="text-xs text-indigo-400 font-medium bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                {dateRange}
              </span>
            </div>
            <div className="space-y-3">
              {(topPages ?? []).map((page, i) => {
                const maxViews = topPages[0]?.views ?? 1;
                const pct = Math.round(((page.views ?? 0) / maxViews) * 100);
                return (
                  <motion.div
                    key={page.path}
                    variants={fadeIn}
                    className="group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 w-4 font-mono">{i + 1}</span>
                        <span className="text-sm text-slate-300 font-medium font-mono">{page.path}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {(page.views ?? 0).toLocaleString()}
                        </span>
                        <span className={`flex items-center gap-0.5 text-xs font-medium ${page.positive ? "text-emerald-400" : "text-red-400"}`}>
                          {page.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {Math.abs(page.change ?? 0)}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.07 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Traffic Sources */}
          <motion.div
            variants={fadeInUp}
            className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-white">Traffic Sources</h2>
                <p className="text-xs text-slate-400 mt-0.5">Where your visitors come from</p>
              </div>
              <span className="text-xs text-violet-400 font-medium bg-violet-500/10 border border-violet-500/20 px-2.5 py-1 rounded-full">
                All channels
              </span>
            </div>
            <div className="space-y-4">
              {(trafficSources ?? []).map((src, i) => {
                const barColors = [
                  "from-indigo-500 to-indigo-400",
                  "from-violet-500 to-violet-400",
                  "from-cyan-500 to-cyan-400",
                  "from-emerald-500 to-emerald-400",
                  "from-amber-500 to-amber-400",
                ];
                const barColor = barColors[i % barColors.length] ?? barColors[0];
                return (
                  <motion.div key={src.source} variants={fadeIn}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-slate-300 font-medium">{src.source}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500">
                          {(src.visitors ?? 0).toLocaleString()} visitors
                        </span>
                        <span className="text-sm font-bold text-white w-8 text-right">
                          {src.pct ?? 0}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${src.pct ?? 0}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: i * 0.09 }}
                        className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-xs text-slate-500">Total visitors this period</span>
              <span className="text-sm font-bold text-white">
                {trafficSources.reduce((acc, s) => acc + (s.visitors ?? 0), 0).toLocaleString()}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Engagement Metrics Footer Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            {
              label: "Returning Users",
              value: "68.4%",
              sub: "of total active users",
              icon: Users,
              positive: true,
              change: "+4.2%",
              color: "indigo",
            },
            {
              label: "Goal Completions",
              value: "9,241",
              sub: "form submits + purchases",
              icon: TrendingUp,
              positive: true,
              change: "+11.8%",
              color: "emerald",
            },
            {
              label: "Avg. Pages / Session",
              value: "4.7",
              sub: "pages viewed per visit",
              icon: Eye,
              positive: false,
              change: "-0.3",
              color: "violet",
            },
          ].map((metric) => {
            const Icon = metric.icon;
            const colors = colorMap[metric.color] ?? colorMap.indigo;
            return (
              <motion.div
                key={metric.label}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-5 flex items-center gap-4 shadow-lg"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-medium">{metric.label}</p>
                  <p className="text-2xl font-bold text-white mt-0.5">{metric.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">{metric.sub}</p>
                </div>
                <div className={`text-sm font-semibold flex-shrink-0 ${metric.positive ? "text-emerald-400" : "text-red-400"}`}>
                  {metric.change}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );