"use client";
import * as React from "react";
import { useEffect, startTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
import { useRouter } from "next/navigation";

// Define types for navigation items
type NavItem = {
  title: string;
  url: string;
  openInNewTab?: boolean;
};

type NavGroup = {
  title: string;
  url: string;
  items: NavItem[];
};

// This is sample data.
const data: {
  versions: string[];
  navMain: NavGroup[];
} = {
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
    {
      title: "Contribution Management",
      url: "#",
      items: [{ title: "Contributions", url: "/portal/contributions" }],
    },
    {
      title: "Geneology",
      url: "#",
      items: [{ title: "Organizational Chart", url: "/portal/genealogy" }],
    },
    {
      title: "Content Management System",
      url: "#",
      items: [
        { title: "TFOE Admin CMS", url: "/admin-cms", openInNewTab: true },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
    console.log("Logging out...");
    startTransition(() => {
      logoutAction();
    });
    console.log("Logout action dispatched");
  };

  // Helper function to check if a path is active
  const isPathActive = (url: string) => {
    if (url === "/portal") {
      return pathname === "/portal";
    }
    return pathname === url || pathname.startsWith(url + "/");
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
        {/* Dashboard Link */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isPathActive("/portal")}>
                  <Link href="/portal">Dashboard</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Navigation Items */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((subItem) => (
                  <SidebarMenuItem key={subItem.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isPathActive(subItem.url)}
                    >
                      {subItem.openInNewTab ? (
                        <Link
                          href={subItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {subItem.title}
                        </Link>
                      ) : (
                        <Link href={subItem.url}>{subItem.title}</Link>
                      )}
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
