import DashboardBarChart from "@/components/DashbaordBarChart";
import DashboardPieChart from "@/components/DashbaordPieChart";
import { DashboardLineGraph } from "@/components/DashboardLineGraph";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { CardTitle, Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AssignmentInd, Group } from "@mui/icons-material";

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
      <div className="p-4 w-full text-2xl font-bold">
        {" "}
        <h2>Welcome to the Dashboard </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3 p-4 w-full">
        <div className="flex justify-center lg:justify-start w-full">
          <DashboardPieChart />
        </div>
        <div className="grid gap-4 grid-cols-2 col-span-2 w-full">
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Members
              </CardTitle>
              <Group />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,231</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Members
              </CardTitle>
              <AssignmentInd />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2350</div>
              <p className="text-xs text-muted-foreground">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Members</CardTitle>
              <Group />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,000</div>
              <p className="text-xs text-muted-foreground">
                +15.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-full flex-grow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <AssignmentInd />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">540</div>
              <p className="text-xs text-muted-foreground">
                +50.3% from last month
              </p>
            </CardContent>
          </Card>
        </div>
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
