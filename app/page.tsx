"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, ArrowRight, TrendingUp, Users, Star, Check, Sparkles, BarChart2, Bell, Shield, Zap, Globe, ChevronRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION, BRAND } from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ────────────────────────────────────────────────────────

const revenueData = [
  { month: "Jan", revenue: 42000, users: 1200 },
  { month: "Feb", revenue: 51000, users: 1450 },
  { month: "Mar", revenue: 47000, users: 1380 },
  { month: "Apr", revenue: 63000, users: 1820 },
  { month: "May", revenue: 71000, users: 2100 },
  { month: "Jun", revenue: 68000, users: 2050 },
  { month: "Jul", revenue: 84000, users: 2480 },
  { month: "Aug", revenue: 92000, users: 2760 },
  { month: "Sep", revenue: 88000, users: 2640 },
  { month: "Oct", revenue: 107000, users: 3120 },
  { month: "Nov", revenue: 118000, users: 3450 },
  { month: "Dec", revenue: 134000, users: 3900 },
];

const channelData = [
  { name: "Organic", value: 38 },
  { name: "Paid", value: 27 },
  { name: "Referral", value: 19 },
  { name: "Direct", value: 16 },
];

const kpiCards = [
  {
    label: "Monthly Revenue",
    value: "$134,200",
    change: "+18.4%",
    positive: true,
    icon: TrendingUp,
    color: "from-indigo-500 to-violet-600",
    glow: "shadow-indigo-500/20",
  },
  {
    label: "Active Users",
    value: "3,900",
    change: "+12.9%",
    positive: true,
    icon: Users,
    color: "from-cyan-500 to-blue-600",
    glow: "shadow-cyan-500/20",
  },
  {
    label: "Avg. Session",
    value: "4m 32s",
    change: "+6.1%",
    positive: true,
    icon: Activity,
    color: "from-emerald-500 to-teal-600",
    glow: "shadow-emerald-500/20",
  },
  {
    label: "Churn Rate",
    value: "2.3%",
    change: "-0.8%",
    positive: true,
    icon: BarChart2,
    color: "from-amber-500 to-orange-600",
    glow: "shadow-amber-500/20",
  },
];

