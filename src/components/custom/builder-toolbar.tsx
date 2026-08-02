"use client"

import {
  Undo2,
  Redo2,
  Monitor,
  Smartphone,
  Eye,
  Save,
  Download,
  Send,
} from "lucide-react"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import { cn } from "mail/lib/utils"

export function BuilderToolbar() {
  const { undo, redo, canUndo, canRedo, state, setViewMode, togglePreview } =
    useEmailBuilder()

  return (
    <div className="flex h-14 shrink-0 items-center justify-between border-b border-builder-border bg-white px-4">
      {/* Left – Brand */}
      <div className="flex items-center gap-3">
        <div className="flex size-8 items-center justify-center rounded-lg bg-builder-accent">
          <Send className="size-4 text-white -rotate-12" />
        </div>
        <span className="text-sm font-semibold tracking-tight text-builder-text">
          MailUI Builder
        </span>
      </div>

      {/* Center – Actions */}
      <div className="flex items-center gap-1">
        {/* Undo / Redo */}
        <ToolbarButton
          icon={Undo2}
          label="Undo"
          onClick={undo}
          disabled={!canUndo}
        />
        <ToolbarButton
          icon={Redo2}
          label="Redo"
          onClick={redo}
          disabled={!canRedo}
        />

        <ToolbarDivider />

        {/* Viewport toggle */}
        <ToolbarButton
          icon={Monitor}
          label="Desktop"
          onClick={() => setViewMode("desktop")}
          active={state.viewMode === "desktop"}
        />
        <ToolbarButton
          icon={Smartphone}
          label="Mobile"
          onClick={() => setViewMode("mobile")}
          active={state.viewMode === "mobile"}
        />

        <ToolbarDivider />

        {/* Preview */}
        <ToolbarButton
          icon={Eye}
          label="Preview"
          onClick={togglePreview}
          active={state.isPreviewOpen}
        />
      </div>

      {/* Right – Save / Export / Publish */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-builder-border bg-white px-3 text-xs font-medium text-builder-text transition-colors hover:bg-builder-hover"
        >
          <Save className="size-3.5" />
          Save
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-builder-border bg-white px-3 text-xs font-medium text-builder-text transition-colors hover:bg-builder-hover"
        >
          <Download className="size-3.5" />
          Export
        </button>
        <button
          type="button"
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-builder-accent px-3 text-xs font-medium text-white transition-colors hover:bg-builder-accent/90"
        >
          <Send className="size-3.5" />
          Publish
        </button>
      </div>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────────────────

function ToolbarButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  active,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  disabled?: boolean
  active?: boolean
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-builder-text-secondary transition-colors",
        "hover:bg-builder-hover hover:text-builder-text",
        "disabled:pointer-events-none disabled:opacity-30",
        active && "bg-builder-accent-muted text-builder-accent"
      )}
    >
      <Icon className="size-4" />
    </button>
  )
}

function ToolbarDivider() {
  return <div className="mx-1.5 h-4 w-px bg-builder-border" />
}
