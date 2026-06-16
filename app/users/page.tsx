"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Users, UserPlus, UserMinus, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { BRAND } from "@/lib/data";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";

// ── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USERS = [
  { id: "u001", name: "Sophia Hartwell", email: "sophia.hartwell@acme.io", plan: "Enterprise", status: "active", joined: "2024-01-08", avatar: "SH", avatarColor: "#6366f1" },
  { id: "u002", name: "Marcus Chen", email: "m.chen@brightlabs.com", plan: "Pro", status: "active", joined: "2024-01-15", avatar: "MC", avatarColor: "#8b5cf6" },
  { id: "u003", name: "Priya Nair", email: "priya@nairdesign.co", plan: "Starter", status: "active", joined: "2024-01-22", avatar: "PN", avatarColor: "#06b6d4" },
  { id: "u004", name: "James Okafor", email: "james.okafor@finvault.ng", plan: "Pro", status: "churned", joined: "2024-02-03", avatar: "JO", avatarColor: "#10b981" },
  { id: "u005", name: "Elena Vasquez", email: "elena.v@cloudpeak.es", plan: "Enterprise", status: "active", joined: "2024-02-11", avatar: "EV", avatarColor: "#f59e0b" },
  { id: "u006", name: "Liam Thornton", email: "liam@thorntonco.uk", plan: "Starter", status: "pending", joined: "2024-02-19", avatar: "LT", avatarColor: "#ef4444" },
  { id: "u007", name: "Aisha Kamara", email: "aisha.k@nexatech.io", plan: "Pro", status: "active", joined: "2024-03-02", avatar: "AK", avatarColor: "#6366f1" },
  { id: "u008", name: "Noah Bergström", email: "noah.b@nordic.se", plan: "Enterprise", status: "active", joined: "2024-03-10", avatar: "NB", avatarColor: "#8b5cf6" },
  { id: "u009", name: "Fatima Al-Rashid", email: "fatima@rashidgroup.ae", plan: "Pro", status: "active", joined: "2024-03-18", avatar: "FA", avatarColor: "#06b6d4" },
  { id: "u010", name: "Carlos Mendez", email: "carlos.m@latamhub.mx", plan: "Starter", status: "churned", joined: "2024-03-25", avatar: "CM", avatarColor: "#10b981" },
  { id: "u011", name: "Yuki Tanaka", email: "yuki.t@tokyodev.jp", plan: "Pro", status: "active", joined: "2024-04-04", avatar: "YT", avatarColor: "#f59e0b" },
  { id: "u012", name: "Ingrid Solvang", email: "ingrid@solvang.no", plan: "Enterprise", status: "active", joined: "2024-04-12", avatar: "IS", avatarColor: "#ef4444" },
  { id: "u013", name: "Kwame Asante", email: "kwame.a@asanteventures.gh", plan: "Starter", status: "pending", joined: "2024-04-20", avatar: "KA", avatarColor: "#6366f1" },
  { id: "u014", name: "Mia Kowalski", email: "mia.k@pixelcraft.pl", plan: "Pro", status: "active", joined: "2024-04-28", avatar: "MK", avatarColor: "#8b5cf6" },
  { id: "u015", name: "Ravi Sharma", email: "ravi.s@techbridge.in", plan: "Enterprise", status: "active", joined: "2024-05-06", avatar: "RS", avatarColor: "#06b6d4" },
  { id: "u016", name: "Amara Diallo", email: "amara.d@sahelsoft.sn", plan: "Starter", status: "active", joined: "2024-05-14", avatar: "AD", avatarColor: "#10b981" },
  { id: "u017", name: "Oliver Müller", email: "o.muller@berlintech.de", plan: "Pro", status: "churned", joined: "2024-05-22", avatar: "OM", avatarColor: "#f59e0b" },
  { id: "u018", name: "Chloe Beaumont", email: "chloe.b@lumiere.fr", plan: "Enterprise", status: "active", joined: "2024-06-01", avatar: "CB", avatarColor: "#ef4444" },
  { id: "u019", name: "Tariq Hassan", email: "tariq.h@crescentio.pk", plan: "Pro", status: "active", joined: "2024-06-09", avatar: "TH", avatarColor: "#6366f1" },
  { id: "u020", name: "Valentina Rossi", email: "v.rossi@milanstudio.it", plan: "Starter", status: "pending", joined: "2024-06-17", avatar: "VR", avatarColor: "#8b5cf6" },
  { id: "u021", name: "Ethan Park", email: "ethan.p@seoulbytes.kr", plan: "Pro", status: "active", joined: "2024-06-25", avatar: "EP", avatarColor: "#06b6d4" },
  { id: "u022", name: "Nadia Petrov", email: "nadia.p@moscowhub.ru", plan: "Enterprise", status: "active", joined: "2024-07-03", avatar: "NP", avatarColor: "#10b981" },
  { id: "u023", name: "Samuel Osei", email: "samuel.o@accratech.gh", plan: "Starter", status: "active", joined: "2024-07-11", avatar: "SO", avatarColor: "#f59e0b" },
  { id: "u024", name: "Isabelle Fontaine", email: "isabelle.f@quebecco.ca", plan: "Pro", status: "churned", joined: "2024-07-19", avatar: "IF", avatarColor: "#ef4444" },
  { id: "u025", name: "Arjun Mehta", email: "arjun.m@mumbaicloud.in", plan: "Enterprise", status: "active", joined: "2024-07-27", avatar: "AM", avatarColor: "#6366f1" },
];

