import { Home, Users, Image, Clock, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "wouter";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "หน้าแรก",
    url: "/",
    icon: Home,
  },
  {
    title: "คลังสมาชิก",
    url: "/members",
    icon: Users,
  },
  {
    title: "แกลเลอรี",
    url: "/gallery",
    icon: Image,
  },
  {
    title: "ไทม์ไลน์",
    url: "/timeline",
    icon: Clock,
  },
  {
    title: "จัดการข้อมูล",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-serif font-semibold">
            Alumni Showcase
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.url.slice(1) || 'home'}`}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
