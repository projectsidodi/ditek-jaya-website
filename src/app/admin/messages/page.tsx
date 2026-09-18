"use client";

import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { MessageSquare, Mail, Phone, Building2, Calendar, Eye } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
}

export default function AdminMessagesPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ContactSubmission | null>(null);

  useEffect(() => {
    if (!isLoggedIn) return;
    // We read from the JSON file via a simple API
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data.reverse());
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-cta" />
            Contact Messages
          </h1>
          <p className="text-text-secondary mt-1">{messages.length} submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-text-muted">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="bg-white rounded-xl border border-surface-border p-12 text-center">
            <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <p className="text-text-muted text-lg">No contact submissions yet.</p>
            <p className="text-text-muted text-sm mt-1">Messages from the contact form will appear here.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelected(msg)}
                  className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 cursor-pointer ${
                    selected?.id === msg.id
                      ? "bg-cta-light border-cta/30"
                      : "bg-white border-surface-border hover:border-cta/20"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-primary text-sm">{msg.name}</span>
                    <span className="text-xs text-text-muted">
                      {new Date(msg.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted truncate">{msg.subject}</p>
                  <p className="text-xs text-text-muted truncate mt-0.5">{msg.message}</p>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white rounded-xl border border-surface-border p-8">
                  <h2 className="font-heading font-bold text-xl text-primary mb-4">{selected.subject}</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Mail className="w-4 h-4 text-cta" /> {selected.email}
                    </div>
                    {selected.phone && (
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Phone className="w-4 h-4 text-cta" /> {selected.phone}
                      </div>
                    )}
                    {selected.company && (
                      <div className="flex items-center gap-2 text-sm text-text-secondary">
                        <Building2 className="w-4 h-4 text-cta" /> {selected.company}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Calendar className="w-4 h-4 text-cta" />
                      {new Date(selected.submittedAt).toLocaleString()}
                    </div>
                  </div>
                  <div className="border-t border-surface-border pt-6">
                    <h3 className="font-medium text-text text-sm mb-2">From: {selected.name}</h3>
                    <p className="text-text-secondary whitespace-pre-wrap leading-relaxed">{selected.message}</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-surface-border p-12 text-center">
                  <Eye className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-muted">Select a message to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
