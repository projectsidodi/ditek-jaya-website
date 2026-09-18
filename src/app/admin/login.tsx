"use client";

import React, { useState } from "react";
import { Beaker, LogIn, AlertCircle } from "lucide-react";

interface Props {
  onLogin: (token: string) => void;
}

export function AdminLogin({ onLogin }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        onLogin(data.token);
      } else {
        setError(data.error || "Login failed");
      }
    } catch {
      setError("Connection error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cta rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Beaker className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white">Admin Panel</h1>
          <p className="text-secondary-400 text-sm mt-1">PT. Ditek Jaya CMS</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-text-muted text-xs mt-6">
            Default: admin / ditekjaya2024
          </p>
        </div>
      </div>
    </div>
  );
}
