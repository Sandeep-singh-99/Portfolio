import { Award, Brain, Briefcase, Home, HousePlug, Info } from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Intro Section",
    url: "/admin-panel/intro",
    icon: <Home />,
  },
  {
    title: "About Section",
    url: "/admin-panel/about",
    icon: <Info />,
  },
  {
    title: "Skills Section",
    url: "/admin-panel/skill",
    icon: <Brain />,
  },
  {
    title: "Projects Section",
    url: "/admin-panel/projects",
    icon: <Briefcase />,
  },
  {
    title: "Certificates Section",
    url: "/admin-panel/certificate",
    icon: <Award />,
  },
];

export default function sidebar() {
  const { open } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Link href={"/"} className="flex items-center gap-2">
          { open && <span className="text-4xl font-bold">Portfolio </span> }
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Portfolio Admin Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuOptions.map((option) => (
                <SidebarMenuItem key={option.title}>
                  <SidebarMenuButton asChild size={open ? "lg" : "default"} isActive={pathname === option.url}>
                    <Link href={option.url}>
                      {option.icon}
                      {option.title}
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
