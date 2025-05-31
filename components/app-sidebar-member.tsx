"use client";
import * as React from "react";
import { useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { useRouter } from "next/navigation";

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
  const pathname = usePathname();

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

  // Helper function to check if a path is active
  const isPathActive = (url: string) => {
    if (url === "/portal-member") {
      return pathname === "/portal-member";
    }
    return pathname === url || pathname.startsWith(url + "/");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcherMember name={member.firstName} role={member.role} />
      </SidebarHeader>
      <SidebarContent>
        {/* Dashboard Link */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isPathActive("/portal-member")}
                >
                  <Link href="/portal-member">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Items */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isPathActive(item.url)}>
                    <Link href={item.url}>{item.title}</Link>
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
            <SidebarMenuButton onClick={handleLogout} asChild>
              <button>Logout</button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
