"use client"

import { useState, useCallback } from "react"
import {
  ChevronDown,
  Settings2,
  Type,
  Palette,
  Image,
  Move,
  Square,
  AlignCenter,
  Link,
  Eye,
} from "lucide-react"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import {
  getBlockDefinition,
  type PropertySection,
} from "mail/lib/block-registry"
import { cn } from "mail/lib/utils"

export function PropertiesPanel() {
  const { selectedBlock, updateBlockProps } = useEmailBuilder()

  if (!selectedBlock) {
    return (
      <aside className="flex w-[var(--builder-panel-width-right)] shrink-0 flex-col border-l border-builder-border bg-white">
        <div className="flex h-12 shrink-0 items-center border-b border-builder-border px-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-builder-text-muted">
            Properties
          </h2>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-builder-sidebar">
            <Settings2 className="size-5 text-builder-text-muted" />
          </div>
          <p className="text-center text-xs leading-relaxed text-builder-text-muted">
            Select a block on the canvas to edit its properties
          </p>
        </div>
      </aside>
    )
  }

  const definition = getBlockDefinition(selectedBlock.type)

  const handlePropChange = useCallback(
    (key: string, value: unknown) => {
      updateBlockProps(selectedBlock.id, { [key]: value })
    },
    [selectedBlock.id, updateBlockProps]
  )

  return (
    <aside className="flex w-[var(--builder-panel-width-right)] shrink-0 flex-col border-l border-builder-border bg-white">
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-builder-border px-4">
        <div className="flex items-center gap-2">
          <definition.icon className="size-3.5 text-builder-text-secondary" />
          <h2 className="text-xs font-semibold text-builder-text">
            {definition.label}
          </h2>
        </div>
        <span className="text-[10px] text-builder-text-muted">Properties</span>
      </div>

      {/* Property sections */}
      <div className="builder-panel flex-1 overflow-y-auto">
        {definition.propertySections.map((section) => (
          <PropertySectionComponent
            key={section}
            section={section}
            props={selectedBlock.props}
            onChange={handlePropChange}
          />
        ))}
      </div>
    </aside>
  )
}

// ─── Section Component ──────────────────────────────────────────────

const SECTION_META: Record<
  PropertySection,
  { label: string; icon: React.ComponentType<{ className?: string }> }
> = {
  content: { label: "Content", icon: Type },
  typography: { label: "Typography", icon: Type },
  colors: { label: "Colors", icon: Palette },
  background: { label: "Background", icon: Square },
  spacing: { label: "Spacing", icon: Move },
  borderRadius: { label: "Border Radius", icon: Square },
  alignment: { label: "Alignment", icon: AlignCenter },
  buttonLink: { label: "Button Link", icon: Link },
  images: { label: "Images", icon: Image },
  visibility: { label: "Visibility", icon: Eye },
}

