import LeftSideBar from "@/components/leftsidebar";
import NavBar from "@/components/navbar";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
       <LeftSideBar />
      <div className="">
        {children}
      </div>
    </>
  );
}
