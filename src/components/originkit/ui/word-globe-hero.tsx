// Delivered by Originkit · stack: nextjs · styling: tailwind
"use client";

import Link from "next/link";
import TextSphere from "@/components/originkit/ui/text-sphere";
import { ArrowUp01, MoveUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Templates", href: "#templates" },
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
] as const;

export function WordGlobeHero() {
  return (
    <section className="h09-hero-shell" aria-label="Word globe hero">
      <div className="h09-content-rails" aria-hidden="true" />
      <div className="h09-wave-pattern" aria-hidden="true" />

      <div className="h09-globe-stage">
        <TextSphere
          word="MAILUI"
          color="#000"
          font={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: 16,
          }}
          speed={6}
          rotationSide="counterclockwise"
          twist={45}
          letterSpacing={200}
        />
      </div>

      <div className="h09-hero-content">
        <div className="h09-headline-block">
          <h1>
            Build Beautiful Emails
            <br />
            For Modern Teams
          </h1>
          <div className="h09-actions">
            <Link
              href="/builder"
              className="h09-button h09-button-dark rounded-md"
            >
              Start Building Free
            </Link>
            <a
              href="#templates"
              className="h09-button h09-button-light rounded-md"
            >
              Explore Templates
            </a>
          </div>
        </div>

        <div className="h09-details-block">
          <p>
            Design, customize, and export responsive HTML email templates with an intuitive drag-and-drop canvas. Zero coding required.
          </p>
          <div className="h09-stats">
            <div>
              <strong>30+</strong>
              <span>Pre-built Blocks</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Clean HTML Export</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
