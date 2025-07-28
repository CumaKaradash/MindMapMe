"use client"

import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, Maximize } from "lucide-react"

interface CanvasControlsProps {
  onZoomIn: () => void
  onZoomOut: () => void
  onResetView: () => void
  scale: number
}

export function CanvasControls({ onZoomIn, onZoomOut, onResetView, scale }: CanvasControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
      <Button variant="ghost" size="sm" onClick={onZoomIn} disabled={scale >= 3}>
        <ZoomIn className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={onZoomOut} disabled={scale <= 0.1}>
        <ZoomOut className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="sm" onClick={onResetView}>
        <Maximize className="h-4 w-4" />
      </Button>

      <div className="text-xs text-center text-muted-foreground px-2">{Math.round(scale * 100)}%</div>
    </div>
  )
}
