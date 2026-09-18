"use client";

import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, X, Save, Building2 } from "lucide-react";
import type { Branch } from "@/types";

const emptyBranch: Partial<Branch> = {
  city: "", address: "", phone: "", email: "", mapUrl: "", isHeadOffice: false,
};

export default function AdminBranchesPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Branch> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/admin/branches").then((r) => r.json()).then(setBranches).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  const openEdit = (b: Branch) => { setEditing({ ...b }); setIsNew(false); };
  const openNew = () => { setEditing({ ...emptyBranch }); setIsNew(true); };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/admin/branches", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      const updated = await fetch("/api/admin/branches").then((r) => r.json());
      setBranches(updated);
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this branch?")) return;
    const res = await fetch(`/api/admin/branches?id=${id}`, { method: "DELETE" });
    if (res.ok) setBranches(branches.filter((b) => b.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
              <Building2 className="w-8 h-8 text-cta" />
              Branches
            </h1>
            <p className="text-text-secondary mt-1">{branches.length} branch offices</p>
          </div>
          <button onClick={openNew} className="btn-primary gap-2">
            <Plus className="w-4 h-4" /> Add Branch
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12 text-text-muted">Loading...</div>
          ) : branches.length === 0 ? (
            <div className="col-span-full text-center py-12 text-text-muted">No branches yet.</div>
          ) : (
            branches.map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-surface-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-semibold text-primary">{b.city}</h3>
                    {b.isHeadOffice && (
                      <span className="px-2 py-0.5 bg-cta-light text-cta text-xs font-semibold rounded-full">HQ</span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(b)} className="p-1.5 hover:bg-surface-muted rounded-lg cursor-pointer text-text-muted hover:text-cta"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 hover:bg-red-50 rounded-lg cursor-pointer text-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-1">{b.address}</p>
                <p className="text-sm text-text-muted">{b.phone}</p>
                <p className="text-sm text-text-muted">{b.email}</p>
              </div>
            ))
          )}
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl mb-12">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-xl text-primary">{isNew ? "Add Branch" : "Edit Branch"}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">City</label>
                  <input className="input-field" value={editing.city || ""} onChange={(e) => setEditing({ ...editing, city: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Address</label>
                  <textarea className="input-field resize-none" rows={2} value={editing.address || ""} onChange={(e) => setEditing({ ...editing, address: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Phone</label>
                    <input className="input-field" value={editing.phone || ""} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Email</label>
                    <input className="input-field" value={editing.email || ""} onChange={(e) => setEditing({ ...editing, email: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Map URL</label>
                  <input className="input-field" value={editing.mapUrl || ""} onChange={(e) => setEditing({ ...editing, mapUrl: e.target.value })} placeholder="Google Maps embed URL" />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={editing.isHeadOffice || false} onChange={(e) => setEditing({ ...editing, isHeadOffice: e.target.checked })} className="w-4 h-4 rounded border-surface-border text-cta focus:ring-cta cursor-pointer" />
                  <span className="text-sm font-medium text-text">Head Office</span>
                </label>
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
