"use client";

import React, { useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, X, Save, Newspaper } from "lucide-react";
import type { NewsPost } from "@/types";

const emptyPost: Partial<NewsPost> = {
  title: "", titleId: "", excerpt: "", excerptId: "",
  content: "", contentId: "", image: "", author: "Admin", category: "General",
  publishedAt: new Date().toISOString().slice(0, 10),
};

export default function AdminNewsPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<NewsPost> | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/admin/news").then((r) => r.json()).then(setPosts).finally(() => setLoading(false));
  }, [isLoggedIn]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  const openEdit = (p: NewsPost) => { setEditing({ ...p }); setIsNew(false); };
  const openNew = () => { setEditing({ ...emptyPost }); setIsNew(true); };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/admin/news", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      const updated = await fetch("/api/admin/news").then((r) => r.json());
      setPosts(updated);
      setEditing(null);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/admin/news?slug=${slug}`, { method: "DELETE" });
    if (res.ok) setPosts(posts.filter((p) => p.slug !== slug));
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-cta" />
              News Posts
            </h1>
            <p className="text-text-secondary mt-1">{posts.length} articles published</p>
          </div>
          <button onClick={openNew} className="btn-primary gap-2">
            <Plus className="w-4 h-4" /> New Post
          </button>
        </div>

        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-surface-border">
              <tr>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Title</th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Published</th>
                <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="text-center py-12 text-text-muted">Loading...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-12 text-text-muted">No posts yet.</td></tr>
              ) : (
                posts.map((p) => (
                  <tr key={p.slug} className="border-b border-surface-border hover:bg-surface-muted/50 transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">{p.title}</div>
                      <div className="text-xs text-text-muted mt-0.5 truncate max-w-[300px]">{p.excerpt}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 bg-cta-light text-cta text-xs font-semibold rounded-full">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{new Date(p.publishedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(p)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer text-text-muted hover:text-cta"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.slug)} className="p-2 hover:bg-red-50 rounded-lg cursor-pointer text-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl mb-12">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-xl text-primary">{isNew ? "New Post" : "Edit Post"}</h2>
                <button onClick={() => setEditing(null)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer"><X className="w-5 h-5" /></button>
              </div>
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
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
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Category</label>
                    <input className="input-field" value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Author</label>
                    <input className="input-field" value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">Publish Date</label>
                    <input type="date" className="input-field cursor-pointer" value={(editing.publishedAt || "").slice(0, 10)} onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Excerpt (EN)</label>
                  <textarea className="input-field resize-none" rows={2} value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Excerpt (ID)</label>
                  <textarea className="input-field resize-none" rows={2} value={editing.excerptId || ""} onChange={(e) => setEditing({ ...editing, excerptId: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Content (EN)</label>
                  <textarea className="input-field resize-none" rows={8} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="Full article content. Use double newlines for paragraphs." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">Content (ID)</label>
                  <textarea className="input-field resize-none" rows={8} value={editing.contentId || ""} onChange={(e) => setEditing({ ...editing, contentId: e.target.value })} />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-border">
                <button onClick={() => setEditing(null)} className="btn-ghost">Cancel</button>
                <button onClick={handleSave} className="btn-primary gap-2"><Save className="w-4 h-4" />{isNew ? "Publish" : "Save Changes"}</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
