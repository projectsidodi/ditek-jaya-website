export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  country: string;
  description: string;
  featured: boolean;
  createdAt: string;
}

export interface BrandSubCategory {
  id: string;
  brandId: string;
  brandName: string;
  name: string;
  nameId: string;
  description: string;
  descriptionId: string;
  icon: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  nameId: string;
  category: string;
  brandId: string;
  brandName: string;
  subCategoryId: string;
  subCategoryName: string;
  description: string;
  descriptionId: string;
  image: string;
  features: string[];
  featuresId: string[];
  specifications: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  title: string;
  titleId: string;
  description: string;
  descriptionId: string;
  icon: string;
  features: string[];
  featuresId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsPost {
  title: string;
  titleId: string;
  slug: string;
  excerpt: string;
  excerptId: string;
  content: string;
  contentId: string;
  publishedAt: string;
  author: string;
  category: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Branch {
  id: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  isHeadOffice: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  subject: string;
  message: string;
}

export type Locale = "en" | "id";