const GROWTH_DATA = [
  { month: "Jan", users: 42, newUsers: 42, churned: 0 },
  { month: "Feb", users: 89, newUsers: 51, churned: 4 },
  { month: "Mar", users: 147, newUsers: 63, churned: 5 },
  { month: "Apr", users: 218, newUsers: 78, churned: 7 },
  { month: "May", users: 301, newUsers: 91, churned: 8 },
  { month: "Jun", users: 389, newUsers: 96, churned: 8 },
  { month: "Jul", users: 487, newUsers: 106, churned: 8 },
  { month: "Aug", users: 592, newUsers: 113, churned: 8 },
  { month: "Sep", users: 704, newUsers: 120, churned: 8 },
  { month: "Oct", users: 831, newUsers: 135, churned: 8 },
  { month: "Nov", users: 968, newUsers: 145, churned: 8 },
  { month: "Dec", users: 1124, newUsers: 164, churned: 8 },
];

type SortField = "name" | "plan" | "status" | "joined";
type SortDir = "asc" | "desc";

const PLAN_ORDER: Record<string, number> = { Enterprise: 0, Pro: 1, Starter: 2 };
const STATUS_COLORS: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  churned: "bg-red-500/15 text-red-400 border-red-500/30",
};
const PLAN_COLORS: Record<string, string> = {
  Enterprise: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
  Pro: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Starter: "bg-slate-500/15 text-slate-400 border-slate-500/30",
};

const PAGE_SIZE = 8;

// ── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  positive?: boolean;
  iconBg: string;
}

