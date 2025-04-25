import { AppSidebarMember } from "@/components/app-sidebar-member";
import { SidebarProvider } from "@/components/ui/sidebar";
import connectMongo from "@/lib/mongodb";
import Member from "@/models/Member";
import { redirect } from "next/navigation";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongo();

  const member = "Johnny Bravo"; // Replace with actual member data fetching logic

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebarMember member={member} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
