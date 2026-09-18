"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Wrench,
  Newspaper,
  MapPin,
  MessageSquare,
  ArrowLeft,
  Globe,
  Tags,
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/brands", icon: Globe, label: "Brands" },
  { href: "/admin/subcategories", icon: Tags, label: "Sub-Categories" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/services", icon: Wrench, label: "Services" },
  { href: "/admin/news", icon: Newspaper, label: "News" },
  { href: "/admin/branches", icon: MapPin, label: "Branches" },
  { href: "/admin/messages", icon: MessageSquare, label: "Messages" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-secondary text-white flex flex-col z-40">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-heading font-bold">PT. Ditek Jaya</h1>
        <p className="text-sm text-white/60 mt-1">Admin Panel</p>
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors duration-150 ${
                isActive
                  ? "bg-primary text-white font-semibold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Site
        </Link>
      </div>
    </aside>
  );
}