function StatCard({ icon, label, value, sub, positive, iconBg }: StatCardProps) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, scale: 1.01 }}
      className="relative overflow-hidden rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 backdrop-blur-sm"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full border ${
            positive === undefined
              ? "bg-slate-800/60 text-slate-400 border-slate-700/50"
              : positive
              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
              : "bg-red-500/15 text-red-400 border-red-500/30"
          }`}
        >
          {sub}
        </span>
      </div>
      <p className="text-3xl font-bold text-white tracking-tight mb-1">{value}</p>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-5 blur-2xl bg-indigo-500" />
    </motion.div>
  );
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-slate-400 font-medium mb-2">{label ?? ""}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-white font-semibold">{(entry.value ?? 0).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortField, setSortField] = useState<SortField>("joined");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);

  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter((u) => u.status === "active").length;
  const newThisMonth = MOCK_USERS.filter((u) => u.joined.startsWith("2024-07")).length;
  const churned = MOCK_USERS.filter((u) => u.status === "churned").length;

  const filtered = useMemo(() => {
    let rows = [...MOCK_USERS];
    if (search.trim()) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q)
      );
    }
    if (planFilter !== "All") rows = rows.filter((u) => u.plan === planFilter);
    if (statusFilter !== "All") rows = rows.filter((u) => u.status === statusFilter);

    rows.sort((a, b) => {
      let cmp = 0;
      if (sortField === "name") cmp = a.name.localeCompare(b.name);
      else if (sortField === "plan") cmp = (PLAN_ORDER[a.plan] ?? 99) - (PLAN_ORDER[b.plan] ?? 99);
      else if (sortField === "status") cmp = a.status.localeCompare(b.status);
      else if (sortField === "joined") cmp = a.joined.localeCompare(b.joined);
      return sortDir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [search, planFilter, statusFilter, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePageIndex = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePageIndex - 1) * PAGE_SIZE, safePageIndex * PAGE_SIZE);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
    setPage(1);
  }

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 text-indigo-400" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-indigo-400" />
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium mb-2">
            <Users className="w-4 h-4" />
            <span>User Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
            Users
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Monitor user growth, manage accounts, and track engagement across all subscription tiers.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <StatCard
            icon={<Users className="w-5 h-5 text-indigo-400" />}
            label="Total Users"
            value={totalUsers.toLocaleString()}
            sub="All time"
            iconBg="bg-indigo-500/15"
          />
          <StatCard
            icon={<Users className="w-5 h-5 text-emerald-400" />}
            label="Active Users"
            value={activeUsers.toLocaleString()}
            sub={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
            positive={true}
            iconBg="bg-emerald-500/15"
          />
          <StatCard
            icon={<UserPlus className="w-5 h-5 text-violet-400" />}
            label="New This Month"
            value={newThisMonth.toLocaleString()}
            sub="+18% vs last mo."
            positive={true}
            iconBg="bg-violet-500/15"
          />
          <StatCard
            icon={<UserMinus className="w-5 h-5 text-red-400" />}
            label="Churned"
            value={churned.toLocaleString()}
            sub="2.1% churn rate"
            positive={false}
            iconBg="bg-red-500/15"
          />
        </motion.div>

        {/* Growth Chart */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 p-6 mb-8 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-white">User Growth</h2>
              <p className="text-sm text-slate-400 mt-0.5">Cumulative users and monthly new sign-ups over 2024</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-indigo-400 inline-block" />
                Total Users
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded-full bg-violet-400 inline-block" />
                New Users
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={GROWTH_DATA} margin={{ top: 4, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="gradTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                name="Total Users"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#gradTotal)"
                dot={false}
                activeDot={{ r: 5, fill: "#6366f1", strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="newUsers"
                name="New Users"
                stroke="#8b5cf6"
                strokeWidth={2}
                fill="url(#gradNew)"
                dot={false}
                activeDot={{ r: 5, fill: "#8b5cf6", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Table Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl bg-slate-900/70 border border-slate-800/60 backdrop-blur-sm overflow-hidden"
        >
          {/* Table Controls */}
          <div className="p-5 border-b border-slate-800/60 flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name or email…"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/30 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-slate-500">
                <Filter className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">Filter:</span>
              </div>
              <select
                value={planFilter}
                onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
              >
                <option value="All">All Plans</option>
                <option value="Enterprise">Enterprise</option>
                <option value="Pro">Pro</option>
                <option value="Starter">Starter</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-sm text-slate-300 focus:outline-none focus:border-indigo-500/60 transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="churned">Churned</option>
              </select>
            </div>

            <div className="sm:ml-auto text-xs text-slate-500 self-center whitespace-nowrap">
              {filtered.length} user{filtered.length !== 1 ? "s" : ""} found
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800/60">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <button
                      onClick={() => toggleSort("name")}
                      className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                    >
                      User <SortIcon field="name" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    <button
                      onClick={() => toggleSort("plan")}
                      className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                    >
                      Plan <SortIcon field="plan" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <button
                      onClick={() => toggleSort("status")}
                      className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                    >
                      Status <SortIcon field="status" />
                    </button>
                  </th>
                  <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">
                    <button
                      onClick={() => toggleSort("joined")}
                      className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
                    >
                      Joined <SortIcon field="joined" />
                    </button>
                  </th>
                </tr>
              </thead>
              <motion.tbody
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-16 text-slate-500">
                      No users match your filters.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((user) => (
                    <motion.tr
                      key={user.id}
                      variants={fadeIn}
                      whileHover={{ backgroundColor: "rgba(99,102,241,0.04)" }}
                      className="border-b border-slate-800/40 last:border-0 transition-colors"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: user.avatarColor + "33", border: `1.5px solid ${user.avatarColor}55` }}
                          >
                            <span style={{ color: user.avatarColor }}>{user.avatar}</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-slate-100 truncate">{user.name}</p>
                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      {/* Plan */}
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${PLAN_COLORS[user.plan] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
                          {user.plan}
                        </span>
                      </td>
                      {/* Status */}
                      <td className="px-4 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${STATUS_COLORS[user.status] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-emerald-400" : user.status === "pending" ? "bg-amber-400" : "bg-red-400"}`} />
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      {/* Joined */}
                      <td className="px-4 py-4 hidden lg:table-cell text-slate-400 text-xs">
                        {user.joined}
                      </td>
                    </motion.tr>
                  ))
                )}
              </motion.tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Showing {filtered.length === 0 ? 0 : (safePageIndex - 1) * PAGE_SIZE + 1}–{Math.min(safePageIndex * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePageIndex === 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </motion.button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <motion.button
                  key={p}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                    p === safePageIndex
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  {p}
                </motion.button>
              ))}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePageIndex === totalPages}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}