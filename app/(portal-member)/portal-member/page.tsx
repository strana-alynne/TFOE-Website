"use client";
// app/portal-member/page.tsx
import React, { useEffect, useState } from "react";
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
import { getDetails } from "./actions.ts";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

// Define dummy data
const dummyMember = {
  _id: "user1",
  firstName: "John",
  lastName: "Smith",
  email: "john.smith@example.com",
  role: "member",
};

export default function Page() {
  const [member, setMember] = useState(dummyMember);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await getDetails(token);
        setMember(response.data);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
      }
    };

    fetchDetails();
  }, []);

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
        { member ? <h2 className="text-2xl font-bold">Welcome {member.firstName}!</h2> : <h2 className="text-2xl font-bold">Loading....</h2> } 
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
