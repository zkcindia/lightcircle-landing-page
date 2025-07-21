// app/admin/layout.tsx
import React from "react";
import AdminHeader from "../components/admin/AdminHeader";
import SideBar from "../components/admin/SideBar";
import AdminFooter from "../components/admin/AdminFooter";

export const metadata = {
  title: "Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminHeader />
        <SideBar />
        <main className="p-8">{children}</main>
        <AdminFooter />
      </body>
    </html>
  );
}
