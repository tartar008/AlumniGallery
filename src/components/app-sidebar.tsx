import { Home, Users, Image } from "lucide-react";
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
  { title: "หน้าแรก", url: "/", icon: Home },
  { title: "คลังสมาชิก", url: "/members", icon: Users },
  { title: "แกลเลอรี", url: "/gallery", icon: Image },
];

export function AppSidebar() {
  const [location] = useLocation();

  return (
    <Sidebar className="border-r bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <SidebarContent>
        {/* Header / Logo */}
        <SidebarGroup className="py-6 px-4 border-b border-gray-200 dark:border-gray-800">
          <SidebarGroupLabel className="text-xl font-serif font-semibold text-gray-800 dark:text-gray-100">
            🎓 Alumni Showcase
          </SidebarGroupLabel>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            รวมเพื่อนศิษย์เก่า ICT 18
          </p>
        </SidebarGroup>

        {/* Menu */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="mt-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        data-testid={`link-${item.url.slice(1) || "home"}`}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                          ${isActive
                            ? "bg-indigo-600 text-white shadow-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-gray-800 hover:text-indigo-600"
                          }`}
                      >
                        <item.icon
                          className={`w-5 h-5 ${isActive ? "text-white" : "text-indigo-500"
                            }`}
                        />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-4 text-xs text-gray-500 text-center">
          © 2025 ICT 18
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
