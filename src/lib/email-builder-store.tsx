"use client"

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from "react"
import {
  type BlockInstance,
  type BlockType,
  createBlockInstance,
} from "mail/lib/block-registry"

// ─── State Shape ────────────────────────────────────────────────────
export interface EmailBuilderState {
  blocks: BlockInstance[]
  selectedBlockId: string | null
  hoveredBlockId: string | null
  dragState: {
    isDragging: boolean
    blockType: BlockType | null
    sourceId: string | null // null = from sidebar, string = reorder
    dropIndex: number | null
  }
  viewMode: "desktop" | "mobile"
  isPreviewOpen: boolean
  history: {
    past: BlockInstance[][]
    future: BlockInstance[][]
  }
}

const initialState: EmailBuilderState = {
  blocks: [],
  selectedBlockId: null,
  hoveredBlockId: null,
  dragState: {
    isDragging: false,
    blockType: null,
    sourceId: null,
    dropIndex: null,
  },
  viewMode: "desktop",
  isPreviewOpen: false,
  history: {
    past: [],
    future: [],
  },
}

// ─── Actions ────────────────────────────────────────────────────────
type Action =
  | { type: "ADD_BLOCK"; blockType: BlockType; index?: number }
  | { type: "REMOVE_BLOCK"; id: string }
  | { type: "DUPLICATE_BLOCK"; id: string }
  | { type: "MOVE_BLOCK"; id: string; direction: "up" | "down" }
  | { type: "UPDATE_BLOCK_PROPS"; id: string; props: Record<string, unknown> }
  | { type: "TOGGLE_VISIBILITY"; id: string }
  | { type: "SELECT_BLOCK"; id: string | null }
  | { type: "HOVER_BLOCK"; id: string | null }
  | {
      type: "SET_DRAG_STATE"
      dragState: Partial<EmailBuilderState["dragState"]>
    }
  | { type: "SET_VIEW_MODE"; mode: "desktop" | "mobile" }
  | { type: "UNDO" }
  | { type: "REDO" }
  | { type: "REORDER_BLOCK"; sourceIndex: number; targetIndex: number }
  | { type: "SET_PREVIEW"; open: boolean }

// ─── Helpers ────────────────────────────────────────────────────────
function pushHistory(
  state: EmailBuilderState
): EmailBuilderState["history"] {
  return {
    past: [...state.history.past.slice(-49), [...state.blocks]],
    future: [],
  }
}

// ─── Reducer ────────────────────────────────────────────────────────
function emailBuilderReducer(
  state: EmailBuilderState,
  action: Action
): EmailBuilderState {
  switch (action.type) {
    case "ADD_BLOCK": {
      const newBlock = createBlockInstance(action.blockType)
      const history = pushHistory(state)
      const blocks = [...state.blocks]
      const idx =
        action.index !== undefined ? action.index : blocks.length
      blocks.splice(idx, 0, newBlock)
      return {
        ...state,
        blocks,
        selectedBlockId: newBlock.id,
        history,
        dragState: { ...initialState.dragState },
      }
    }

    case "REMOVE_BLOCK": {
      const history = pushHistory(state)
      return {
        ...state,
        blocks: state.blocks.filter((b) => b.id !== action.id),
        selectedBlockId:
          state.selectedBlockId === action.id
            ? null
            : state.selectedBlockId,
        history,
      }
    }

    case "DUPLICATE_BLOCK": {
      const history = pushHistory(state)
      const idx = state.blocks.findIndex((b) => b.id === action.id)
      if (idx === -1) return state
      const source = state.blocks[idx]
      const duplicate: BlockInstance = {
        ...source,
        id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        props: { ...source.props },
      }
      const blocks = [...state.blocks]
      blocks.splice(idx + 1, 0, duplicate)
      return {
        ...state,
        blocks,
        selectedBlockId: duplicate.id,
        history,
      }
    }

    case "MOVE_BLOCK": {
      const history = pushHistory(state)
      const idx = state.blocks.findIndex((b) => b.id === action.id)
      if (idx === -1) return state
      const newIdx =
        action.direction === "up" ? idx - 1 : idx + 1
      if (newIdx < 0 || newIdx >= state.blocks.length) return state
      const blocks = [...state.blocks]
      const [moved] = blocks.splice(idx, 1)
      blocks.splice(newIdx, 0, moved)
      return { ...state, blocks, history }
    }

    case "REORDER_BLOCK": {
      const history = pushHistory(state)
      const blocks = [...state.blocks]
      const [moved] = blocks.splice(action.sourceIndex, 1)
      blocks.splice(action.targetIndex, 0, moved)
      return {
        ...state,
        blocks,
        history,
        dragState: { ...initialState.dragState },
      }
    }

    case "UPDATE_BLOCK_PROPS": {
      const history = pushHistory(state)
      return {
        ...state,
        blocks: state.blocks.map((b) =>
          b.id === action.id
            ? { ...b, props: { ...b.props, ...action.props } }
            : b
        ),
        history,
      }
    }

    case "TOGGLE_VISIBILITY": {
      const history = pushHistory(state)
      return {
        ...state,
        blocks: state.blocks.map((b) =>
          b.id === action.id ? { ...b, hidden: !b.hidden } : b
        ),
        history,
      }
    }

    case "SELECT_BLOCK":
      return { ...state, selectedBlockId: action.id }

    case "HOVER_BLOCK":
      return { ...state, hoveredBlockId: action.id }

    case "SET_DRAG_STATE":
      return {
        ...state,
        dragState: { ...state.dragState, ...action.dragState },
      }

    case "SET_VIEW_MODE":
      return { ...state, viewMode: action.mode }

    case "SET_PREVIEW":
      return { ...state, isPreviewOpen: action.open }

    case "UNDO": {
      if (state.history.past.length === 0) return state
      const past = [...state.history.past]
      const previous = past.pop()!
      return {
        ...state,
        blocks: previous,
        selectedBlockId: null,
        history: {
          past,
          future: [state.blocks, ...state.history.future],
        },
      }
    }

    case "REDO": {
      if (state.history.future.length === 0) return state
      const future = [...state.history.future]
      const next = future.shift()!
      return {
        ...state,
        blocks: next,
        selectedBlockId: null,
        history: {
          past: [...state.history.past, state.blocks],
          future,
        },
      }
    }

    default:
      return state
  }
}

