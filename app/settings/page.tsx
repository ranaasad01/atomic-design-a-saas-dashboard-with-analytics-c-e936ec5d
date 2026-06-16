"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, CreditCard, Shield, Mail, Phone, Globe, Camera, Check, AlertCircle, Star, Zap, ArrowRight, Save } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { BRAND } from "@/lib/data";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ToggleProps {
  checked: boolean;
  onChange: (val: boolean) => void;
  label: string;
  description?: string;
}

interface NotificationSettings {
  emailDigest: boolean;
  weeklyReport: boolean;
  revenueAlerts: boolean;
  userSignups: boolean;
  failedPayments: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
  securityAlerts: boolean;
}

interface ProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  website: string;
  timezone: string;
  language: string;
  bio: string;
}

// ─── Toggle Component ─────────────────────────────────────────────────────────

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-200">{label}</p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        whileTap={{ scale: 0.93 }}
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          checked ? "bg-indigo-500" : "bg-slate-700"
        }`}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </motion.button>
    </div>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function Section({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-slate-900/60 border border-slate-800/60 rounded-2xl overflow-hidden"
    >
      <div className="px-6 py-5 border-b border-slate-800/60 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
          <Icon className="w-4.5 h-4.5 text-indigo-400" style={{ width: 18, height: 18 }} />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-100">{title}</h2>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  );
}

// ─── Plan Badge ───────────────────────────────────────────────────────────────

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$0",
    period: "/mo",
    features: ["Up to 3 users", "10K events/mo", "7-day data retention", "Email support"],
    icon: Star,
    gradient: "from-slate-700 to-slate-600",
    border: "border-slate-700",
    badge: null,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$49",
    period: "/mo",
    features: ["Up to 25 users", "500K events/mo", "90-day retention", "Priority support"],
    icon: Zap,
    gradient: "from-indigo-600 to-violet-600",
    border: "border-indigo-500/50",
    badge: "Current Plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    period: "/mo",
    features: ["Unlimited users", "Unlimited events", "1-year retention", "Dedicated CSM"],
    icon: Shield,
    gradient: "from-violet-600 to-fuchsia-600",
    border: "border-violet-500/40",
    badge: "Most Popular",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  // Profile form state
  const [profile, setProfile] = useState<ProfileForm>({
    firstName: "Alex",
    lastName: "Rivera",
    email: "alex.rivera@pulseanalytics.io",
    phone: "+1 (555) 012-3456",
    company: "Pulse Analytics",
    website: "https://pulseanalytics.io",
    timezone: "America/New_York",
    language: "en",
    bio: "Product-led growth enthusiast. Building data-driven products that scale.",
  });

  const [profileSaved, setProfileSaved] = useState(false);

  // Notification state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailDigest: true,
    weeklyReport: true,
    revenueAlerts: true,
    userSignups: false,
    failedPayments: true,
    systemUpdates: false,
    marketingEmails: false,
    securityAlerts: true,
  });

  // Billing state
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  // Active tab
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "billing" | "security">(
    "profile"
  );

  const tabs = [
    { id: "profile" as const, label: "Profile", icon: User },
    { id: "notifications" as const, label: "Notifications", icon: Bell },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
    { id: "security" as const, label: "Security", icon: Shield },
  ];

  function handleProfileChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  }

  function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  }

  function setNotif(key: keyof NotificationSettings, val: boolean) {
    setNotifications((prev) => ({ ...prev, [key]: val }));
  }

  const inputClass =
    "w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 transition-all duration-200";

  const labelClass = "block text-xs font-medium text-slate-400 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Page header */}
      <div className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-sm sticky top-16 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-2xl font-bold text-white tracking-tight">Settings</h1>
              <p className="text-sm text-slate-400 mt-0.5">
                Manage your account, notifications, and billing preferences.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Pro Plan Active
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar tabs */}
          <motion.aside
            variants={slideInLeftVariant}
            initial="hidden"
            animate="visible"
            className="lg:w-52 flex-shrink-0"
          >
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: active ? 0 : 3 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                      active
                        ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/25"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          {/* Main content */}
          <motion.main
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 min-w-0 space-y-6"
          >
            {/* ── PROFILE TAB ── */}
            {activeTab === "profile" && (
              <>
                <Section
                  title="Public Profile"
                  description="This information will be displayed on your account."
                  icon={User}
                >
                  <form onSubmit={handleProfileSave} className="space-y-5">
                    {/* Avatar */}
                    <div className="flex items-center gap-4 pb-4 border-b border-slate-800/60">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-indigo-500/25">
                          {(profile.firstName?.[0] ?? "A")}
                          {(profile.lastName?.[0] ?? "R")}
                        </div>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.93 }}
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-slate-700 border border-slate-600 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-colors"
                        >
                          <Camera className="w-3 h-3" />
                        </motion.button>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-200">
                          {profile.firstName} {profile.lastName}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{profile.email}</p>
                        <button
                          type="button"
                          className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 transition-colors"
                        >
                          Change avatar
                        </button>
                      </div>
                    </div>

                    {/* Name row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="firstName">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={profile.firstName}
                          onChange={handleProfileChange}
                          className={inputClass}
                          placeholder="First name"
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="lastName">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={profile.lastName}
                          onChange={handleProfileChange}
                          className={inputClass}
                          placeholder="Last name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="email">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            className={`${inputClass} pl-9`}
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="phone">
                          Phone Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={profile.phone}
                            onChange={handleProfileChange}
                            className={`${inputClass} pl-9`}
                            placeholder="+1 (555) 000-0000"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company & Website */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="company">
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={profile.company}
                          onChange={handleProfileChange}
                          className={inputClass}
                          placeholder="Your company"
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="website">
                          Website
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            id="website"
                            name="website"
                            type="url"
                            value={profile.website}
                            onChange={handleProfileChange}
                            className={`${inputClass} pl-9`}
                            placeholder="https://yoursite.com"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Timezone & Language */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="timezone">
                          Timezone
                        </label>
                        <select
                          id="timezone"
                          name="timezone"
                          value={profile.timezone}
                          onChange={handleProfileChange}
                          className={inputClass}
                        >
                          <option value="America/New_York">Eastern Time (ET)</option>
                          <option value="America/Chicago">Central Time (CT)</option>
                          <option value="America/Denver">Mountain Time (MT)</option>
                          <option value="America/Los_Angeles">Pacific Time (PT)</option>
                          <option value="Europe/London">London (GMT)</option>
                          <option value="Europe/Paris">Paris (CET)</option>
                          <option value="Asia/Tokyo">Tokyo (JST)</option>
                          <option value="Asia/Singapore">Singapore (SGT)</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="language">
                          Language
                        </label>
                        <select
                          id="language"
                          name="language"
                          value={profile.language}
                          onChange={handleProfileChange}
                          className={inputClass}
                        >
                          <option value="en">English</option>
                          <option value="es">Español</option>
                          <option value="fr">Français</option>
                          <option value="de">Deutsch</option>
                          <option value="ja">日本語</option>
                          <option value="zh">中文</option>
                        </select>
                      </div>
                    </div>

                    {/* Bio */}
                    <div>
                      <label className={labelClass} htmlFor="bio">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        name="bio"
                        rows={3}
                        value={profile.bio}
                        onChange={handleProfileChange}
                        className={`${inputClass} resize-none`}
                        placeholder="Tell us a little about yourself…"
                      />
                      <p className="text-xs text-slate-600 mt-1">
                        {(profile.bio ?? "").length}/160 characters
                      </p>
                    </div>

                    {/* Save button */}
                    <div className="flex items-center justify-between pt-2">
                      {profileSaved && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1.5 text-sm text-emerald-400"
                        >
                          <Check className="w-4 h-4" />
                          Changes saved!
                        </motion.span>
                      )}
                      {!profileSaved && <span />}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </motion.button>
                    </div>
                  </form>
                </Section>

                {/* Danger zone */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-red-950/20 border border-red-900/40 rounded-2xl px-6 py-5"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-red-300">Danger Zone</h3>
                      <p className="text-xs text-red-400/70 mt-1 leading-relaxed">
                        Permanently delete your account and all associated data. This action cannot
                        be undone.
                      </p>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-shrink-0 px-4 py-2 rounded-xl border border-red-700/50 text-red-400 text-xs font-medium hover:bg-red-900/30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    >
                      Delete Account
                    </motion.button>
                  </div>
                </motion.div>
              </>
            )}

            {/* ── NOTIFICATIONS TAB ── */}
            {activeTab === "notifications" && (
              <Section
                title="Notification Preferences"
                description="Choose what you want to be notified about and how."
                icon={Bell}
              >
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Email Notifications
                  </p>
                  <div className="divide-y divide-slate-800/60">
                    <Toggle
                      checked={notifications.emailDigest}
                      onChange={(v) => setNotif("emailDigest", v)}
                      label="Daily Email Digest"
                      description="Receive a summary of your key metrics every morning at 8 AM."
                    />
                    <Toggle
                      checked={notifications.weeklyReport}
                      onChange={(v) => setNotif("weeklyReport", v)}
                      label="Weekly Performance Report"
                      description="A comprehensive weekly breakdown of revenue, users, and growth."
                    />
                    <Toggle
                      checked={notifications.marketingEmails}
                      onChange={(v) => setNotif("marketingEmails", v)}
                      label="Product Updates & Tips"
                      description="Occasional emails about new features, tips, and best practices."
                    />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 pt-5">
                    Real-Time Alerts
                  </p>
                  <div className="divide-y divide-slate-800/60">
                    <Toggle
                      checked={notifications.revenueAlerts}
                      onChange={(v) => setNotif("revenueAlerts", v)}
                      label="Revenue Threshold Alerts"
                      description="Get notified when daily revenue exceeds or drops below your set thresholds."
                    />
                    <Toggle
                      checked={notifications.userSignups}
                      onChange={(v) => setNotif("userSignups", v)}
                      label="New User Signups"
                      description="Instant notification whenever a new user creates an account."
                    />
                    <Toggle
                      checked={notifications.failedPayments}
                      onChange={(v) => setNotif("failedPayments", v)}
                      label="Failed Payment Alerts"
                      description="Be alerted immediately when a payment fails or a subscription lapses."
                    />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3 pt-5">
                    System
                  </p>
                  <div className="divide-y divide-slate-800/60">
                    <Toggle
                      checked={notifications.systemUpdates}
                      onChange={(v) => setNotif("systemUpdates", v)}
                      label="System Maintenance Notices"
                      description="Advance notice of scheduled maintenance windows and downtime."
                    />
                    <Toggle
                      checked={notifications.securityAlerts}
                      onChange={(v) => setNotif("securityAlerts", v)}
                      label="Security Alerts"
                      description="Critical alerts for new logins, password changes, and suspicious activity."
                    />
                  </div>

                  <div className="pt-5 flex justify-end">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </motion.button>
                  </div>
                </div>
              </Section>
            )}

            {/* ── BILLING TAB ── */}
            {activeTab === "billing" && (
              <>
                {/* Billing cycle toggle */}
                <motion.div
                  variants={fadeInUp}
                  className="flex items-center justify-center gap-3 p-1 bg-slate-900/60 border border-slate-800/60 rounded-2xl w-fit mx-auto"
                >
                  {(["monthly", "annual"] as const).map((cycle) => (
                    <motion.button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      whileTap={{ scale: 0.97 }}
                      className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                        billingCycle === cycle
                          ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {cycle === "monthly" ? "Monthly" : "Annual"}
                      {cycle === "annual" && (
                        <span className="ml-2 text-xs bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
                          Save 20%
                        </span>
                      )}
                    </motion.button>
                  ))}
                </motion.div>

                {/* Plan cards */}
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {plans.map((plan) => {
                    const Icon = plan.icon;
                    const isSelected = selectedPlan === plan.id;
                    const displayPrice =
                      billingCycle === "annual" && plan.price !== "$0"
                        ? `$${Math.round(parseInt(plan.price.replace("$", "")) * 0.8)}`
                        : plan.price;

                    return (
                      <motion.div
                        key={plan.id}
                        variants={scaleIn}
                        whileHover={{ y: -4, scale: 1.01 }}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative cursor-pointer rounded-2xl border p-5 transition-all duration-200 ${
                          isSelected
                            ? `${plan.border} bg-indigo-500/5 shadow-lg shadow-indigo-500/10`
                            : "border-slate-800/60 bg-slate-900/40 hover:border-slate-700"
                        }`}
                      >
                        {plan.badge && (
                          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                            {plan.badge}
                          </span>
                        )}
                        <div
                          className={`w-9 h-9 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-3 shadow-lg`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <h3 className="text-sm font-bold text-slate-100">{plan.name}</h3>
                        <div className="flex items-baseline gap-0.5 mt-1 mb-3">
                          <span className="text-2xl font-extrabold text-white">{displayPrice}</span>
                          <span className="text-xs text-slate-500">{plan.period}</span>
                        </div>
                        <ul className="space-y-1.5">
                          {(plan.features ?? []).map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-slate-400">
                              <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        {isSelected && (
                          <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                            <Check className="w-3.5 h-3.5" />
                            Current selection
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>

                {/* Payment method */}
                <Section
                  title="Payment Method"
                  description="Manage your payment details and billing address."
                  icon={CreditCard}
                >
                  <div className="space-y-4">
                    {/* Card display */}
                    <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-7 rounded-md bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-slate-300" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-200">Visa ending in 4242</p>
                          <p className="text-xs text-slate-500">Expires 08 / 2027</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                        Default
                      </span>
                    </div>

                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-slate-700 text-slate-400 text-sm hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all duration-200"
                    >
                      + Add Payment Method
                    </motion.button>

                    <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <p className="text-xs text-slate-500">
                        Next billing date:{" "}
                        <span className="text-slate-300 font-medium">February 1, 2025</span>
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      >
                        Upgrade Plan
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </Section>
              </>
            )}

            {/* ── SECURITY TAB ── */}
            {activeTab === "security" && (
              <>
                <Section
                  title="Password & Authentication"
                  description="Keep your account secure with a strong password and 2FA."
                  icon={Shield}
                >
                  <div className="space-y-4">
                    <div>
                      <label className={labelClass} htmlFor="currentPassword">
                        Current Password
                      </label>
                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        defaultValue=""
                        className={inputClass}
                        placeholder="Enter current password"
                        autoComplete="current-password"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} htmlFor="newPassword">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          defaultValue=""
                          className={inputClass}
                          placeholder="Min. 8 characters"
                          autoComplete="new-password"
                        />
                      </div>
                      <div>
                        <label className={labelClass} htmlFor="confirmPassword">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          defaultValue=""
                          className={inputClass}
                          placeholder="Repeat new password"
                          autoComplete="new-password"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-1">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      >
                        <Save className="w-4 h-4" />
                        Update Password
                      </motion.button>
                    </div>
                  </div>
                </Section>

                {/* 2FA */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-slate-900/60 border border-slate-800/60 rounded-2xl px-6 py-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-100">
                          Two-Factor Authentication
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-sm">
                          Add an extra layer of security to your account. We support authenticator
                          apps (TOTP) and SMS verification.
                        </p>
                        <span className="inline-flex items-center gap-1 mt-2 text-xs text-amber-400">
                          <AlertCircle className="w-3 h-3" />
                          Not enabled — we strongly recommend enabling 2FA.
                        </span>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-700/50 text-emerald-400 text-xs font-medium hover:bg-emerald-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                      Enable 2FA
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Active sessions */}
                <Section
                  title="Active Sessions"
                  description="Devices currently logged into your account."
                  icon={Globe}
                >
                  <div className="space-y-3">
                    {[
                      {
                        device: "MacBook Pro 16″",
                        location: "New York, US",
                        browser: "Chrome 120",
                        time: "Active now",
                        current: true,
                      },
                      {
                        device: "iPhone 15 Pro",
                        location: "New York, US",
                        browser: "Safari Mobile",
                        time: "2 hours ago",
                        current: false,
                      },
                      {
                        device: "Windows PC",
                        location: "Chicago, US",
                        browser: "Firefox 121",
                        time: "3 days ago",
                        current: false,
                      },
                    ].map((session) => (
                      <div
                        key={session.device}
                        className="flex items-center justify-between gap-3 p-3.5 bg-slate-800/30 border border-slate-700/40 rounded-xl"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`w-2 h-2 rounded-full flex-shrink-0 ${
                              session.current ? "bg-emerald-400 animate-pulse" : "bg-slate-600"
                            }`}
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-slate-200 truncate">
                              {session.device}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {session.browser} · {session.location} · {session.time}
                            </p>
                          </div>
                        </div>
                        {!session.current && (
                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0 text-xs text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg border border-red-900/40 hover:bg-red-900/20 transition-colors duration-200"
                          >
                            Revoke
                          </motion.button>
                        )}
                        {session.current && (
                          <span className="flex-shrink-0 text-xs text-emerald-400 font-medium">
                            This device
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </Section>
              </>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}

// local variant used only in this file
const slideInLeftVariant = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};