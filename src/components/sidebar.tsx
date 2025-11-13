"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Award,
  Brain,
  Briefcase,
  Home,
  LayoutDashboard,
  User,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-4xl font-bold gradient-title">Portfolio </span>
        </Link>
      </div>
      <nav className="space-y-6">
        <Link href={"/admin-panel/intro"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Home className="mr-2 h-4 w-4" />
            Intro Section
          </Button>
        </Link>

        <Link href={"/admin-panel/about"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <User className="mr-2 h-4 w-4" />
            About Section
          </Button>
        </Link>
        <Link href={"/admin-panel/skill"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Brain className="mr-2 h-4 w-4" />
            Skill Section
          </Button>
        </Link>
        <Link href={"/admin-panel/projects"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Briefcase className="mr-2 h-4 w-4" />
            Project Section
          </Button>
        </Link>
        <Link href={"/admin-panel/certificate"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Award className="mr-2 h-4 w-4" />
            Certificate Section
          </Button>
        </Link>
      </nav>
    </div>
  );
}
