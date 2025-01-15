import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "../Sidebar/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

const Layout: React.FC = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-10 absolute shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-10">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="" />
            </div>
          </header>

          <div className="p-5 pt-10 bg-coloredBg">
            <Outlet />
            <Toaster />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
