import DashboardBarChart from "@/components/DashbaordBarChart";
import { DashboardLineGraph } from "@/components/DashboardLineGraph";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";

export default function Page() {
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
        <h2 className="text-2xl font-bold">Welcome, John!</h2>
      </div>
      <div className="p-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <div className="h-full w-full">
          <DashboardBarChart />
        </div>
        <div className="md:col-span-2 h-full w-full">
          <DashboardLineGraph />
        </div>
      </div>
    </SidebarInset>
  );
}
