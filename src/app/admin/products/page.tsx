"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { AdminLogin } from "../login";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Plus, Pencil, Trash2, X, Save, Package } from "lucide-react";
import type { Product, Brand, BrandSubCategory } from "@/types";

const emptyProduct: Partial<Product> = {
  name: "",
  nameId: "",
  category: "",
  brandId: "",
  brandName: "",
  subCategoryId: "",
  subCategoryName: "",
  description: "",
  descriptionId: "",
  image: "",
  features: [],
  featuresId: [],
  specifications: {},
};

export default function AdminProductsPage() {
  const { isLoggedIn, login } = useAdminAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [allSubCategories, setAllSubCategories] = useState<BrandSubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [newFeature, setNewFeature] = useState("");
  const [newFeatureId, setNewFeatureId] = useState("");
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecVal, setNewSpecVal] = useState("");

  const fetchData = useCallback(async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    const [prodsRes, brandsRes, subsRes] = await Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/brands").then((r) => r.json()),
      fetch("/api/admin/subcategories").then((r) => r.json()),
    ]);
    setProducts(prodsRes);
    setBrands(brandsRes);
    setAllSubCategories(subsRes);
    setLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isLoggedIn) return <AdminLogin onLogin={login} />;

  // Sub-categories for the currently selected brand
  const brandSubCategories = editing?.brandId
    ? allSubCategories.filter((sc) => sc.brandId === editing.brandId).sort((a, b) => a.order - b.order)
    : [];

  const openNew = () => {
    setEditing({ ...emptyProduct });
    setIsNew(true);
  };

  const openEdit = (p: Product) => {
    setEditing({ ...p });
    setIsNew(false);
  };

  const handleBrandChange = (brandId: string) => {
    const brand = brands.find((b) => b.id === brandId);
    setEditing({
      ...editing,
      brandId,
      brandName: brand?.name || "",
      subCategoryId: "",
      subCategoryName: "",
    });
  };

  const handleSubCategoryChange = (subCatId: string) => {
    const sub = allSubCategories.find((sc) => sc.id === subCatId);
    setEditing({
      ...editing,
      subCategoryId: subCatId,
      subCategoryName: sub?.name || "",
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = isNew ? "POST" : "PUT";
    const res = await fetch("/api/admin/products", {
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
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    if (res.ok) setProducts(products.filter((p) => p.id !== id));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;
    setEditing({
      ...editing,
      features: [...(editing?.features || []), newFeature.trim()],
    });
    setNewFeature("");
  };

  const removeFeature = (idx: number) => {
    setEditing({
      ...editing,
      features: editing?.features?.filter((_, i) => i !== idx),
    });
  };

  const addFeatureId = () => {
    if (!newFeatureId.trim()) return;
    setEditing({
      ...editing,
      featuresId: [...(editing?.featuresId || []), newFeatureId.trim()],
    });
    setNewFeatureId("");
  };

  const removeFeatureId = (idx: number) => {
    setEditing({
      ...editing,
      featuresId: editing?.featuresId?.filter((_, i) => i !== idx),
    });
  };

  const addSpec = () => {
    if (!newSpecKey.trim() || !newSpecVal.trim()) return;
    setEditing({
      ...editing,
      specifications: {
        ...(editing?.specifications || {}),
        [newSpecKey.trim()]: newSpecVal.trim(),
      },
    });
    setNewSpecKey("");
    setNewSpecVal("");
  };

  const removeSpec = (key: string) => {
    const specs = { ...(editing?.specifications || {}) };
    delete specs[key];
    setEditing({ ...editing, specifications: specs });
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary flex items-center gap-3">
              <Package className="w-8 h-8 text-primary" />
              Products
            </h1>
            <p className="text-text-secondary mt-1">{products.length} products</p>
          </div>
          <button onClick={openNew} className="btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-surface-border overflow-hidden">
          <table className="w-full">
            <thead className="bg-surface-muted border-b border-surface-border">
              <tr>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Brand
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Sub-Category
                </th>
                <th className="text-left text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-right text-xs font-semibold text-text-muted uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-muted">
                    Loading...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-text-muted">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-surface-border hover:bg-surface-muted/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-secondary">{p.name}</div>
                      <div className="text-xs text-text-muted mt-0.5">{p.id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-0.5 bg-secondary-50 text-secondary text-xs font-semibold rounded-full">
                        {p.brandName}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.subCategoryName ? (
                        <span className="px-2.5 py-0.5 bg-primary-50 text-primary text-xs font-semibold rounded-full">
                          {p.subCategoryName}
                        </span>
                      ) : (
                        <span className="text-text-muted text-xs">--</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">{p.category}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-2 hover:bg-surface-muted rounded-lg transition-colors duration-150 cursor-pointer text-text-muted hover:text-primary"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
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
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-8 px-4 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl mb-12">
              <div className="flex items-center justify-between p-6 border-b border-surface-border">
                <h2 className="font-heading font-bold text-xl text-secondary">
                  {isNew ? "Add Product" : "Edit Product"}
                </h2>
                <button
                  onClick={() => setEditing(null)}
                  className="p-2 hover:bg-surface-muted rounded-lg cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Brand and Sub-category */}
                <div className="p-4 bg-primary-50 rounded-xl border border-primary/10 space-y-4">
                  <div>
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
                  <div>
                    <label className="block text-sm font-medium text-secondary mb-1.5">
                      Sub-Category
                    </label>
                    <select
                      className="input-field bg-white"
                      value={editing.subCategoryId || ""}
                      onChange={(e) => handleSubCategoryChange(e.target.value)}
                      disabled={!editing.brandId}
                    >
                      <option value="">
                        {!editing.brandId
                          ? "Select a brand first..."
                          : brandSubCategories.length === 0
                          ? "No sub-categories for this brand"
                          : "Select a sub-category..."}
                      </option>
                      {brandSubCategories.map((sc) => (
                        <option key={sc.id} value={sc.id}>
                          {sc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Product Name (EN) *
                    </label>
                    <input
                      className="input-field"
                      value={editing.name || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Product Name (ID)
                    </label>
                    <input
                      className="input-field"
                      value={editing.nameId || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, nameId: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Category
                    </label>
                    <input
                      className="input-field"
                      value={editing.category || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, category: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-1.5">
                      Image URL
                    </label>
                    <input
                      className="input-field"
                      value={editing.image || ""}
                      onChange={(e) =>
                        setEditing({ ...editing, image: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Description (EN) *
                  </label>
                  <textarea
                    className="input-field resize-none"
                    rows={3}
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
                    rows={3}
                    value={editing.descriptionId || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, descriptionId: e.target.value })
                    }
                  />
                </div>

                {/* Features EN */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Features (EN)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editing.features?.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 bg-surface-muted text-sm px-3 py-1 rounded-full"
                      >
                        {f}
                        <button
                          onClick={() => removeFeature(i)}
                          className="text-text-muted hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="input-field flex-1"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add feature"
                      onKeyDown={(e) => e.key === "Enter" && addFeature()}
                    />
                    <button onClick={addFeature} className="btn-ghost text-sm">
                      Add
                    </button>
                  </div>
                </div>

                {/* Features ID */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Features (ID)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {editing.featuresId?.map((f, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 bg-surface-muted text-sm px-3 py-1 rounded-full"
                      >
                        {f}
                        <button
                          onClick={() => removeFeatureId(i)}
                          className="text-text-muted hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="input-field flex-1"
                      value={newFeatureId}
                      onChange={(e) => setNewFeatureId(e.target.value)}
                      placeholder="Add feature (ID)"
                      onKeyDown={(e) => e.key === "Enter" && addFeatureId()}
                    />
                    <button onClick={addFeatureId} className="btn-ghost text-sm">
                      Add
                    </button>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Specifications
                  </label>
                  <div className="space-y-1 mb-2">
                    {Object.entries(editing.specifications || {}).map(([k, v]) => (
                      <div key={k} className="flex items-center gap-2 text-sm bg-surface-muted px-3 py-1.5 rounded-lg">
                        <span className="font-medium text-secondary">{k}:</span>
                        <span className="text-text">{v}</span>
                        <button
                          onClick={() => removeSpec(k)}
                          className="ml-auto text-text-muted hover:text-red-500 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="input-field flex-1"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      placeholder="Key"
                    />
                    <input
                      className="input-field flex-1"
                      value={newSpecVal}
                      onChange={(e) => setNewSpecVal(e.target.value)}
                      placeholder="Value"
                      onKeyDown={(e) => e.key === "Enter" && addSpec()}
                    />
                    <button onClick={addSpec} className="btn-ghost text-sm">
                      Add
                    </button>
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
