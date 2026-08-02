import {
  Layout,
  Box,
  Minus,
  SeparatorHorizontal,
  Type,
  Image,
  Heading1,
  AlignLeft,
  MousePointerClick,
  Grid3X3,
  MessageSquareQuote,
  DollarSign,
  HelpCircle,
  ShoppingBag,
  ClipboardList,
  FileText,
  Share2,
  PanelBottom,
  Sparkles,
  Globe,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

// ─── Block Categories ──────────────────────────────────────────────
export type BlockCategory =
  | "layout"
  | "content"
  | "marketing"
  | "ecommerce"
  | "footer"

export const BLOCK_CATEGORIES: { id: BlockCategory; label: string }[] = [
  { id: "layout", label: "Layout" },
  { id: "content", label: "Content" },
  { id: "marketing", label: "Marketing" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "footer", label: "Footer" },
]

// ─── Property Sections ─────────────────────────────────────────────
export type PropertySection =
  | "content"
  | "typography"
  | "colors"
  | "background"
  | "spacing"
  | "borderRadius"
  | "alignment"
  | "buttonLink"
  | "images"
  | "visibility"

// ─── Block Type ─────────────────────────────────────────────────────
export type BlockType =
  | "section"
  | "container"
  | "spacer"
  | "divider"
  | "header"
  | "logo"
  | "hero"
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "feature-grid"
  | "testimonial"
  | "pricing"
  | "faq"
  | "product-card"
  | "order-summary"
  | "invoice"
  | "social-links"
  | "footer"

// ─── Block Definition ──────────────────────────────────────────────
export interface BlockDefinition {
  type: BlockType
  label: string
  icon: LucideIcon
  category: BlockCategory
  propertySections: PropertySection[]
  defaultProps: Record<string, unknown>
}

// ─── Block Instance (on canvas) ─────────────────────────────────────
export interface BlockInstance {
  id: string
  type: BlockType
  props: Record<string, unknown>
  hidden: boolean
}

// ─── Registry ──────────────────────────────────────────────────────
export const BLOCK_REGISTRY: BlockDefinition[] = [
  // Layout
  {
    type: "section",
    label: "Section",
    icon: Layout,
    category: "layout",
    propertySections: ["background", "spacing", "borderRadius"],
    defaultProps: {
      backgroundColor: "#ffffff",
      paddingTop: 24,
      paddingBottom: 24,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 0,
    },
  },
  {
    type: "container",
    label: "Container",
    icon: Box,
    category: "layout",
    propertySections: ["background", "spacing", "borderRadius", "alignment"],
    defaultProps: {
      backgroundColor: "#ffffff",
      maxWidth: 600,
      paddingTop: 16,
      paddingBottom: 16,
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 8,
      alignment: "center",
    },
  },
  {
    type: "spacer",
    label: "Spacer",
    icon: Minus,
    category: "layout",
    propertySections: ["spacing"],
    defaultProps: { height: 32 },
  },
  {
    type: "divider",
    label: "Divider",
    icon: SeparatorHorizontal,
    category: "layout",
    propertySections: ["colors", "spacing"],
    defaultProps: {
      color: "#e4e4e7",
      thickness: 1,
      style: "solid",
      paddingTop: 16,
      paddingBottom: 16,
    },
  },

  // Content
  {
    type: "header",
    label: "Header",
    icon: Globe,
    category: "content",
    propertySections: ["content", "typography", "colors", "background", "spacing", "alignment"],
    defaultProps: {
      title: "Company Name",
      subtitle: "",
      backgroundColor: "#ffffff",
      textColor: "#18181b",
      fontSize: 20,
      fontWeight: "700",
      paddingTop: 20,
      paddingBottom: 20,
      alignment: "center",
    },
  },
  {
    type: "logo",
    label: "Logo",
    icon: Sparkles,
    category: "content",
    propertySections: ["images", "spacing", "alignment"],
    defaultProps: {
      src: "",
      alt: "Logo",
      width: 120,
      height: 40,
      alignment: "center",
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  {
    type: "hero",
    label: "Hero",
    icon: Image,
    category: "content",
    propertySections: ["content", "images", "typography", "colors", "background", "spacing", "alignment", "buttonLink"],
    defaultProps: {
      title: "Welcome to our Newsletter",
      subtitle: "Stay updated with the latest news and updates.",
      buttonText: "Get Started",
      buttonUrl: "#",
      imageSrc: "",
      backgroundColor: "#f4f4f5",
      textColor: "#18181b",
      buttonColor: "#18181b",
      buttonTextColor: "#ffffff",
      paddingTop: 48,
      paddingBottom: 48,
      alignment: "center",
    },
  },
  {
    type: "heading",
    label: "Heading",
    icon: Heading1,
    category: "content",
    propertySections: ["content", "typography", "colors", "spacing", "alignment"],
    defaultProps: {
      text: "Heading Text",
      level: "h2",
      fontSize: 24,
      fontWeight: "700",
      color: "#18181b",
      alignment: "left",
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  {
    type: "paragraph",
    label: "Paragraph",
    icon: AlignLeft,
    category: "content",
    propertySections: ["content", "typography", "colors", "spacing", "alignment"],
    defaultProps: {
      text: "This is a paragraph of text. You can edit it to add your own content.",
      fontSize: 15,
      fontWeight: "400",
      lineHeight: 1.6,
      color: "#52525b",
      alignment: "left",
      paddingTop: 4,
      paddingBottom: 4,
    },
  },
  {
    type: "image",
    label: "Image",
    icon: Image,
    category: "content",
    propertySections: ["images", "spacing", "borderRadius", "alignment"],
    defaultProps: {
      src: "",
      alt: "Image",
      width: "100%",
      borderRadius: 8,
      alignment: "center",
      paddingTop: 8,
      paddingBottom: 8,
    },
  },
  {
    type: "button",
    label: "Button",
    icon: MousePointerClick,
    category: "content",
    propertySections: ["content", "typography", "colors", "spacing", "borderRadius", "alignment", "buttonLink"],
    defaultProps: {
      text: "Click Me",
      url: "#",
      backgroundColor: "#18181b",
      textColor: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
      paddingTop: 12,
      paddingBottom: 12,
      paddingLeft: 24,
      paddingRight: 24,
      borderRadius: 6,
      alignment: "center",
    },
  },

  // Marketing
  {
    type: "feature-grid",
    label: "Feature Grid",
    icon: Grid3X3,
    category: "marketing",
    propertySections: ["content", "typography", "colors", "background", "spacing"],
    defaultProps: {
      features: [
        { title: "Fast", description: "Lightning fast performance" },
        { title: "Secure", description: "Enterprise-grade security" },
        { title: "Scalable", description: "Grows with your needs" },
      ],
      columns: 3,
      backgroundColor: "#ffffff",
      textColor: "#18181b",
      paddingTop: 32,
      paddingBottom: 32,
    },
  },
  {
    type: "testimonial",
    label: "Testimonial",
    icon: MessageSquareQuote,
    category: "marketing",
    propertySections: ["content", "typography", "colors", "background", "spacing", "borderRadius"],
    defaultProps: {
      quote: "This product has completely transformed our workflow.",
      author: "Jane Doe",
      role: "CEO at Company",
      backgroundColor: "#f4f4f5",
      textColor: "#18181b",
      paddingTop: 32,
      paddingBottom: 32,
      borderRadius: 8,
    },
  },
  {
    type: "pricing",
    label: "Pricing",
    icon: DollarSign,
    category: "marketing",
    propertySections: ["content", "typography", "colors", "background", "spacing", "borderRadius", "buttonLink"],
    defaultProps: {
      planName: "Pro",
      price: "$29",
      period: "/month",
      features: ["Unlimited projects", "Priority support", "Advanced analytics"],
      buttonText: "Subscribe",
      buttonUrl: "#",
      backgroundColor: "#ffffff",
      borderColor: "#e4e4e7",
      paddingTop: 32,
      paddingBottom: 32,
      borderRadius: 12,
    },
  },
  {
    type: "faq",
    label: "FAQ",
    icon: HelpCircle,
    category: "marketing",
    propertySections: ["content", "typography", "colors", "background", "spacing"],
    defaultProps: {
      items: [
        { question: "What is this product?", answer: "A powerful email builder for developers." },
        { question: "How does pricing work?", answer: "Simple monthly subscription with no hidden fees." },
      ],
      backgroundColor: "#ffffff",
      textColor: "#18181b",
      paddingTop: 24,
      paddingBottom: 24,
    },
  },

  // Ecommerce
  {
    type: "product-card",
    label: "Product Card",
    icon: ShoppingBag,
    category: "ecommerce",
    propertySections: ["content", "images", "typography", "colors", "background", "spacing", "borderRadius", "buttonLink"],
    defaultProps: {
      name: "Product Name",
      price: "$49.99",
      description: "A brief description of the product.",
      imageSrc: "",
      buttonText: "Buy Now",
      buttonUrl: "#",
      backgroundColor: "#ffffff",
      borderRadius: 12,
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  {
    type: "order-summary",
    label: "Order Summary",
    icon: ClipboardList,
    category: "ecommerce",
    propertySections: ["content", "typography", "colors", "background", "spacing", "borderRadius"],
    defaultProps: {
      items: [
        { name: "Item 1", quantity: 1, price: "$29.99" },
        { name: "Item 2", quantity: 2, price: "$14.99" },
      ],
      total: "$59.97",
      backgroundColor: "#ffffff",
      borderRadius: 8,
      paddingTop: 24,
      paddingBottom: 24,
    },
  },
  {
    type: "invoice",
    label: "Invoice",
    icon: FileText,
    category: "ecommerce",
    propertySections: ["content", "typography", "colors", "background", "spacing"],
    defaultProps: {
      invoiceNumber: "INV-001",
      date: "2024-01-15",
      items: [
        { description: "Service A", amount: "$100.00" },
        { description: "Service B", amount: "$200.00" },
      ],
      total: "$300.00",
      backgroundColor: "#ffffff",
      paddingTop: 24,
      paddingBottom: 24,
    },
  },

  // Footer
  {
    type: "social-links",
    label: "Social Links",
    icon: Share2,
    category: "footer",
    propertySections: ["content", "colors", "spacing", "alignment"],
    defaultProps: {
      links: [
        { platform: "twitter", url: "#" },
        { platform: "linkedin", url: "#" },
        { platform: "github", url: "#" },
      ],
      iconColor: "#71717a",
      alignment: "center",
      paddingTop: 16,
      paddingBottom: 16,
    },
  },
  {
    type: "footer",
    label: "Footer",
    icon: PanelBottom,
    category: "footer",
    propertySections: ["content", "typography", "colors", "background", "spacing", "alignment"],
    defaultProps: {
      text: "© 2024 Company. All rights reserved.",
      links: [
        { label: "Unsubscribe", url: "#" },
        { label: "Privacy Policy", url: "#" },
      ],
      backgroundColor: "#f4f4f5",
      textColor: "#71717a",
      fontSize: 12,
      alignment: "center",
      paddingTop: 24,
      paddingBottom: 24,
    },
  },
]

// ─── Helpers ────────────────────────────────────────────────────────
export function getBlockDefinition(type: BlockType): BlockDefinition {
  const def = BLOCK_REGISTRY.find((b) => b.type === type)
  if (!def) throw new Error(`Unknown block type: ${type}`)
  return def
}

export function getBlocksByCategory(category: BlockCategory): BlockDefinition[] {
  return BLOCK_REGISTRY.filter((b) => b.category === category)
}

export function createBlockInstance(type: BlockType): BlockInstance {
  const def = getBlockDefinition(type)
  return {
    id: `block_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    type,
    props: { ...def.defaultProps },
    hidden: false,
  }
}
