import { AppSidebarMember } from "@/components/app-sidebar-member";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/session";
import connectMongo from "@/lib/mongodb";
import Member from "@/models/Member";
import { redirect } from "next/navigation";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectMongo();

  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  console.log("user", user);
  const memberDoc = (await Member.findById(user.userId).lean()) as Record<
    string,
    any
  > | null;
  if (!memberDoc) {
    redirect("/login");
  }

  // Convert MongoDB document to a plain JavaScript object
  const member = {
    firstName: memberDoc.firstName || "",
    lastName: memberDoc.lastName || "",
    role: user.role || "rawr",
    id: memberDoc._id.toString() || "",
    // Add any other properties you need
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebarMember member={member} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