// ─── Context ────────────────────────────────────────────────────────
interface EmailBuilderContextValue {
  state: EmailBuilderState
  dispatch: React.Dispatch<Action>
  // Convenience methods
  addBlock: (blockType: BlockType, index?: number) => void
  removeBlock: (id: string) => void
  duplicateBlock: (id: string) => void
  moveBlock: (id: string, direction: "up" | "down") => void
  updateBlockProps: (id: string, props: Record<string, unknown>) => void
  toggleVisibility: (id: string) => void
  selectBlock: (id: string | null) => void
  hoverBlock: (id: string | null) => void
  setViewMode: (mode: "desktop" | "mobile") => void
  togglePreview: () => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  selectedBlock: BlockInstance | null
}

const EmailBuilderContext = createContext<EmailBuilderContextValue | null>(
  null
)

// ─── Provider ───────────────────────────────────────────────────────
export function EmailBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(emailBuilderReducer, initialState)

  const addBlock = useCallback(
    (blockType: BlockType, index?: number) =>
      dispatch({ type: "ADD_BLOCK", blockType, index }),
    []
  )

  const removeBlock = useCallback(
    (id: string) => dispatch({ type: "REMOVE_BLOCK", id }),
    []
  )

  const duplicateBlock = useCallback(
    (id: string) => dispatch({ type: "DUPLICATE_BLOCK", id }),
    []
  )

  const moveBlock = useCallback(
    (id: string, direction: "up" | "down") =>
      dispatch({ type: "MOVE_BLOCK", id, direction }),
    []
  )

  const updateBlockProps = useCallback(
    (id: string, props: Record<string, unknown>) =>
      dispatch({ type: "UPDATE_BLOCK_PROPS", id, props }),
    []
  )

  const toggleVisibility = useCallback(
    (id: string) => dispatch({ type: "TOGGLE_VISIBILITY", id }),
    []
  )

  const selectBlock = useCallback(
    (id: string | null) => dispatch({ type: "SELECT_BLOCK", id }),
    []
  )

  const hoverBlock = useCallback(
    (id: string | null) => dispatch({ type: "HOVER_BLOCK", id }),
    []
  )

  const setViewMode = useCallback(
    (mode: "desktop" | "mobile") =>
      dispatch({ type: "SET_VIEW_MODE", mode }),
    []
  )

  const undo = useCallback(() => dispatch({ type: "UNDO" }), [])
  const redo = useCallback(() => dispatch({ type: "REDO" }), [])

  const togglePreview = useCallback(
    () =>
      dispatch({ type: "SET_PREVIEW", open: !state.isPreviewOpen }),
    [state.isPreviewOpen]
  )

  const canUndo = state.history.past.length > 0
  const canRedo = state.history.future.length > 0

  const selectedBlock =
    state.blocks.find((b) => b.id === state.selectedBlockId) ?? null

  return (
    <EmailBuilderContext.Provider
      value={{
        state,
        dispatch,
        addBlock,
        removeBlock,
        duplicateBlock,
        moveBlock,
        updateBlockProps,
        toggleVisibility,
        selectBlock,
        hoverBlock,
        setViewMode,
        togglePreview,
        undo,
        redo,
        canUndo,
        canRedo,
        selectedBlock,
      }}
    >
      {children}
    </EmailBuilderContext.Provider>
  )
}

// ─── Hook ───────────────────────────────────────────────────────────
export function useEmailBuilder() {
  const ctx = useContext(EmailBuilderContext)
  if (!ctx) {
    throw new Error(
      "useEmailBuilder must be used within an EmailBuilderProvider"
    )
  }
  return ctx
}
