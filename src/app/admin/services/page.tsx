"use client";

import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, X, Save, Wrench } from "lucide-react";
import type { Service } from "@/types";

const emptyService: Partial<Service> = {
  title: "", titleId: "", description: "", descriptionId: "",
  icon: "Wrench", features: [], featuresId: [],
};

export default function AdminServicesPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featuresText, setFeaturesText] = useState("");
  const [featuresIdText, setFeaturesIdText] = useState("");

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/admin/services").then((r) => r.json()).then(setServices).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  const openEdit = (s: Service) => {
    setEditing({ ...s });
    setIsNew(false);
    setFeaturesText(s.features.join("\n"));
    setFeaturesIdText(s.featuresId.join("\n"));
  };
  const openNew = () => {
    setEditing({ ...emptyService });
    setIsNew(true);
    setFeaturesText("");
    setFeaturesIdText("");
  };

  const handleSave = async () => {
    if (!editing) return;
    const payload = {
      ...editing,
      features: featuresText.split("\n").filter(Boolean),
      featuresId: featuresIdText.split("\n").filter(Boolean),
    };
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/admin/services", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const updated = await fetch("/api/admin/services").then((r) => r.json());
      setServices(updated);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    const res = await fetch(`/api/admin/services?id=${id}`, { method: "DELETE" });
    if (res.ok) setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
              <Wrench className="w-8 h-8 text-cta" />
              Services
            </h1>
            <p className="text-text-secondary mt-1">{services.length} services configured</p>
          </div>
          <button onClick={openNew} className="btn-primary gap-2">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>

        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-surface-border">
              <tr>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Title</th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Icon</th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Features</th>
                <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12 text-text-muted">Loading...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-text-muted">No services yet.</td></tr>
              ) : (
                services.map((s) => (
                  <tr key={s.id} className="border-b border-surface-border hover:bg-surface-muted/50 transition-colors duration-150">
                    <td className="px-6 py-4 font-medium text-primary">{s.title}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{s.icon}</td>
                    <td className="px-6 py-4 text-sm text-text-muted">{s.features.length} features</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(s)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer text-text-muted hover:text-cta"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(s.id)} className="p-2 hover:bg-red-50 rounded-lg cursor-pointer text-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-12">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-xl text-primary">{isNew ? "Add Service" : "Edit Service"}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Title (EN)</label>
                    <input className="input-field" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Title (ID)</label>
                    <input className="input-field" value={editing.titleId || ""} onChange={(e) => setEditing({ ...editing, titleId: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Icon (Lucide name)</label>
                  <input className="input-field" value={editing.icon || ""} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} placeholder="e.g. Wrench, Settings, Shield" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Description (EN)</label>
                  <textarea className="input-field resize-none" rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Description (ID)</label>
                  <textarea className="input-field resize-none" rows={3} value={editing.descriptionId || ""} onChange={(e) => setEditing({ ...editing, descriptionId: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Features EN (one per line)</label>
                  <textarea className="input-field resize-none" rows={3} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Features ID (one per line)</label>
                  <textarea className="input-field resize-none" rows={3} value={featuresIdText} onChange={(e) => setFeaturesIdText(e.target.value)} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-border">
                <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
                <button onClick={handleSave} className="btn-primary gap-2"><Save className="w-4 h-4" />{isNew ? "Create" : "Save Changes"}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