function PropertySectionComponent({
  section,
  props,
  onChange,
}: {
  section: PropertySection
  props: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  const [isOpen, setIsOpen] = useState(true)
  const meta = SECTION_META[section]
  const Icon = meta.icon

  return (
    <div className="border-b border-builder-border-subtle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center gap-2 px-4 text-xs font-medium text-builder-text transition-colors hover:bg-builder-hover"
      >
        <Icon className="size-3.5 text-builder-text-muted" />
        <span className="flex-1 text-left">{meta.label}</span>
        <ChevronDown
          className={cn(
            "size-3 text-builder-text-muted transition-transform duration-200",
            !isOpen && "-rotate-90"
          )}
        />
      </button>

      {isOpen && (
        <div className="space-y-3 px-4 pb-4">
          <SectionFields
            section={section}
            props={props}
            onChange={onChange}
          />
        </div>
      )}
    </div>
  )
}

// ─── Section-specific fields ────────────────────────────────────────

function SectionFields({
  section,
  props,
  onChange,
}: {
  section: PropertySection
  props: Record<string, unknown>
  onChange: (key: string, value: unknown) => void
}) {
  switch (section) {
    case "content":
      return (
        <>
          {typeof props.title === "string" && (
            <FieldText
              label="Title"
              value={props.title as string}
              onChange={(v) => onChange("title", v)}
            />
          )}
          {typeof props.subtitle === "string" && (
            <FieldText
              label="Subtitle"
              value={props.subtitle as string}
              onChange={(v) => onChange("subtitle", v)}
            />
          )}
          {typeof props.text === "string" && (
            <FieldTextarea
              label="Text"
              value={props.text as string}
              onChange={(v) => onChange("text", v)}
            />
          )}
          {typeof props.quote === "string" && (
            <FieldTextarea
              label="Quote"
              value={props.quote as string}
              onChange={(v) => onChange("quote", v)}
            />
          )}
          {typeof props.author === "string" && (
            <FieldText
              label="Author"
              value={props.author as string}
              onChange={(v) => onChange("author", v)}
            />
          )}
          {typeof props.role === "string" && (
            <FieldText
              label="Role"
              value={props.role as string}
              onChange={(v) => onChange("role", v)}
            />
          )}
          {typeof props.planName === "string" && (
            <FieldText
              label="Plan Name"
              value={props.planName as string}
              onChange={(v) => onChange("planName", v)}
            />
          )}
          {typeof props.price === "string" && (
            <FieldText
              label="Price"
              value={props.price as string}
              onChange={(v) => onChange("price", v)}
            />
          )}
          {typeof props.period === "string" && (
            <FieldText
              label="Period"
              value={props.period as string}
              onChange={(v) => onChange("period", v)}
            />
          )}
          {typeof props.buttonText === "string" && (
            <FieldText
              label="Button Text"
              value={props.buttonText as string}
              onChange={(v) => onChange("buttonText", v)}
            />
          )}
          {typeof props.name === "string" && (
            <FieldText
              label="Name"
              value={props.name as string}
              onChange={(v) => onChange("name", v)}
            />
          )}
          {typeof props.description === "string" && (
            <FieldTextarea
              label="Description"
              value={props.description as string}
              onChange={(v) => onChange("description", v)}
            />
          )}
          {typeof props.invoiceNumber === "string" && (
            <FieldText
              label="Invoice Number"
              value={props.invoiceNumber as string}
              onChange={(v) => onChange("invoiceNumber", v)}
            />
          )}
          {typeof props.date === "string" && (
            <FieldText
              label="Date"
              value={props.date as string}
              onChange={(v) => onChange("date", v)}
            />
          )}
        </>
      )

    case "typography":
      return (
        <>
          {typeof props.fontSize !== "undefined" && (
            <FieldNumber
              label="Font Size"
              value={props.fontSize as number}
              onChange={(v) => onChange("fontSize", v)}
              min={8}
              max={72}
              suffix="px"
            />
          )}
          {typeof props.fontWeight !== "undefined" && (
            <FieldSelect
              label="Font Weight"
              value={props.fontWeight as string}
              onChange={(v) => onChange("fontWeight", v)}
              options={[
                { value: "300", label: "Light" },
                { value: "400", label: "Regular" },
                { value: "500", label: "Medium" },
                { value: "600", label: "Semibold" },
                { value: "700", label: "Bold" },
              ]}
            />
          )}
          {typeof props.lineHeight !== "undefined" && (
            <FieldNumber
              label="Line Height"
              value={props.lineHeight as number}
              onChange={(v) => onChange("lineHeight", v)}
              min={1}
              max={3}
              step={0.1}
            />
          )}
        </>
      )

    case "colors":
      return (
        <>
          {typeof props.color !== "undefined" && (
            <FieldColor
              label="Color"
              value={props.color as string}
              onChange={(v) => onChange("color", v)}
            />
          )}
          {typeof props.textColor !== "undefined" && (
            <FieldColor
              label="Text Color"
              value={props.textColor as string}
              onChange={(v) => onChange("textColor", v)}
            />
          )}
          {typeof props.buttonColor !== "undefined" && (
            <FieldColor
              label="Button Color"
              value={props.buttonColor as string}
              onChange={(v) => onChange("buttonColor", v)}
            />
          )}
          {typeof props.buttonTextColor !== "undefined" && (
            <FieldColor
              label="Button Text"
              value={props.buttonTextColor as string}
              onChange={(v) => onChange("buttonTextColor", v)}
            />
          )}
          {typeof props.iconColor !== "undefined" && (
            <FieldColor
              label="Icon Color"
              value={props.iconColor as string}
              onChange={(v) => onChange("iconColor", v)}
            />
          )}
          {typeof props.borderColor !== "undefined" && (
            <FieldColor
              label="Border Color"
              value={props.borderColor as string}
              onChange={(v) => onChange("borderColor", v)}
            />
          )}
        </>
      )

    case "background":
      return (
        <>
          {typeof props.backgroundColor !== "undefined" && (
            <FieldColor
              label="Background"
              value={props.backgroundColor as string}
              onChange={(v) => onChange("backgroundColor", v)}
            />
          )}
        </>
      )

    case "spacing":
      return (
        <>
          {typeof props.height !== "undefined" && (
            <FieldNumber
              label="Height"
              value={props.height as number}
              onChange={(v) => onChange("height", v)}
              min={0}
              max={200}
              suffix="px"
            />
          )}
          {typeof props.thickness !== "undefined" && (
            <FieldNumber
              label="Thickness"
              value={props.thickness as number}
              onChange={(v) => onChange("thickness", v)}
              min={1}
              max={10}
              suffix="px"
            />
          )}
          {typeof props.paddingTop !== "undefined" && (
            <FieldNumber
              label="Padding Top"
              value={props.paddingTop as number}
              onChange={(v) => onChange("paddingTop", v)}
              min={0}
              max={100}
              suffix="px"
            />
          )}
          {typeof props.paddingBottom !== "undefined" && (
            <FieldNumber
              label="Padding Bottom"
              value={props.paddingBottom as number}
              onChange={(v) => onChange("paddingBottom", v)}
              min={0}
              max={100}
              suffix="px"
            />
          )}
          {typeof props.paddingLeft !== "undefined" && (
            <FieldNumber
              label="Padding Left"
              value={props.paddingLeft as number}
              onChange={(v) => onChange("paddingLeft", v)}
              min={0}
              max={100}
              suffix="px"
            />
          )}
          {typeof props.paddingRight !== "undefined" && (
            <FieldNumber
              label="Padding Right"
              value={props.paddingRight as number}
              onChange={(v) => onChange("paddingRight", v)}
              min={0}
              max={100}
              suffix="px"
            />
          )}
          {typeof props.maxWidth !== "undefined" && (
            <FieldNumber
              label="Max Width"
              value={props.maxWidth as number}
              onChange={(v) => onChange("maxWidth", v)}
              min={200}
              max={800}
              suffix="px"
            />
          )}
        </>
      )

    case "borderRadius":
      return (
        <>
          {typeof props.borderRadius !== "undefined" && (
            <FieldNumber
              label="Radius"
              value={props.borderRadius as number}
              onChange={(v) => onChange("borderRadius", v)}
              min={0}
              max={50}
              suffix="px"
            />
          )}
        </>
      )

    case "alignment":
      return (
        <>
          {typeof props.alignment !== "undefined" && (
            <FieldSegment
              label="Alignment"
              value={props.alignment as string}
              onChange={(v) => onChange("alignment", v)}
              options={[
                { value: "left", label: "Left" },
                { value: "center", label: "Center" },
                { value: "right", label: "Right" },
              ]}
            />
          )}
        </>
      )

    case "buttonLink":
      return (
        <>
          {typeof props.url !== "undefined" && (
            <FieldText
              label="URL"
              value={props.url as string}
              onChange={(v) => onChange("url", v)}
              placeholder="https://..."
            />
          )}
          {typeof props.buttonUrl !== "undefined" && (
            <FieldText
              label="Button URL"
              value={props.buttonUrl as string}
              onChange={(v) => onChange("buttonUrl", v)}
              placeholder="https://..."
            />
          )}
        </>
      )

    case "images":
      return (
        <>
          {typeof props.src !== "undefined" && (
            <FieldText
              label="Image URL"
              value={props.src as string}
              onChange={(v) => onChange("src", v)}
              placeholder="https://..."
            />
          )}
          {typeof props.imageSrc !== "undefined" && (
            <FieldText
              label="Image URL"
              value={props.imageSrc as string}
              onChange={(v) => onChange("imageSrc", v)}
              placeholder="https://..."
            />
          )}
          {typeof props.alt !== "undefined" && (
            <FieldText
              label="Alt Text"
              value={props.alt as string}
              onChange={(v) => onChange("alt", v)}
            />
          )}
          {typeof props.width !== "undefined" &&
            typeof props.width === "number" && (
              <FieldNumber
                label="Width"
                value={props.width as number}
                onChange={(v) => onChange("width", v)}
                min={20}
                max={800}
                suffix="px"
              />
            )}
        </>
      )

    case "visibility":
      return (
        <div className="flex items-center justify-between">
          <span className="text-xs text-builder-text-secondary">Visible</span>
          <button
            type="button"
            className="rounded-md bg-builder-sidebar px-3 py-1 text-xs font-medium text-builder-text"
          >
            Toggle
          </button>
        </div>
      )

    default:
      return null
  }
}

// ─── Field Components ───────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-medium text-builder-text-secondary mb-1.5">
      {children}
    </label>
  )
}

