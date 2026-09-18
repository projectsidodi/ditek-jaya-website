import fs from "fs";
import path from "path";
import type { Product, Service, NewsPost, Branch, ContactMessage, Brand, BrandSubCategory } from "@/types";

const dataDir = path.join(process.cwd(), "data");

function readJSON<T>(file: string): T {
  const filePath = path.join(dataDir, file);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

function writeJSON<T>(file: string, data: T) {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// ── Brands ──
export function getBrands(): Brand[] {
  return readJSON<Brand[]>("brands.json");
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return getBrands().find((b) => b.slug === slug);
}

export function saveBrands(brands: Brand[]) {
  writeJSON("brands.json", brands);
}

// ── Sub-Categories ──
export function getSubCategories(): BrandSubCategory[] {
  return readJSON<BrandSubCategory[]>("subcategories.json");
}

export function getSubCategoriesByBrand(brandId: string): BrandSubCategory[] {
  return getSubCategories()
    .filter((sc) => sc.brandId === brandId)
    .sort((a, b) => a.order - b.order);
}

export function getSubCategoryById(id: string): BrandSubCategory | undefined {
  return getSubCategories().find((sc) => sc.id === id);
}

export function saveSubCategories(subs: BrandSubCategory[]) {
  writeJSON("subcategories.json", subs);
}

export function createSubCategory(data: Omit<BrandSubCategory, "id" | "createdAt" | "updatedAt">): BrandSubCategory {
  const subs = getSubCategories();
  const newSub: BrandSubCategory = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  subs.push(newSub);
  saveSubCategories(subs);
  return newSub;
}

export function updateSubCategory(id: string, data: Partial<BrandSubCategory>): BrandSubCategory | null {
  const subs = getSubCategories();
  const idx = subs.findIndex((sc) => sc.id === id);
  if (idx === -1) return null;
  subs[idx] = { ...subs[idx], ...data, updatedAt: new Date().toISOString() };
  saveSubCategories(subs);
  return subs[idx];
}

export function deleteSubCategory(id: string): void {
  let subs = getSubCategories();
  subs = subs.filter((sc) => sc.id !== id);
  saveSubCategories(subs);
}

// ── Products ──
export function getProducts(): Product[] {
  return readJSON<Product[]>("products.json");
}

export function getProductsByBrand(brandId: string): Product[] {
  return getProducts().filter((p) => p.brandId === brandId);
}

export function getProductsBySubCategory(subCategoryId: string): Product[] {
  return getProducts().filter((p) => p.subCategoryId === subCategoryId);
}

export function saveProducts(products: Product[]) {
  writeJSON("products.json", products);
}

// ── Services ──
export function getServices(): Service[] {
  return readJSON<Service[]>("services.json");
}

export function saveServices(services: Service[]) {
  writeJSON("services.json", services);
}

// ── News ──
export function getNews(): NewsPost[] {
  return readJSON<NewsPost[]>("news.json");
}

export function saveNews(news: NewsPost[]) {
  writeJSON("news.json", news);
}

// ── Branches ──
export function getBranches(): Branch[] {
  return readJSON<Branch[]>("branches.json");
}

export function saveBranches(branches: Branch[]) {
  writeJSON("branches.json", branches);
}

// ── Contact Messages ──
export function getMessages(): ContactMessage[] {
  return readJSON<ContactMessage[]>("messages.json");
}

export function saveMessages(messages: ContactMessage[]) {
  writeJSON("messages.json", messages);
}

// ── Aliases for backward compatibility ──
export function getNewsPosts(): NewsPost[] {
  return getNews();
}

export function saveNewsPosts(news: NewsPost[]) {
  saveNews(news);
}

export function getNewsPost(slug: string): NewsPost | undefined {
  return getNews().find((n) => n.slug === slug);
}

export function getProduct(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id);
}
