"use client";

import dynamic from "next/dynamic";

// three.js stays out of the server bundle and off the critical path
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-ink" />,
});

export function HeroCanvas() {
  return <HeroScene />;
}
