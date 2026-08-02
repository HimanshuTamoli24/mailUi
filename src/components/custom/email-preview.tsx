"use client"

import { X, Monitor, Smartphone } from "lucide-react"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import { getBlockDefinition, type BlockInstance } from "mail/lib/block-registry"
import { cn } from "mail/lib/utils"

export function EmailPreview() {
  const { state, togglePreview, setViewMode } = useEmailBuilder()

  if (!state.isPreviewOpen) return null

  const canvasWidth = state.viewMode === "desktop" ? "640px" : "375px"

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm">
      {/* Preview header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-6">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-white">Email Preview</h2>
          <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] text-zinc-400">
            {state.blocks.length} block{state.blocks.length !== 1 && "s"}
          </span>
        </div>

        {/* Viewport toggle */}
        <div className="flex items-center gap-1 rounded-lg bg-zinc-800 p-1">
          <button
            type="button"
            onClick={() => setViewMode("desktop")}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-md text-zinc-400 transition-colors",
              state.viewMode === "desktop" && "bg-zinc-700 text-white"
            )}
          >
            <Monitor className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mobile")}
            className={cn(
              "inline-flex size-8 items-center justify-center rounded-md text-zinc-400 transition-colors",
              state.viewMode === "mobile" && "bg-zinc-700 text-white"
            )}
          >
            <Smartphone className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={togglePreview}
          className="inline-flex size-8 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Preview body */}
      <div className="flex flex-1 items-start justify-center overflow-auto p-8">
        <div
          className="canvas-viewport rounded-lg bg-white shadow-2xl"
          style={{ width: canvasWidth, maxWidth: "100%" }}
        >
          {state.blocks.length === 0 ? (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm text-zinc-400">No blocks to preview</p>
            </div>
          ) : (
            state.blocks
              .filter((b) => !b.hidden)
              .map((block) => (
                <PreviewBlock key={block.id} block={block} />
              ))
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Preview Block Renderer ─────────────────────────────────────────
// Clean render without hover/selection UI

function PreviewBlock({ block }: { block: BlockInstance }) {
  const p = block.props
  const definition = getBlockDefinition(block.type)

  switch (block.type) {
    case "header":
      return (
        <div
          className="px-6 py-5"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          <div
            className="font-semibold"
            style={{
              color: (p.textColor as string) ?? "#18181b",
              fontSize: `${(p.fontSize as number) ?? 20}px`,
            }}
          >
            {(p.title as string) || "Company Name"}
          </div>
          {p.subtitle && (
            <div className="mt-1 text-sm" style={{ color: "#71717a" }}>
              {p.subtitle as string}
            </div>
          )}
        </div>
      )

    case "hero":
      return (
        <div
          className="px-8 py-12"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#f4f4f5",
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          <h2
            className="text-2xl font-bold"
            style={{ color: (p.textColor as string) ?? "#18181b" }}
          >
            {(p.title as string) || "Welcome"}
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm" style={{ color: "#71717a" }}>
            {(p.subtitle as string) || "Stay updated with the latest news."}
          </p>
          <div
            className="mt-5 inline-flex h-9 items-center rounded-md px-5 text-sm font-medium"
            style={{
              backgroundColor: (p.buttonColor as string) ?? "#18181b",
              color: (p.buttonTextColor as string) ?? "#ffffff",
            }}
          >
            {(p.buttonText as string) || "Get Started"}
          </div>
        </div>
      )

    case "heading":
      return (
        <div
          className="px-6"
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 8}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 8}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "left",
          }}
        >
          <div
            style={{
              fontSize: `${(p.fontSize as number) ?? 24}px`,
              fontWeight: (p.fontWeight as string) ?? "700",
              color: (p.color as string) ?? "#18181b",
            }}
          >
            {(p.text as string) || "Heading Text"}
          </div>
        </div>
      )

    case "paragraph":
      return (
        <div
          className="px-6"
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 4}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 4}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "left",
          }}
        >
          <p
            style={{
              fontSize: `${(p.fontSize as number) ?? 15}px`,
              fontWeight: (p.fontWeight as string) ?? "400",
              lineHeight: (p.lineHeight as number) ?? 1.6,
              color: (p.color as string) ?? "#52525b",
            }}
          >
            {(p.text as string) || "Paragraph text here..."}
          </p>
        </div>
      )

    case "button":
      return (
        <div
          className="px-6 py-3"
          style={{
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          <a
            href={(p.url as string) || "#"}
            className="inline-flex items-center font-medium no-underline"
            style={{
              backgroundColor: (p.backgroundColor as string) ?? "#18181b",
              color: (p.textColor as string) ?? "#ffffff",
              fontSize: `${(p.fontSize as number) ?? 14}px`,
              fontWeight: (p.fontWeight as string) ?? "600",
              borderRadius: `${(p.borderRadius as number) ?? 6}px`,
              paddingTop: `${(p.paddingTop as number) ?? 12}px`,
              paddingBottom: `${(p.paddingBottom as number) ?? 12}px`,
              paddingLeft: `${(p.paddingLeft as number) ?? 24}px`,
              paddingRight: `${(p.paddingRight as number) ?? 24}px`,
            }}
          >
            {(p.text as string) || "Click Me"}
          </a>
        </div>
      )

    case "image":
      return (
        <div
          className="px-6"
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 8}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 8}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          {p.src ? (
            <img
              src={p.src as string}
              alt={(p.alt as string) || "Image"}
              className="inline-block max-w-full"
              style={{ borderRadius: `${(p.borderRadius as number) ?? 8}px` }}
            />
          ) : (
            <div className="mx-auto flex h-40 max-w-sm items-center justify-center rounded-lg bg-zinc-100">
              <span className="text-xs text-zinc-400">Image</span>
            </div>
          )}
        </div>
      )

    case "spacer":
      return <div style={{ height: `${(p.height as number) ?? 32}px` }} />

    case "divider":
      return (
        <div
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 16}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 16}px`,
          }}
        >
          <hr
            style={{
              borderColor: (p.color as string) ?? "#e4e4e7",
              borderWidth: `${(p.thickness as number) ?? 1}px`,
              borderStyle: (p.style as string) ?? "solid",
            }}
          />
        </div>
      )

    case "section":
      return (
        <div
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            paddingTop: `${(p.paddingTop as number) ?? 24}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 24}px`,
            paddingLeft: `${(p.paddingLeft as number) ?? 16}px`,
            paddingRight: `${(p.paddingRight as number) ?? 16}px`,
            borderRadius: `${(p.borderRadius as number) ?? 0}px`,
          }}
        />
      )

    case "container":
      return (
        <div
          className="mx-auto"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            maxWidth: `${(p.maxWidth as number) ?? 600}px`,
            padding: `${(p.paddingTop as number) ?? 16}px ${(p.paddingRight as number) ?? 16}px ${(p.paddingBottom as number) ?? 16}px ${(p.paddingLeft as number) ?? 16}px`,
            borderRadius: `${(p.borderRadius as number) ?? 8}px`,
          }}
        />
      )

    case "logo":
      return (
        <div
          className="px-6"
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 16}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 16}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          {p.src ? (
            <img
              src={p.src as string}
              alt={(p.alt as string) ?? "Logo"}
              style={{
                width: `${(p.width as number) ?? 120}px`,
                height: `${(p.height as number) ?? 40}px`,
              }}
              className="inline-block"
            />
          ) : (
            <div className="mx-auto inline-flex h-10 items-center gap-2 rounded-lg bg-zinc-100 px-4">
              <div className="size-6 rounded bg-zinc-200" />
              <span className="text-xs font-medium text-zinc-500">Logo</span>
            </div>
          )}
        </div>
      )

    case "feature-grid": {
      const features = (p.features as { title: string; description: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            paddingTop: `${(p.paddingTop as number) ?? 32}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 32}px`,
          }}
        >
          <div className="grid grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="rounded-lg bg-zinc-50 p-4 text-center">
                <div
                  className="text-sm font-semibold"
                  style={{ color: (p.textColor as string) ?? "#18181b" }}
                >
                  {f.title}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    case "testimonial":
      return (
        <div
          className="px-8"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#f4f4f5",
            paddingTop: `${(p.paddingTop as number) ?? 32}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 32}px`,
            borderRadius: `${(p.borderRadius as number) ?? 8}px`,
          }}
        >
          <p
            className="text-sm italic"
            style={{ color: (p.textColor as string) ?? "#18181b" }}
          >
            &ldquo;{(p.quote as string) || "Great product!"}&rdquo;
          </p>
          <div
            className="mt-3 text-xs font-medium"
            style={{ color: (p.textColor as string) ?? "#18181b" }}
          >
            {(p.author as string) || "Jane Doe"}
          </div>
          <div className="text-xs text-zinc-500">
            {(p.role as string) || "CEO"}
          </div>
        </div>
      )

    case "pricing": {
      const features = (p.features as string[]) ?? []
      return (
        <div
          className="mx-auto max-w-xs rounded-xl border px-6 text-center"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            borderColor: (p.borderColor as string) ?? "#e4e4e7",
            paddingTop: `${(p.paddingTop as number) ?? 32}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 32}px`,
          }}
        >
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {(p.planName as string) || "Pro"}
          </div>
          <div className="mt-2 text-3xl font-bold text-zinc-900">
            {(p.price as string) || "$29"}
            <span className="text-sm font-normal text-zinc-500">
              {(p.period as string) || "/month"}
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-left text-xs text-zinc-600">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-5 w-full rounded-md bg-blue-600 py-2 text-center text-xs font-medium text-white">
            {(p.buttonText as string) || "Subscribe"}
          </div>
        </div>
      )
    }

    case "faq": {
      const items = (p.items as { question: string; answer: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            paddingTop: `${(p.paddingTop as number) ?? 24}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 24}px`,
          }}
        >
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="rounded-lg bg-zinc-50 p-4">
                <div className="text-xs font-semibold text-zinc-900">{item.question}</div>
                <div className="mt-1 text-xs text-zinc-600">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    case "product-card":
      return (
        <div
          className="mx-auto max-w-xs overflow-hidden rounded-xl border border-zinc-200"
          style={{ backgroundColor: (p.backgroundColor as string) ?? "#ffffff" }}
        >
          <div className="flex h-32 items-center justify-center bg-zinc-100">
            <span className="text-xs text-zinc-400">Product Image</span>
          </div>
          <div className="p-4">
            <div className="text-sm font-semibold text-zinc-900">
              {(p.name as string) || "Product Name"}
            </div>
            <div className="mt-0.5 text-xs text-zinc-600">
              {(p.description as string) || "Product description"}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-zinc-900">
                {(p.price as string) || "$49.99"}
              </span>
              <div className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
                {(p.buttonText as string) || "Buy Now"}
              </div>
            </div>
          </div>
        </div>
      )

    case "order-summary": {
      const items = (p.items as { name: string; quantity: number; price: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            paddingTop: `${(p.paddingTop as number) ?? 24}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 24}px`,
          }}
        >
          <div className="text-sm font-semibold text-zinc-900">Order Summary</div>
          <div className="mt-3 space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-zinc-600">{item.name} × {item.quantity}</span>
                <span className="font-medium text-zinc-900">{item.price}</span>
              </div>
            ))}
            <div className="border-t border-zinc-200 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-zinc-900">
                <span>Total</span>
                <span>{(p.total as string) || "$0.00"}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    case "invoice": {
      const items = (p.items as { description: string; amount: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
            paddingTop: `${(p.paddingTop as number) ?? 24}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 24}px`,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-zinc-900">Invoice</div>
            <div className="text-xs text-zinc-500">{(p.invoiceNumber as string) || "INV-001"}</div>
          </div>
          <div className="mt-1 text-xs text-zinc-500">{(p.date as string) || "2024-01-15"}</div>
          <div className="mt-3 space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-zinc-600">{item.description}</span>
                <span className="font-medium text-zinc-900">{item.amount}</span>
              </div>
            ))}
            <div className="border-t border-zinc-200 pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-900">
                <span>Total</span>
                <span>{(p.total as string) || "$0.00"}</span>
              </div>
            </div>
          </div>
        </div>
      )
    }

    case "social-links": {
      const links = (p.links as { platform: string; url: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            paddingTop: `${(p.paddingTop as number) ?? 16}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 16}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          <div className="inline-flex gap-3">
            {links.map((link, i) => (
              <div
                key={i}
                className="flex size-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-medium capitalize"
                style={{ color: (p.iconColor as string) ?? "#71717a" }}
              >
                {link.platform.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      )
    }

    case "footer": {
      const links = (p.links as { label: string; url: string }[]) ?? []
      return (
        <div
          className="px-6"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#f4f4f5",
            paddingTop: `${(p.paddingTop as number) ?? 24}px`,
            paddingBottom: `${(p.paddingBottom as number) ?? 24}px`,
            textAlign: (p.alignment as "left" | "center" | "right") ?? "center",
          }}
        >
          <p
            style={{
              fontSize: `${(p.fontSize as number) ?? 12}px`,
              color: (p.textColor as string) ?? "#71717a",
            }}
          >
            {(p.text as string) || "© 2024 Company"}
          </p>
          {links.length > 0 && (
            <div className="mt-2 flex items-center justify-center gap-3">
              {links.map((link, i) => (
                <span key={i} className="text-xs text-zinc-500 underline">
                  {link.label}
                </span>
              ))}
            </div>
          )}
        </div>
      )
    }

    default:
      return (
        <div className="flex items-center justify-center px-6 py-8">
          <span className="text-xs text-zinc-400">{definition.label} block</span>
        </div>
      )
  }
}