const features = [
  {
    icon: Zap,
    title: "Real-Time Streaming",
    description:
      "Data refreshes every 5 seconds. Watch your KPIs move as events happen — no manual refresh, no stale numbers.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: BarChart2,
    title: "50+ Chart Types",
    description:
      "Area, bar, funnel, cohort, heatmap, and more. Every chart is interactive, exportable, and fully customizable.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: Users,
    title: "User-Level Analytics",
    description:
      "Drill from aggregate trends down to individual user journeys. Identify power users and at-risk accounts instantly.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Set threshold-based or anomaly-detection alerts. Get notified via Slack, email, or webhook the moment something shifts.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: Shield,
    title: "SOC 2 Compliant",
    description:
      "Enterprise-grade security with end-to-end encryption, role-based access control, and full audit logs.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Globe,
    title: "Multi-Region CDN",
    description:
      "Dashboards load in under 200 ms anywhere in the world. Data residency options for EU, US, and APAC.",
    color: "text-pink-400",
    bg: "bg-pink-500/10 border-pink-500/20",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Growth, Luma AI",
    avatar: "SC",
    avatarColor: "from-indigo-500 to-violet-600",
    quote:
      "Pulse replaced four separate tools for us. Our team went from spending 3 hours a week on reporting to 15 minutes. The real-time charts are genuinely beautiful.",
    stars: 5,
  },
  {
    name: "Marcus Webb",
    role: "CTO, Stackflow",
    avatar: "MW",
    avatarColor: "from-cyan-500 to-blue-600",
    quote:
      "The anomaly detection caught a billing bug that would have cost us $40k. ROI was immediate. I recommend Pulse to every SaaS founder I meet.",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "VP Product, Orbit SaaS",
    avatar: "PN",
    avatarColor: "from-emerald-500 to-teal-600",
    quote:
      "Finally a dashboard that non-technical stakeholders actually open. The design is so clean that our board now reviews Pulse charts directly in meetings.",
    stars: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Perfect for early-stage startups tracking core metrics.",
    features: [
      "Up to 5 team members",
      "10 dashboards",
      "30-day data history",
      "Email alerts",
      "CSV exports",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/mo",
    description: "For scaling teams that need depth and collaboration.",
    features: [
      "Up to 25 team members",
      "Unlimited dashboards",
      "1-year data history",
      "Slack + webhook alerts",
      "API access",
      "Custom chart builder",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Dedicated infrastructure, SLAs, and white-glove onboarding.",
    features: [
      "Unlimited team members",
      "Unlimited data history",
      "SSO / SAML",
      "SOC 2 audit reports",
      "Dedicated CSM",
      "Custom data residency",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const CHART_COLORS = BRAND.chartColors;

// ─── Sub-components ───────────────────────────────────────────────────────────

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} className="text-sm font-semibold text-white">
          {p.name === "revenue"
            ? `$${(p.value ?? 0).toLocaleString()}`
            : (p.value ?? 0).toLocaleString()}{" "}
          <span className="text-slate-400 font-normal text-xs">{p.name}</span>
        </p>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"revenue" | "users">("revenue");

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
          <div className="absolute top-10 right-1/4 w-[350px] h-[350px] bg-cyan-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Now with AI-powered anomaly detection
              <ChevronRight className="w-3.5 h-3.5" />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
            >
              <span className="text-white">Analytics that move</span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                as fast as you do.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
            >
              {APP_DESCRIPTION}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/dashboard">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow duration-300 cursor-pointer"
                >
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <Link href="/analytics">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 font-semibold text-base hover:bg-slate-800 hover:border-slate-600 transition-all duration-200 cursor-pointer"
                >
                  View Analytics
                </motion.span>
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.p
              variants={fadeIn}
              className="mt-8 text-sm text-slate-500"
            >
              Trusted by{" "}
              <span className="text-slate-300 font-medium">2,400+</span> SaaS
              teams · No credit card required · 14-day free trial
            </motion.p>
          </motion.div>

          {/* Hero chart preview */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 z-10 pointer-events-none rounded-2xl" />
            <div className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-2xl shadow-black/40 backdrop-blur-sm">
              {/* Mini dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
                    Annual Revenue
                  </p>
                  <p className="text-3xl font-bold text-white">$1.07M</p>
                  <p className="text-sm text-emerald-400 font-medium mt-0.5">
                    ↑ 18.4% vs last year
                  </p>
                </div>
                <div className="flex gap-2">
                  {(["revenue", "users"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                        activeTab === tab
                          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey={activeTab}
                    stroke={activeTab === "revenue" ? "#6366f1" : "#06b6d4"}
                    strokeWidth={2.5}
                    fill={activeTab === "revenue" ? "url(#colorRevenue)" : "url(#colorUsers)"}
                    dot={false}
                    activeDot={{ r: 5, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KPI Cards ── */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {kpiCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.label}
                  variants={fadeInUp}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`relative bg-slate-900/60 border border-slate-800/60 rounded-2xl p-6 shadow-xl ${card.glow} hover:border-slate-700/80 transition-all duration-300 cursor-default`}
                >
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} shadow-lg mb-4`}>
                    <Icon className="w-5 h-5 text-white" strokeWidth={2} />
                  </div>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-1">
                    {card.label}
                  </p>
                  <p className="text-3xl font-bold text-white mb-1">{card.value}</p>
                  <p className={`text-sm font-medium ${card.positive ? "text-emerald-400" : "text-red-400"}`}>
                    {card.change}{" "}
                    <span className="text-slate-500 font-normal">vs last month</span>
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Charts Section ── */}
      <section className="py-16 lg:py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-14"
          >
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mb-3">
              Live Analytics
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Every metric, beautifully visualized
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              From revenue trends to acquisition channels, Pulse turns raw data into
              decisions you can act on immediately.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Bar chart */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-2 bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-semibold text-white">Monthly Revenue</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Jan – Dec 2024</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                  +18.4% YoY
                </span>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={revenueData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: "#64748b", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="revenue"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={36}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie chart */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="bg-slate-900/70 border border-slate-800/60 rounded-2xl p-6 shadow-xl"
            >
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white">Acquisition Channels</h3>
                <p className="text-xs text-slate-500 mt-0.5">Traffic breakdown</p>
              </div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {channelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`${value}%`, "Share"]}
                    contentStyle={{
                      background: "#0f172a",
                      border: "1px solid #334155",
                      borderRadius: "12px",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {channelData.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: CHART_COLORS[i % CHART_COLORS.length] }}
                      />
                      <span className="text-xs text-slate-400">{item.name}</span>
                    </div>
                    <span className="text-xs font-semibold text-white">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mb-3">
              Why Pulse
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for teams that move fast
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Everything you need to understand your product, your users, and your
              revenue — without stitching together a dozen tools.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={scaleIn}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group bg-slate-900/50 border border-slate-800/60 rounded-2xl p-6 hover:border-slate-700/80 transition-all duration-300 cursor-default"
                >
                  <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl border ${feature.bg} mb-5`}>
                    <Icon className={`w-5 h-5 ${feature.color}`} strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 lg:py-28 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs text-indigo-400 uppercase tracking-widest font-semibold mb-3">
              Social Proof
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by product teams worldwide
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Over 2,400 SaaS companies use Pulse to make faster, smarter decisions
              every single day.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeInUp}
                whileHover={{ y: -4 }}
                className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-7 shadow-xl hover:border-slate-700/80 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-16"
          >
            <p className="text-xs text-ind