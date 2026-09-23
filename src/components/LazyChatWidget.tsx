"use client";

import dynamic from "next/dynamic";

const GlobalChatWidget = dynamic(
  () => import("@/components/GlobalChatWidget").then((mod) => mod.GlobalChatWidget),
  { ssr: false }
);

export default function LazyChatWidget() {
  return <GlobalChatWidget />;
}