function FieldText({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 w-full rounded-md border border-builder-border bg-white px-2.5 text-xs text-builder-text outline-none transition-colors focus:border-builder-accent focus:ring-1 focus:ring-builder-accent/20"
      />
    </div>
  )
}

function FieldTextarea({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-md border border-builder-border bg-white px-2.5 py-2 text-xs text-builder-text outline-none transition-colors focus:border-builder-accent focus:ring-1 focus:ring-builder-accent/20"
      />
    </div>
  )
}

function FieldNumber({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  suffix?: string
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <input
          type="range"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="h-1.5 flex-1 cursor-pointer appearance-none rounded-full bg-builder-border accent-builder-accent [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-builder-accent [&::-webkit-slider-thumb]:shadow-sm"
        />
        <span className="w-12 text-right text-[11px] font-mono text-builder-text-secondary">
          {step < 1 ? value.toFixed(1) : value}
          {suffix || ""}
        </span>
      </div>
    </div>
  )
}

function FieldColor({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-8 cursor-pointer appearance-none rounded-md border border-builder-border bg-transparent p-0.5 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch-wrapper]:p-0"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 flex-1 rounded-md border border-builder-border bg-white px-2.5 font-mono text-[11px] text-builder-text outline-none transition-colors focus:border-builder-accent focus:ring-1 focus:ring-builder-accent/20"
        />
      </div>
    </div>
  )
}

function FieldSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-full appearance-none rounded-md border border-builder-border bg-white px-2.5 text-xs text-builder-text outline-none transition-colors focus:border-builder-accent focus:ring-1 focus:ring-builder-accent/20"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function FieldSegment({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="flex rounded-md border border-builder-border bg-builder-sidebar p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "flex-1 rounded-[5px] py-1.5 text-[11px] font-medium transition-all",
              value === opt.value
                ? "bg-white text-builder-text shadow-sm"
                : "text-builder-text-muted hover:text-builder-text-secondary"
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
