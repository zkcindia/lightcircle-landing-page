"use client";
import React from "react";
import AdminHeader from "../components/admin/AdminHeader";
import SideBar from "../components/admin/SideBar";
import AdminFooter from "../components/admin/AdminFooter";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const [isLockedOpen, setIsLockedOpen] = React.useState(false);

  return (
    <html lang="en">
      <body className="flex">
        <SideBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isLockedOpen={isLockedOpen}
          setIsLockedOpen={setIsLockedOpen}
        />
        <div className={`flex-1 flex flex-col min-h-screen ${collapsed ? "ml-16" : "ml-64"} transition-all duration-300`}>
          <AdminHeader collapsed={collapsed} />
          <main className="p-8 flex-1">{children}</main>
          <AdminFooter />
        </div>
      </body>
    </html>
  );
}
