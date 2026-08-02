"use client"

import { EmailBuilderProvider } from "mail/lib/email-builder-store"
import { BuilderToolbar } from "mail/components/custom/builder-toolbar"
import { BlockSidebar } from "mail/components/custom/block-sidebar"
import { EmailCanvas } from "mail/components/custom/email-canvas"
import { PropertiesPanel } from "mail/components/custom/properties-panel"
import { EmailPreview } from "mail/components/custom/email-preview"

export default function BuilderPage() {
  return (
    <EmailBuilderProvider>
      <div className="flex h-screen flex-col overflow-hidden bg-white">
        {/* Top Toolbar */}
        <BuilderToolbar />

        {/* Three-column layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar – Components */}
          <BlockSidebar />

          {/* Center – Email Canvas */}
          <EmailCanvas />

          {/* Right Sidebar – Properties */}
          <PropertiesPanel />
        </div>

        {/* Preview overlay */}
        <EmailPreview />
      </div>
    </EmailBuilderProvider>
  )
}