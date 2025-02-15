import { AppSidebarMember } from "@/components/app-sidebar-member";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebarMember />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
