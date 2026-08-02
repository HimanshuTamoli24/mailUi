"use client"

import { useCallback, useState } from "react"
import { LayoutTemplate } from "lucide-react"
import { useEmailBuilder } from "mail/lib/email-builder-store"
import { type BlockType } from "mail/lib/block-registry"
import { CanvasBlock } from "mail/components/custom/canvas-block"
import { cn } from "mail/lib/utils"

export function EmailCanvas() {
  const { state, addBlock, selectBlock, dispatch } = useEmailBuilder()
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.dataTransfer.dropEffect = "copy"

      // Calculate drop index based on mouse position
      const canvas = e.currentTarget as HTMLElement
      const blocks = canvas.querySelectorAll("[data-block-index]")
      let index = state.blocks.length

      for (let i = 0; i < blocks.length; i++) {
        const rect = blocks[i].getBoundingClientRect()
        const midY = rect.top + rect.height / 2
        if (e.clientY < midY) {
          index = i
          break
        }
      }

      setDropIndex(index)
    },
    [state.blocks.length]
  )

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    // Only clear if we're leaving the canvas, not entering a child
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setDropIndex(null)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const blockType = e.dataTransfer.getData(
        "application/mailui-block-type"
      ) as BlockType

      if (blockType) {
        addBlock(blockType, dropIndex ?? undefined)
      }

      setDropIndex(null)
      dispatch({
        type: "SET_DRAG_STATE",
        dragState: {
          isDragging: false,
          blockType: null,
          sourceId: null,
          dropIndex: null,
        },
      })
    },
    [addBlock, dispatch, dropIndex]
  )

  const handleCanvasClick = useCallback(() => {
    selectBlock(null)
  }, [selectBlock])

  const canvasWidth =
    state.viewMode === "desktop" ? "640px" : "375px"

  return (
    <div
      className="flex flex-1 flex-col items-center overflow-auto bg-builder-workspace p-8 h-full"
      onClick={handleCanvasClick}
    >
      {/* Canvas container */}
      <div
        className={cn(
          "canvas-viewport relative mx-auto  rounded-lg bg-builder-canvas shadow-sm",
          "border border-builder-border"
        )}
        style={{ width: canvasWidth, maxWidth: "100%" }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {state.blocks.length === 0 ? (
          /* Empty state */
          <div className="flex h-full min-h-[600px] flex-col items-center justify-center gap-4 p-8">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-builder-sidebar">
              <LayoutTemplate className="size-7 text-builder-text-muted" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-medium text-builder-text">
                Start building your email
              </h3>
              <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-builder-text-muted">
                Drag and drop components from the left panel to start
                composing your email template.
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 rounded-full border border-dashed border-builder-border px-4 py-2">
              <div className="size-1.5 animate-pulse rounded-full bg-builder-accent" />
              <span className="text-[11px] font-medium text-builder-text-muted">
                Drop components here
              </span>
            </div>
          </div>
        ) : (
          /* Blocks */
          <div className="relative  ">
            {state.blocks.map((block, index) => (
              <div key={block.id} data-block-index={index} className="relative">
                {/* Drop indicator before this block */}
                {dropIndex === index && (
                  <div className="drop-indicator relative z-10 mx-4 h-0.5 rounded-full bg-builder-accent">
                    <div className="absolute -left-1 -top-[3px] size-2 rounded-full bg-builder-accent" />
                    <div className="absolute -right-1 -top-[3px] size-2 rounded-full bg-builder-accent" />
                  </div>
                )}

                <CanvasBlock
                  block={block}
                  index={index}
                  isFirst={index === 0}
                  isLast={index === state.blocks.length - 1}
                />
              </div>
            ))}

            {/* Drop indicator at the end */}
            {dropIndex === state.blocks.length && (
              <div className="drop-indicator relative z-10 mx-4 h-0.5 rounded-full bg-builder-accent">
                <div className="absolute -left-1 -top-[3px] size-2 rounded-full bg-builder-accent" />
                <div className="absolute -right-1 -top-[3px] size-2 rounded-full bg-builder-accent" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
