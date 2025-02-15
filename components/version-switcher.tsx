"use client";

import * as React from "react";
import { GalleryVerticalEnd } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[];
  defaultVersion: string;
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex size-8 items-center justify-center ">
            <img src="/logo.png" alt="logo" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">John Doe</span>
            <span className="">admin</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
