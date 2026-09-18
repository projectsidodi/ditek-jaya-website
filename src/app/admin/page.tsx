"use client";

import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "./login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Package,
  Wrench,
  Newspaper,
  Building2,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  Award,
} from "lucide-react";
import Link from "next/link";

interface Counts {
  brands: number;
  products: number;
  services: number;
  news: number;
  branches: number;
  messages: number;
}

export default function AdminDashboard() {
  const { isLoggedIn, login } = useAdminAuth();
  const [counts, setCounts] = useState<Counts>({
    brands: 0,
    products: 0,
    services: 0,
    news: 0,
    branches: 0,
    messages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) return;
    async function fetchCounts() {
      try {
        const [brands, products, services, news, branches] = await Promise.all([
          fetch("/api/admin/brands").then((r) => r.json()),
          fetch("/api/admin/products").then((r) => r.json()),
          fetch("/api/admin/services").then((r) => r.json()),
          fetch("/api/admin/news").then((r) => r.json()),
          fetch("/api/admin/branches").then((r) => r.json()),
        ]);
        setCounts({
          brands: brands.length,
          products: products.length,
          services: services.length,
          news: news.length,
          branches: branches.length,
          messages: 0,
        });
      } catch (e) {
        console.error("Failed to fetch counts", e);
      }
      setLoading(false);
    }
    fetchCounts();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={login} />;
  }

  const stats = [
    { label: "Brands", count: counts.brands, icon: Award, href: "/admin/brands", color: "bg-primary" },
    { label: "Products", count: counts.products, icon: Package, href: "/admin/products", color: "bg-blue-500" },
    { label: "Services", count: counts.services, icon: Wrench, href: "/admin/services", color: "bg-green-500" },
    { label: "News Posts", count: counts.news, icon: Newspaper, href: "/admin/news", color: "bg-purple-500" },
    { label: "Branches", count: counts.branches, icon: Building2, href: "/admin/branches", color: "bg-orange-500" },
  ];

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-secondary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome to the PT. Ditek Jaya content management system.</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white rounded-xl border border-surface-border p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-primary transition-colors duration-200" />
                </div>
                <p className="text-3xl font-heading font-bold text-secondary">
                  {loading ? "..." : stat.count}
                </p>
                <p className="text-text-secondary text-sm mt-1">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-surface-border p-8">
          <h2 className="font-heading font-bold text-xl text-secondary mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Link href="/admin/brands" className="btn-primary text-sm justify-center gap-2">
              <Award className="w-4 h-4" />
              Manage Brands
            </Link>
            <Link href="/admin/products" className="btn-primary text-sm justify-center gap-2">
              <Package className="w-4 h-4" />
              Manage Products
            </Link>
            <Link href="/admin/news" className="btn-primary text-sm justify-center gap-2">
              <Newspaper className="w-4 h-4" />
              Manage News
            </Link>
            <Link href="/admin/services" className="btn-secondary text-sm justify-center gap-2">
              <Wrench className="w-4 h-4" />
              Manage Services
            </Link>
            <Link href="/admin/messages" className="btn-secondary text-sm justify-center gap-2">
              <MessageSquare className="w-4 h-4" />
              View Messages
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
