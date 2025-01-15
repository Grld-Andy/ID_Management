"use client";

import * as React from "react";
import { Settings, Store } from "lucide-react";
import { NavMain } from "@/components/Sidebar/nav-main";
import { NavUser } from "@/components/Sidebar/nav-user";
// import { TeamSwitcher } from "@/components/Sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { UserContext } from "@/context/userContext/context";

const data = {
  navMain: [
    {
      title: "General",
      url: "#",
      icon: Store,
      isActive: true,
      items: [
        {
          title: "Clients",
          url: "/clients?page=1",
        },
        {
          title: "Employees",
          url: "/employees?page=1",
        },
        {
          title: "Products",
          url: "/products?page=1",
        },
        {
          title: "Orders",
          url: "/orders?page=1",
        },
        {
          title: "Finance",
          url: "/finance",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/settings/profile",
        },
        {
          title: "Account",
          url: "/settings/account",
        },
        {
          title: "Appearance",
          url: "/settings/appearance",
        },
        {
          title: "Messages",
          url: "/settings/message",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = React.useContext(UserContext);

  if (user) {
    return (
      <Sidebar collapsible="icon" {...props}>
        {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
        <SidebarContent className="bg-gradient-to-b from-color1 to-sidebarBg2 text-sidebarText">
          <NavMain items={data.navMain} />
        </SidebarContent>
        <SidebarFooter className="bg-sidebarBg2">
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }
}
