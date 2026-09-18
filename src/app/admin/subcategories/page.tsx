"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Tags,
} from "lucide-react";
import type { BrandSubCategory, Brand } from "@/types";

const emptySubCategory: Partial<BrandSubCategory> = {
  brandId: "",
  brandName: "",
  name: "",
  nameId: "",
  description: "",
  descriptionId: "",
  icon: "Box",
  order: 1,
};

export default function AdminSubCategoriesPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [subs, setSubs] = useState<BrandSubCategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BrandSubCategory> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [filterBrand, setFilterBrand] = useState("");
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    const [subsRes, brandsRes] = await Promise.all([
      fetch("/api/admin/subcategories").then((r) => r.json()),
      fetch("/api/admin/brands").then((r) => r.json()),
    ]);
    setSubs(subsRes);
    setBrands(brandsRes);
    setLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  const filtered = subs.filter((s) => {
    const matchBrand = !filterBrand || s.brandId === filterBrand;
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.nameId.toLowerCase().includes(search.toLowerCase());
    return matchBrand && matchSearch;
  });

  const openNew = () => {
    setEditing({ ...emptySubCategory });
    setIsNew(true);
  };

  const openEdit = (sub: BrandSubCategory) => {
    setEditing({ ...sub });
    setIsNew(false);
  };

  const handleBrandChange = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    setEditing({
      ...editing,
      brandId,
      brandName: brand?.name || "",
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/admin/subcategories", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      fetchData();
      setEditing(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this sub-category?")) return;
    const res = await fetch(`/api/admin/subcategories?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) setSubs(subs.filter((s) => s.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary flex items-center gap-3">
              <Tags className="w-8 h-8 text-primary" />
              Sub-Categories
            </h1>
            <p className="text-text-secondary mt-1">
              {subs.length} sub-categories across {brands.length} brands
            </p>
          </div>
          <button onClick={openNew} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Add Sub-Category
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <select
            className="input-field max-w-[240px]"
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
          <input
            className="input-field max-w-[300px]"
            placeholder="Search sub-categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-surface-border">
              <tr>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Sub-Category Name
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Indonesian Name
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Brand
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Icon
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Order
                </th>
                <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-muted">
                    Loading...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text-muted">
                    No sub-categories found.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-surface-border hover:bg-surface-muted/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-secondary">{sub.name}</div>
                      <div className="text-xs text-text-muted mt-0.5 truncate max-w-[250px]">
                        {sub.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text">{sub.nameId}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 bg-secondary-50 text-secondary text-xs font-semibold rounded-full">
                        {sub.brandName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="px-2 py-0.5 bg-surface-muted text-xs text-text-muted rounded font-mono">
                        {sub.icon}
                      </code>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{sub.order}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(sub)}
                          className="p-2 hover:bg-surface-muted rounded-lg transition-colors duration-150 cursor-pointer text-text-muted hover:text-primary"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors duration-150 cursor-pointer text-text-muted hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {editing && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-12 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-12">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-xl text-secondary">
                  {isNew ? "Add Sub-Category" : "Edit Sub-Category"}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Brand selector */}
                <div className="p-4 bg-primary-50 rounded-xl border border-primary/10">
                  <label className="block text-sm font-medium text-secondary mb-1.5">
                    Brand *
                  </label>
                  <select
                    className="input-field bg-white"
                    value={editing.brandId || ""}
                    onChange={(e) => handleBrandChange(e.target.value)}
                  >
                    <option value="">Select a brand...</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Name (EN) *
                    </label>
                    <input
                      className="input-field"
                      value={editing.name || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                      placeholder="e.g. Analytical Chemistry"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Name (ID)
                    </label>
                    <input
                      className="input-field"
                      value={editing.nameId || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, nameId: e.target.value })
                      }
                      placeholder="e.g. Kimia Analitik"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Description (EN)
                  </label>
                  <textarea
                    className="input-field resize-none"
                    rows={2}
                    value={editing.description || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Description (ID)
                  </label>
                  <textarea
                    className="input-field resize-none"
                    rows={2}
                    value={editing.descriptionId || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, descriptionId: e.target.value })
                    }
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Icon (Lucide name)
                    </label>
                    <input
                      className="input-field"
                      value={editing.icon || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, icon: e.target.value })
                      }
                      placeholder="e.g. FlaskConical"
                    />
                    <p className="text-xs text-text-muted mt-1">
                      Icon: <span className="font-mono">{editing.icon || "Box"}</span>
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Display Order
                    </label>
                    <input
                      className="input-field"
                      type="number"
                      min={1}
                      value={editing.order || 1}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          order: parseInt(e.target.value) || 1,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-border">
                <button onClick={() => setEditing(null)} className="btn-ghost">
                  Cancel
                </button>
                <button onClick={handleSave} className="btn-primary gap-2">
                  <Save className="w-4 h-4" />
                  {isNew ? "Create" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
