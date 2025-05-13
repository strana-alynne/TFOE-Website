"use client";
import * as React from "react";
import { useEffect, startTransition } from "react";

import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    {
      title: "Member Management",
      url: "#",
      items: [
        { title: "Members", url: "/portal/members" },
        { title: "Events", url: "/portal/eagle-events" },
        // { title: "Email Announcents", url: "#" },
      ],
    },
    // {
    //   title: "Reports",
    //   url: "#",
    //   items: [
    //     { title: "Financial Report Summary", url: "#" },
    //     { title: "Member Status", url: "#", isActive: true },
    //   ],
    // },
    // {
    //   title: "Documents",
    //   url: "#",
    //   items: [
    //     { title: "GMM Notice", url: "#" },
    //     { title: "Minutes of the Meeting", url: "#" },
    //   ],
    // },
    {
      title: "Content Management System",
      url: "#",
      items: [{ title: "TFOE Admin CMS", url: "/admin-cms" }],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <a href="/portal">Dashboard</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
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
