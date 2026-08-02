"use client";

import Link from "next/link";
import { MoveUpRight } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full   bg-transparent transition-all">
      <div className="mx-auto flex h-[74px] max-w-[1710px] items-center justify-between px-6 md:px-14">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-zinc-900"
        >
          <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-mono text-sm shadow-sm">
            M
          </div>
          <span>MailUI</span>
        </Link>

        {/* <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#templates" className="hover:opacity-60 transition-opacity">Templates</a>
          <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
          <a href="#showcase" className="hover:opacity-60 transition-opacity">Showcase</a>
        </nav> */}

        <Link
          href="/builder"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#080808] px-4 text-sm font-medium text-white transition-all hover:bg-[#323232] group"
        >
          <span>Open Builder</span>
          <MoveUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  );
}
