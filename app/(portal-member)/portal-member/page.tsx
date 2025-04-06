// app/portal-member/page.tsx
import { redirect } from "next/navigation";
import connectMongo from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/session";
import Member from "@/models/Member";
import MemberBarChart from "@/components/MemberBarChart";
import { MemberLineGraph } from "@/components/MemberLineGraph";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Page() {
  // 1) ensure DB is ready
  await connectMongo();

  // 2) pull the JWT payload from the cookie
  const user = await getCurrentUser();
  if (!user) {
    // no valid session → send them to login
    redirect("/login");
  }

  // 3) fetch the member record
  const member = (await Member.findById(user.userId).lean()) as {
    firstName: string;
  } | null;
  if (!member) {
    // somehow their userId is invalid
    redirect("/login");
  }

  console.log("member", member.firstName);

  // 4) render
  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4 w-full">
        <h2 className="text-2xl font-bold">Welcome {member.firstName}!</h2>
      </div>

      <div className="p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="h-full w-full">
          <MemberBarChart />
        </div>
        <div className="md:col-span-2 h-full w-full">
          <MemberLineGraph />
        </div>
      </div>
    </SidebarInset>
  );
}
