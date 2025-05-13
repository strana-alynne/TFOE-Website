"use client";
import * as React from "react";
import { useEffect, startTransition } from "react";
import { VersionSwitcherMember } from "./version-switcher-member";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logout } from "@/app/login/actions";
import { useActionState } from "react";
import { redirect, useRouter } from "next/navigation";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    { title: "Profile", url: "/portal-member/profile" },
    { title: "Event", url: "/portal-member/eagle-events" },
    { title: "Organizational Chart", url: "/portal-member/genealogy" },
  ],
};

export function AppSidebarMember({
  member,
  ...props
}: React.ComponentProps<typeof Sidebar> & { member: any }) {
  const [state, logoutAction] = useActionState(logout, undefined);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && state?.redirectTo) {
      localStorage.removeItem("access_token");
      router.push(state.redirectTo);
    }
  }, [state, router]);

  const handleLogout = () => {
    startTransition(() => {
      logoutAction();
    });
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcherMember name={member.firstName} role={member.role} />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/portal-member">Dashboard</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>{item.title}</a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handleLogout()} asChild isActive>
              <a>Logout</a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
