import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  Building2,
  HandCoins,
  Construction,
  Handshake,
  TableProperties,
  UtensilsCrossed,
  CookingPot,
  Kanban,
  Banana,
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
import { Link, useNavigate } from "@tanstack/react-router";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/$id" },
  { name: "Businesses", icon: Building2, href: "/$id/businesses" },
  { name: "Restaurant", icon: UtensilsCrossed, href: "/$id/restaurant" },
  { name: "Ingredient", icon: Banana, href: "/$id/ingredient" },
  { name: "Inventory", icon: Kanban, href: "/$id/inventory" },
  { name: "Recipe", icon: CookingPot, href: "/$id/recipe" },
  { name: "Users", icon: Users, href: "/$id/users" },
  { name: "Products", icon: ShoppingCart, href: "/$id/products" },
  { name: "Asset Maintence", icon: Construction, href: "/$id/assetMaintenance" },
  { name: "Supplier", icon: Handshake, href: "/$id/suppier" },
  { name: "Assets", icon: HandCoins, href: "/$id/assets" },
  { name: "Purchase Order", icon: TableProperties, href: "/$id/purchaseOrder" },
  { name: "Line Item", icon: TableProperties, href: "/$id/lineItem" },
  { name: "Order Item", icon: TableProperties, href: "/$id/orderitem" },
  { name: "Owner", icon: TableProperties, href: "/$id/own" },
  { name: "RecipeIngredint", icon: TableProperties, href: "/$id/recipeIngredint" },
  { name: "SalesTransactions", icon: TableProperties, href: "/$id/salesTransaction" },
  { name: "Stock Location", icon: TableProperties, href: "/$id/stockLocation" },
  { name: "Storage Area", icon: TableProperties, href: "/$id/storageArea" },
  { name: "Time Sheet", icon: TableProperties, href: "/$id/timeSheet" },
  { name: "Transfer Record", icon: TableProperties, href: "/$id/transferRecord" },
  { name: "Waste Record", icon: TableProperties, href: "/$id/wasteRecord" },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate(); // Get the navigate function

  const handleClick = () => {
    navigate({ to: "/$id/products", params: { id: "6" } });
  };

  return (
    <>
      <SidebarMenu className="max-w-64 pl-6 pt-16 z-0 -mt-7 bg-stone-800">
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
    </>
  );
}
