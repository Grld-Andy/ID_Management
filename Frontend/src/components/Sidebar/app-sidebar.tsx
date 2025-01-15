"use client";

import * as React from "react";
import { Frame, Map, PieChart, Settings, Store } from "lucide-react";
import { NavMain } from "@/components/Sidebar/nav-main";
import { NavProjects } from "@/components/Sidebar/nav-projects";
import { NavUser } from "@/components/Sidebar/nav-user";
// import { TeamSwitcher } from "@/components/Sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  // SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "my name here",
    email: "someone@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  //   teams: [
  //     {
  //       name: "Acme Inc",
  //       logo: GalleryVerticalEnd,
  //       plan: "Enterprise",
  //     },
  //     {
  //       name: "Acme Corp.",
  //       logo: AudioWaveform,
  //       plan: "Startup",
  //     },
  //     {
  //       name: "Evil Corp.",
  //       logo: Command,
  //       plan: "Free",
  //     },
  //   ],
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent className="bg-gradient-to-b from-color1 to-sidebarBg2 text-sidebarText">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter className="bg-sidebarBg2">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
