"use client"

import { useCallback } from "react"
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  EyeOff,
  Eye,
} from "lucide-react"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import { getBlockDefinition, type BlockInstance } from "mail/lib/block-registry"
import { cn } from "mail/lib/utils"

interface CanvasBlockProps {
  block: BlockInstance
  index: number
  isFirst: boolean
  isLast: boolean
}

export function CanvasBlock({ block, index, isFirst, isLast }: CanvasBlockProps) {
  const {
    state,
    selectBlock,
    hoverBlock,
    removeBlock,
    duplicateBlock,
    moveBlock,
    toggleVisibility,
  } = useEmailBuilder()

  const isSelected = state.selectedBlockId === block.id
  const isHovered = state.hoveredBlockId === block.id
  const definition = getBlockDefinition(block.type)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      selectBlock(block.id)
    },
    [block.id, selectBlock]
  )

  return (
    <div
      className={cn(
        "group/block relative transition-all duration-150 h-full" ,
        block.hidden && "opacity-40",
        isSelected && "block-selected",
        isHovered && !isSelected && "block-hovered"
      )}
      onClick={handleClick}
      onMouseEnter={() => hoverBlock(block.id)}
      onMouseLeave={() => hoverBlock(null)}
    >
      {/* Hover / Selected toolbar */}
      {(isHovered || isSelected) && (
        <div className="block-toolbar-animate absolute -top-9 right-2 z-20 flex items-center gap-0.5 rounded-md border border-builder-border bg-white px-1 py-0.5 shadow-sm">
          {/* Drag handle */}
          <ToolbarAction
            icon={GripVertical}
            label="Drag"
            className="cursor-grab active:cursor-grabbing"
          />

          <div className="mx-0.5 h-4 w-px bg-builder-border" />

          <ToolbarAction
            icon={ArrowUp}
            label="Move up"
            onClick={() => moveBlock(block.id, "up")}
            disabled={isFirst}
          />
          <ToolbarAction
            icon={ArrowDown}
            label="Move down"
            onClick={() => moveBlock(block.id, "down")}
            disabled={isLast}
          />

          <div className="mx-0.5 h-4 w-px bg-builder-border" />

          <ToolbarAction
            icon={Copy}
            label="Duplicate"
            onClick={() => duplicateBlock(block.id)}
          />
          <ToolbarAction
            icon={block.hidden ? Eye : EyeOff}
            label={block.hidden ? "Show" : "Hide"}
            onClick={() => toggleVisibility(block.id)}
          />
          <ToolbarAction
            icon={Trash2}
            label="Delete"
            onClick={() => removeBlock(block.id)}
            danger
          />
        </div>
      )}

      {/* Block type label */}
      {(isHovered || isSelected) && (
        <div className="block-toolbar-animate absolute -top-9 left-2 z-20 flex items-center gap-1.5 rounded-md bg-builder-accent px-2 py-1">
          <definition.icon className="size-3 text-white" />
          <span className="text-[10px] font-medium text-white">
            {definition.label}
          </span>
        </div>
      )}

      {/* Block content preview */}
      <BlockPreview block={block} />
    </div>
  )
}

// ─── Toolbar Action Button ──────────────────────────────────────────

function ToolbarAction({
  icon: Icon,
  label,
  onClick,
  disabled,
  danger,
  className: extraClass,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
  disabled?: boolean
  danger?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
      disabled={disabled}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded text-builder-text-secondary transition-colors",
        "hover:bg-builder-hover hover:text-builder-text",
        "disabled:pointer-events-none disabled:opacity-30",
        danger && "hover:bg-red-50 hover:text-builder-danger",
        extraClass
      )}
    >
      <Icon className="size-3" />
    </button>
  )
}

// ─── Block Preview Renderer ─────────────────────────────────────────
// Renders a visual preview based on block type + props

