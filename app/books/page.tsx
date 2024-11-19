"use client";
import Books from "@/components/Books";
import Tab from "@/components/Tab";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen px-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full h-full flex flex-col gap-8 row-start-2 sm:items-start">
        <Tab selectedTabId={"books"} />
        <Suspense>
          <Books />
        </Suspense>
      </main>
    </div>
  );
}
