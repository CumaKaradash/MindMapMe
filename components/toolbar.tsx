"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Plus, Save, Download, Trash2, Brain, Lightbulb } from "lucide-react"

interface ToolbarProps {
  onAddNode: () => void
  onClear: () => void
  onSave: () => void
  onExport: () => void
}

export function Toolbar({ onAddNode, onClear, onSave, onExport }: ToolbarProps) {
  return (
    <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg p-2 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 px-2">
        <Brain className="h-5 w-5 text-primary" />
        <span className="font-semibold text-sm">MindMapMe</span>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Actions */}
      <Button variant="ghost" size="sm" onClick={onAddNode} className="gap-2">
        <Plus className="h-4 w-4" />
        Düşünce Ekle
      </Button>

      <Button variant="ghost" size="sm" onClick={onSave} className="gap-2">
        <Save className="h-4 w-4" />
        Kaydet
      </Button>

      <Button variant="ghost" size="sm" onClick={onExport} className="gap-2">
        <Download className="h-4 w-4" />
        Dışa Aktar
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <Button variant="ghost" size="sm" onClick={onClear} className="gap-2 text-destructive hover:text-destructive">
        <Trash2 className="h-4 w-4" />
        Temizle
      </Button>

      <Separator orientation="vertical" className="h-6" />

      <ThemeToggle />

      {/* Inspiration */}
      <div className="flex items-center gap-1 px-2 text-xs text-muted-foreground">
        <Lightbulb className="h-3 w-3" />
        <span>Düşün, Bağla, Keşfet</span>
      </div>
    </div>
  )
}
