import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

export const metadata = {
  title: "Admin CMS | PT. Ditek Jaya",
  description: "Content Management System for PT. Ditek Jaya website.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      {children}
    </AdminAuthProvider>
  );
}
