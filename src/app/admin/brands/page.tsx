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
  Globe,
  Award,
  ExternalLink,
} from "lucide-react";
import type { Brand } from "@/types";

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export default function AdminBrandsPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    logo: "",
    website: "",
    country: "",
    description: "",
    featured: true,
  });

  const fetchBrands = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    const res = await fetch("/api/admin/brands");
    const data = await res.json();
    setBrands(data);
    setLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  const openCreate = () => {
    setEditingBrand(null);
    setForm({ name: "", slug: "", logo: "", website: "", country: "", description: "", featured: true });
    setShowModal(true);
  };

  const openEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setForm({
      name: brand.name,
      slug: brand.slug,
      logo: brand.logo,
      website: brand.website,
      country: brand.country,
      description: brand.description,
      featured: brand.featured,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      slug: form.slug || slugify(form.name),
      ...(editingBrand ? { id: editingBrand.id } : {}),
    };
    const method = editingBrand ? "PUT" : "POST";
    await fetch("/api/admin/brands", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setShowModal(false);
    fetchBrands();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this brand?")) return;
    await fetch(`/api/admin/brands?id=${id}`, { method: "DELETE" });
    fetchBrands();
  };

  const toggleFeatured = async (brand: Brand) => {
    await fetch("/api/admin/brands", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: brand.id, featured: !brand.featured }),
    });
    fetchBrands();
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Brand Partners
            </h1>
            <p className="text-text-secondary mt-1">
              Manage brand partners and manufacturers. {brands.length} brands total.
            </p>
          </div>
          <button onClick={openCreate} className="btn-primary text-sm gap-2">
            <Plus className="w-4 h-4" />
            Add Brand
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-surface-border bg-surface">
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
                    Country
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
                    Website
                  </th>
                  <th className="text-center px-6 py-4 text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-heading font-semibold text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                      Loading...
                    </td>
                  </tr>
                ) : brands.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                      No brands yet. Click &quot;Add Brand&quot; to get started.
                    </td>
                  </tr>
                ) : (
                  brands.map((brand) => (
                    <tr key={brand.id} className="border-b border-surface-border last:border-b-0 hover:bg-surface/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-primary font-heading font-bold text-sm">
                              {brand.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-secondary text-sm">{brand.name}</p>
                            <p className="text-xs text-text-muted">/{brand.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {brand.country}
                      </td>
                      <td className="px-6 py-4">
                        {brand.website ? (
                          <a
                            href={brand.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary-dark"
                          >
                            <Globe className="w-3.5 h-3.5" />
                            Visit
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-text-muted text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggleFeatured(brand)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 ${
                            brand.featured
                              ? "bg-green-100 text-green-700"
                              : "bg-secondary-100 text-secondary-500"
                          }`}
                        >
                          <Award className="w-3 h-3" />
                          {brand.featured ? "Featured" : "Hidden"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(brand)}
                            className="p-2 rounded-lg text-text-muted hover:text-primary hover:bg-primary-50 transition-colors duration-200 cursor-pointer"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(brand.id)}
                            className="p-2 rounded-lg text-text-muted hover:text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                            title="Delete"
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
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-lg text-secondary">
                  {editingBrand ? "Edit Brand" : "Add Brand"}
                </h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
                    className="input-field"
                    placeholder="e.g. Shimadzu"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="input-field"
                    placeholder="Auto-generated from name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Country *</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                    className="input-field"
                    placeholder="e.g. Japan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Website</label>
                  <input
                    type="url"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="input-field"
                    placeholder="https://www.example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Logo URL</label>
                  <input
                    type="text"
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    className="input-field"
                    placeholder="/images/brands/shimadzu.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                    className="input-field"
                    placeholder="Brief description of the brand..."
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                      form.featured ? "bg-primary" : "bg-secondary-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                        form.featured ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-sm text-text-secondary">Featured on homepage</span>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 p-6 border-t border-surface-border">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!form.name || !form.country}
                  className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingBrand ? "Save Changes" : "Create Brand"}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