function BlockPreview({ block }: { block: BlockInstance }) {
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
          {Boolean(p.subtitle) && (
            <div
              className="mt-1 text-sm"
              style={{ color: (p.textColor as string) ?? "#71717a" }}
            >
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
          <p
            className="mx-auto mt-3 max-w-md text-sm"
            style={{ color: "#71717a" }}
          >
            {(p.subtitle as string) || "Stay updated with the latest news."}
          </p>
          <button
            type="button"
            className="mt-5 inline-flex h-9 items-center rounded-md px-5 text-sm font-medium"
            style={{
              backgroundColor: (p.buttonColor as string) ?? "#18181b",
              color: (p.buttonTextColor as string) ?? "#ffffff",
            }}
          >
            {(p.buttonText as string) || "Get Started"}
          </button>
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
          <button
            type="button"
            className="inline-flex items-center font-medium"
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
          </button>
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
            <div className="mx-auto flex h-40 max-w-sm items-center justify-center rounded-lg border-2 border-dashed border-builder-border bg-builder-sidebar">
              <span className="text-xs text-builder-text-muted">Image placeholder</span>
            </div>
          )}
        </div>
      )

    case "spacer":
      return (
        <div
          className="relative"
          style={{ height: `${(p.height as number) ?? 32}px` }}
        >
          <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-builder-border" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] text-builder-text-muted">
            {(p.height as number) ?? 32}px
          </span>
        </div>
      )

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
        >
          <div className="flex items-center justify-center rounded border-2 border-dashed border-builder-border py-6 text-xs text-builder-text-muted">
            Section block
          </div>
        </div>
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
        >
          <div className="flex items-center justify-center rounded border-2 border-dashed border-builder-border py-6 text-xs text-builder-text-muted">
            Container block
          </div>
        </div>
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
            <div className="mx-auto inline-flex h-10 items-center gap-2 rounded-lg bg-builder-sidebar px-4 text-builder-text-muted">
              <div className="size-6 rounded bg-builder-border" />
              <span className="text-xs font-medium">Your Logo</span>
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
              <div key={i} className="rounded-lg bg-builder-sidebar p-4 text-center">
                <div
                  className="text-sm font-semibold"
                  style={{ color: (p.textColor as string) ?? "#18181b" }}
                >
                  {f.title}
                </div>
                <div className="mt-1 text-xs text-builder-text-muted">
                  {f.description}
                </div>
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
          <div className="mt-3 text-xs font-medium" style={{ color: (p.textColor as string) ?? "#18181b" }}>
            {(p.author as string) || "Jane Doe"}
          </div>
          <div className="text-xs text-builder-text-muted">
            {(p.role as string) || "CEO"}
          </div>
        </div>
      )

    case "pricing":
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
          <div className="text-xs font-semibold uppercase tracking-wider text-builder-text-muted">
            {(p.planName as string) || "Pro"}
          </div>
          <div className="mt-2 text-3xl font-bold text-builder-text">
            {(p.price as string) || "$29"}
            <span className="text-sm font-normal text-builder-text-muted">
              {(p.period as string) || "/month"}
            </span>
          </div>
          <ul className="mt-4 space-y-2 text-left text-xs text-builder-text-secondary">
            {((p.features as string[]) ?? []).map((f, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-builder-accent">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-5 w-full rounded-md bg-builder-accent py-2 text-xs font-medium text-white"
          >
            {(p.buttonText as string) || "Subscribe"}
          </button>
        </div>
      )

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
              <div key={i} className="rounded-lg bg-builder-sidebar p-4">
                <div className="text-xs font-semibold text-builder-text">{item.question}</div>
                <div className="mt-1 text-xs text-builder-text-secondary">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      )
    }

    case "product-card":
      return (
        <div
          className="mx-auto max-w-xs overflow-hidden rounded-xl border border-builder-border"
          style={{
            backgroundColor: (p.backgroundColor as string) ?? "#ffffff",
          }}
        >
          <div className="flex h-32 items-center justify-center bg-builder-sidebar">
            <span className="text-xs text-builder-text-muted">Product Image</span>
          </div>
          <div className="p-4">
            <div className="text-sm font-semibold text-builder-text">
              {(p.name as string) || "Product Name"}
            </div>
            <div className="mt-0.5 text-xs text-builder-text-secondary">
              {(p.description as string) || "Product description"}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm font-bold text-builder-text">
                {(p.price as string) || "$49.99"}
              </span>
              <button
                type="button"
                className="rounded-md bg-builder-accent px-3 py-1.5 text-xs font-medium text-white"
              >
                {(p.buttonText as string) || "Buy Now"}
              </button>
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
          <div className="text-sm font-semibold text-builder-text">Order Summary</div>
          <div className="mt-3 space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-builder-text-secondary">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-medium text-builder-text">{item.price}</span>
              </div>
            ))}
            <div className="border-t border-builder-border pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-builder-text">
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
            <div className="text-sm font-semibold text-builder-text">Invoice</div>
            <div className="text-xs text-builder-text-muted">
              {(p.invoiceNumber as string) || "INV-001"}
            </div>
          </div>
          <div className="mt-1 text-xs text-builder-text-muted">
            {(p.date as string) || "2024-01-15"}
          </div>
          <div className="mt-3 space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="text-builder-text-secondary">{item.description}</span>
                <span className="font-medium text-builder-text">{item.amount}</span>
              </div>
            ))}
            <div className="border-t border-builder-border pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-builder-text">
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
                className="flex size-8 items-center justify-center rounded-full bg-builder-sidebar text-xs font-medium capitalize"
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
                <span
                  key={i}
                  className="text-xs text-builder-text-muted underline"
                >
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
          <span className="text-xs text-builder-text-muted">
            {definition.label} block
          </span>
        </div>
      )
  }
}
