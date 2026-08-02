"use client"

import { useState, useCallback } from "react"
import { Search, ChevronDown } from "lucide-react"
import {
  BLOCK_CATEGORIES,
  BLOCK_REGISTRY,
  type BlockCategory,
  type BlockDefinition,
  type BlockType,
} from "mail/lib/block-registry"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import { cn } from "mail/lib/utils"

export function BlockSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [collapsedCategories, setCollapsedCategories] = useState<
    Set<BlockCategory>
  >(new Set())
  const { dispatch, addBlock } = useEmailBuilder()

  const toggleCategory = useCallback((cat: BlockCategory) => {
    setCollapsedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }, [])

  const filteredBlocks = searchQuery.trim()
    ? BLOCK_REGISTRY.filter((b) =>
        b.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null

  const handleDragStart = useCallback(
    (e: React.DragEvent, blockType: BlockType) => {
      e.dataTransfer.setData("application/mailui-block-type", blockType)
      e.dataTransfer.effectAllowed = "copy"
      dispatch({
        type: "SET_DRAG_STATE",
        dragState: {
          isDragging: true,
          blockType,
          sourceId: null,
        },
      })
    },
    [dispatch]
  )

  const handleDragEnd = useCallback(() => {
    dispatch({
      type: "SET_DRAG_STATE",
      dragState: {
        isDragging: false,
        blockType: null,
        sourceId: null,
        dropIndex: null,
      },
    })
  }, [dispatch])

  return (
    <aside className="flex w-[var(--builder-panel-width-left)] shrink-0 flex-col border-r border-builder-border bg-white">
      {/* Header */}
      <div className="flex h-12 shrink-0 items-center border-b border-builder-border px-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-builder-text-muted">
          Components
        </h2>
      </div>

      {/* Search */}
      <div className="shrink-0 px-3 pt-3 pb-2">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-builder-text-muted" />
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-md border border-builder-border bg-builder-sidebar pl-9 pr-3 text-xs text-builder-text placeholder:text-builder-text-muted outline-none transition-colors focus:border-builder-accent focus:ring-1 focus:ring-builder-accent/20"
          />
        </div>
      </div>

      {/* Block list */}
      <div className="builder-panel flex-1 overflow-y-auto px-3 pb-3">
        {filteredBlocks ? (
          /* Search results */
          <div className="space-y-1 pt-1">
            {filteredBlocks.length === 0 && (
              <p className="py-8 text-center text-xs text-builder-text-muted">
                No blocks found
              </p>
            )}
            {filteredBlocks.map((block) => (
              <BlockItem
                key={block.type}
                block={block}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onClick={() => addBlock(block.type)}
              />
            ))}
          </div>
        ) : (
          /* Categorised list */
          <div className="space-y-1 pt-1">
            {BLOCK_CATEGORIES.map((cat) => {
              const blocks = BLOCK_REGISTRY.filter(
                (b) => b.category === cat.id
              )
              const isCollapsed = collapsedCategories.has(cat.id)

              return (
                <div key={cat.id}>
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className="flex h-8 w-full items-center gap-2 rounded-md px-2 text-xs font-semibold uppercase tracking-wider text-builder-text-muted transition-colors hover:bg-builder-hover hover:text-builder-text-secondary"
                  >
                    <ChevronDown
                      className={cn(
                        "size-3 transition-transform duration-200",
                        isCollapsed && "-rotate-90"
                      )}
                    />
                    {cat.label}
                    <span className="ml-auto text-[10px] font-normal text-builder-text-muted">
                      {blocks.length}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="grid grid-cols-2 gap-1 pb-2 pl-1">
                      {blocks.map((block) => (
                        <BlockItem
                          key={block.type}
                          block={block}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          onClick={() => addBlock(block.type)}
                          compact
                        />
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}

// ─── Block Item ─────────────────────────────────────────────────────

function BlockItem({
  block,
  onDragStart,
  onDragEnd,
  onClick,
  compact,
}: {
  block: BlockDefinition
  onDragStart: (e: React.DragEvent, type: BlockType) => void
  onDragEnd: () => void
  onClick: () => void
  compact?: boolean
}) {
  const Icon = block.icon

  if (compact) {
    return (
      <div
        draggable
        onDragStart={(e) => onDragStart(e, block.type)}
        onDragEnd={onDragEnd}
        onClick={onClick}
        className="flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border border-transparent p-2.5 text-builder-text-secondary transition-all hover:border-builder-border hover:bg-builder-hover hover:text-builder-text hover:shadow-sm active:scale-95"
      >
        <Icon className="size-4" />
        <span className="text-[10px] font-medium leading-none">
          {block.label}
        </span>
      </div>
    )
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, block.type)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-transparent px-2.5 py-2 text-builder-text-secondary transition-all hover:border-builder-border hover:bg-builder-hover hover:text-builder-text hover:shadow-sm active:scale-95"
    >
      <Icon className="size-4 shrink-0" />
      <span className="text-xs font-medium">{block.label}</span>
    </div>
  )
}
