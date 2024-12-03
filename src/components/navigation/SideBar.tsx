import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/id/dashboard" },
  { name: "Users", icon: Users, href: "/id/users" },
  { name: "Products", icon: ShoppingCart, href: "/id/products" },
  { name: "Orders", icon: FileText, href: "/id/orders" },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarMenu>
      {sidebarItems.map((item) => (
        <li key={item.name}>
          <Link
            to={item.href}
            className={cn(
              "flex items-center space-x-2 rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-colors"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.name}</span>}
          </Link>
        </li>
      ))}
    </SidebarMenu>
  );
}