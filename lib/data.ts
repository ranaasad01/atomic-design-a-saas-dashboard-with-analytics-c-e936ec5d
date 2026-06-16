export const APP_NAME = "Pulse Analytics";
export const APP_TAGLINE = "Clarity at the speed of your business.";
export const APP_DESCRIPTION =
  "Real-time KPIs, revenue trends, and user analytics — all in one beautiful dashboard.";

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

export const sidebarLinks: NavLink[] = [
  { label: "Overview", href: "/dashboard" },
  { label: "Analytics", href: "/analytics" },
  { label: "Users", href: "/users" },
  { label: "Revenue", href: "/revenue" },
  { label: "Settings", href: "/settings" },
];

export interface KpiCard {
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  prefix?: string;
  suffix?: string;
}

export interface Transaction {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  date: string;
  plan: string;
}

export const BRAND = {
  primary: "#6366f1",
  secondary: "#8b5cf6",
  dark: "#1e1b4b",
  light: "#f8fafc",
  border: "#e2e8f0",
  chartColors: [
    "#6366f1",
    "#8b5cf6",
    "#06b6d4",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ],
} as const;