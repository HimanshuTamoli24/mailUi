"use client";

import { useState, useEffect, useRef } from "react";
import { Settings, Check, X, Palette } from "lucide-react";

const ACCENT_COLORS = [
  { name: "Blue", hex: "#2563eb", muted: "rgba(37, 99, 235, 0.08)" },
  { name: "Rose", hex: "#f43f5e", muted: "rgba(244, 63, 94, 0.08)" },
  { name: "Emerald", hex: "#10b981", muted: "rgba(16, 185, 129, 0.08)" },
  { name: "Purple", hex: "#8b5cf6", muted: "rgba(139, 92, 246, 0.08)" },
  { name: "Amber", hex: "#f59e0b", muted: "rgba(245, 158, 11, 0.08)" },
  { name: "Charcoal", hex: "#18181b", muted: "rgba(24, 24, 27, 0.08)" },
];

export function ThemeSettingsWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAccent, setActiveAccent] = useState("#2563eb");
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const savedColor = localStorage.getItem("mailui_primary_accent");
    if (savedColor) {
      setActiveAccent(savedColor);
      const match = ACCENT_COLORS.find((c) => c.hex === savedColor);
      applyAccent(savedColor, match?.muted);
    }
  }, []);

  const applyAccent = (hex: string, muted?: string) => {
    document.documentElement.style.setProperty("--builder-accent", hex);
    if (muted) {
      document.documentElement.style.setProperty("--builder-accent-muted", muted);
    }
  };

  const handleSelectAccent = (color: typeof ACCENT_COLORS[number]) => {
    setActiveAccent(color.hex);
    applyAccent(color.hex, color.muted);
    localStorage.setItem("mailui_primary_accent", color.hex);
  };

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div ref={menuRef} className="fixed bottom-5 left-5 z-50 font-sans">
      {/* Floating Gear Icon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
        className="group flex size-12 items-center justify-center rounded-full border border-zinc-200/80 bg-white/90 p-0 text-zinc-700 shadow-xl backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-zinc-900 active:scale-95"
      >
        <Settings className={`size-5 transition-transform duration-300 ${isOpen ? "rotate-90 text-zinc-950" : "group-hover:rotate-45"}`} />
      </button>

      {/* Popover Menu Bar */}
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-72 origin-bottom-left rounded-2xl border border-zinc-200 bg-white/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Color Settings
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Primary Accent Color Chooser */}
          <div className="mt-4 space-y-2">
            <label className="text-xs font-medium text-zinc-700 flex items-center gap-1.5">
              <Palette className="size-3.5 text-zinc-400" />
              <span>Primary Accent Color</span>
            </label>
            <div className="flex items-center justify-between gap-1.5 pt-1">
              {ACCENT_COLORS.map((color) => {
                const isSelected = activeAccent === color.hex;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    onClick={() => handleSelectAccent(color)}
                    style={{ backgroundColor: color.hex }}
                    className={`relative flex size-7 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 ${
                      isSelected ? "ring-2 ring-offset-2 ring-zinc-900 scale-110" : ""
                    }`}
                  >
                    {isSelected && <Check className="size-3 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
