// app/portal-member/page.tsx
import { redirect } from "next/navigation";
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

// Define dummy data
const dummyMember = {
  _id: "user1",
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  role: "member",
};

export default async function Page() {
  const member = dummyMember;

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
