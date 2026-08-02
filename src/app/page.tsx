"use client";

import Link from "next/link";
import { Navbar } from "@/components/custom/navbar";
import Hero09 from "@/components/originkit/hero-09";
import TextPath from "@/components/originkit/ui/textpath";
import { Layout, Sparkles, Code2, Smartphone, ArrowRight, CheckCircle2, Zap, Layers, Eye } from "lucide-react";

export default function Home() {
  const templates = [
    {
      title: "Weekly Newsletter",
      category: "Editorial",
      description: "Clean typography with header, hero section, feature cards, and social links.",
      badge: "Popular",
      accent: "bg-blue-500/10 text-blue-600 border-blue-200",
      previewBg: "from-blue-50 to-indigo-50",
    },
    {
      title: "Product Launch & Promo",
      category: "Marketing",
      description: "High-converting announcement template featuring bold call-to-action buttons.",
      badge: "Conversion",
      accent: "bg-rose-500/10 text-rose-600 border-rose-200",
      previewBg: "from-rose-50 to-orange-50",
    },
    {
      title: "E-Commerce Order Summary",
      category: "Transactional",
      description: "Itemized receipts with pricing breakdown, totals, and customer support info.",
      badge: "Transactional",
      accent: "bg-amber-500/10 text-amber-600 border-amber-200",
      previewBg: "from-amber-50 to-yellow-50",
    },
    {
      title: "User Onboarding & Welcome",
      category: "Lifecycle",
      description: "Friendly welcome sequence to introduce users to your platform and next steps.",
      badge: "Essential",
      accent: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
      previewBg: "from-emerald-50 to-teal-50",
    },
  ];

  const features = [
    {
      icon: Layout,
      title: "Drag & Drop Canvas",
      description: "Intuitively add, reorder, duplicate, and configure email blocks in real-time.",
    },
    {
      icon: Smartphone,
      title: "Desktop & Mobile Preview",
      description: "Instant responsive view switching ensures your emails look flawless on any screen.",
    },
    {
      icon: Code2,
      title: "Clean HTML Export",
      description: "Generates semantic, inline-styled email HTML compatible with Mailchimp, SendGrid & React Email.",
    },
    {
      icon: Layers,
      title: "30+ Built-in Blocks",
      description: "Headers, heroes, buttons, feature grids, pricing tables, product cards, and footers.",
    },
    {
      icon: Zap,
      title: "Live Style Inspector",
      description: "Customize fonts, colors, padding, alignment, and border radius with zero code.",
    },
    {
      icon: Eye,
      title: "Instant Live Preview",
      description: "Test interactive elements and links before sending your campaign out.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section using hero-09 */}
      <Hero09 />

      {/* Features Section */}
      <section id="features" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 border border-zinc-900/10 text-xs font-semibold uppercase tracking-wider text-zinc-700">
            <Sparkles className="size-3.5 text-rose-500" />
            <span>Power Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
            Everything you need for email perfection
          </h2>
          <p className="text-zinc-600 text-lg">
            Stop wrestling with table layouts. MailUI handles all the complex email HTML rendering for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white border border-zinc-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="size-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center mb-6 shadow-sm">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">{feature.title}</h3>
                <p className="text-zinc-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 px-6 md:px-12 bg-white border-y border-zinc-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/5 border border-zinc-900/10 text-xs font-semibold uppercase tracking-wider text-zinc-700">
                <span>Starter Templates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-950">
                Kickstart your next email campaign
              </h2>
              <p className="text-zinc-600 text-lg">
                Choose from professionally designed blocks and templates to build your email in minutes.
              </p>
            </div>
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors shadow-sm self-start md:self-auto"
            >
              <span>Launch Builder</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {templates.map((tpl, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-zinc-50/50 overflow-hidden hover:border-zinc-300 hover:shadow-lg transition-all"
              >
                <div className={`h-40 bg-gradient-to-br ${tpl.previewBg} p-6 flex flex-col justify-between border-b border-zinc-200/60`}>
                  <span className={`inline-flex items-center self-start px-2.5 py-0.5 rounded-md text-xs font-semibold border ${tpl.accent}`}>
                    {tpl.badge}
                  </span>
                  <div className="space-y-1">
                    <div className="h-2 w-20 bg-zinc-900/20 rounded-full" />
                    <div className="h-2 w-12 bg-zinc-900/10 rounded-full" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-rose-600 transition-colors">
                      {tpl.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{tpl.description}</p>
                  </div>
                  <Link
                    href="/builder"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-900 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TextPath Marquee Section (Above Footer) */}
      <section className="py-12 bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center mb-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
            • MailUI Experience •
          </span>
        </div>
        <div className="w-full flex items-center justify-center">
          <TextPath
            text="MAILUI • DRAG & DROP EMAIL BUILDER • BEAUTIFUL TEMPLATES • CLEAN HTML EXPORT • NO-CODE DESIGN • "
            speed={30}
            reversed={true}
            textColor="#ffffff"
            waveFrequency={2.5}
            waveHeight={90}
            gap={2}
            separator=" • "
            height={220}
            textFont={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 3,
              fontFamily: "var(--font-geist-sans), sans-serif",
            }}
          />
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-zinc-950 text-zinc-400 py-16 px-6 md:px-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-xl">
              <div className="flex size-8 items-center justify-center rounded-lg bg-white text-zinc-950 font-mono text-sm">
                M
              </div>
              <span>MailUI</span>
            </div>
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              The modern visual drag-and-drop email template builder for creators, developers, and marketing teams.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 pt-2">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span>100% Client-side • Zero data tracking</span>
            </div>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  Visual Builder
                </Link>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  Email Templates
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://github.com/HimanshuTamoli24/mailUi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <Link href="/builder" className="hover:text-white transition-colors">
                  HTML Export
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} MailUI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, Originkit & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
