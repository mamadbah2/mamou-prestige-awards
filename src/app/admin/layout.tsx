import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin | MPA 2026",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-lepi-cream">
      <AdminSidebar />
      <main className="flex-1 pt-14 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
