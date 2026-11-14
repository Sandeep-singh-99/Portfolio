"use client";
import React from 'react'
import {SessionProvider} from "next-auth/react";
import "@/styles/markdown-editor.css";


export default function MainLayout({ children } : { children: React.ReactNode }) {

  return (
    <SessionProvider>
      <div className="min-h-screen w-full">
        <div className="flex">
          <div className="flex-1">
            {children}
          </div>
        </div>
      </div>
    </SessionProvider>
  )
}