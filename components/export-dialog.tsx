"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileJson, ImageIcon } from "lucide-react"
import type { MindMapNode, MindMapEdge } from "@/types/mindmap"
import { useToast } from "@/hooks/use-toast"

interface ExportDialogProps {
  isOpen: boolean
  onClose: () => void
  nodes: MindMapNode[]
  edges: MindMapEdge[]
}

export function ExportDialog({ isOpen, onClose, nodes, edges }: ExportDialogProps) {
  const [exportFormat, setExportFormat] = useState("json")
  const { toast } = useToast()

  const exportAsJSON = () => {
    const data = {
      nodes,
      edges,
      metadata: {
        title: "MindMapMe Export",
        createdAt: new Date().toISOString(),
        version: "1.0.0",
      },
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mindmap-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "JSON olarak dışa aktarıldı",
      description: "Zihin haritanız JSON formatında indirildi.",
    })
  }

  const exportAsSVG = () => {
    const svgContent = `
      <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a1a"/>
        ${nodes
          .map(
            (node) => `
          <g transform="translate(${node.position.x}, ${node.position.y})">
            <rect x="0" y="0" width="120" height="40" rx="8" fill="${node.data.color}" opacity="0.8"/>
            <text x="60" y="25" textAnchor="middle" fill="white" fontFamily="Arial" fontSize="12">
              ${node.data.label}
            </text>
          </g>
        `,
          )
          .join("")}
        ${edges
          .map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source)
            const targetNode = nodes.find((n) => n.id === edge.target)
            if (!sourceNode || !targetNode) return ""
            return `
            <line 
              x1="${sourceNode.position.x + 60}" 
              y1="${sourceNode.position.y + 20}" 
              x2="${targetNode.position.x + 60}" 
              y2="${targetNode.position.y + 20}" 
              stroke="#666" 
              strokeWidth="2"
            />
          `
          })
          .join("")}
      </svg>
    `

    const blob = new Blob([svgContent], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `mindmap-${Date.now()}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: "SVG olarak dışa aktarıldı",
      description: "Zihin haritanız SVG formatında indirildi.",
    })
  }

  const handleExport = () => {
    if (exportFormat === "json") {
      exportAsJSON()
    } else if (exportFormat === "svg") {
      exportAsSVG()
    }
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Zihin Haritasını Dışa Aktar
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <Label className="text-base font-medium">Dışa aktarma formatı seçin</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="mt-3">
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="flex items-center gap-2 cursor-pointer flex-1">
                  <FileJson className="h-4 w-4" />
                  <div>
                    <div className="font-medium">JSON</div>
                    <div className="text-sm text-muted-foreground">Veri formatında, tekrar içe aktarılabilir</div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent">
                <RadioGroupItem value="svg" id="svg" />
                <Label htmlFor="svg" className="flex items-center gap-2 cursor-pointer flex-1">
                  <ImageIcon className="h-4 w-4" />
                  <div>
                    <div className="font-medium">SVG</div>
                    <div className="text-sm text-muted-foreground">Vektör grafik formatında, paylaşım için ideal</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              İptal
            </Button>
            <Button onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Dışa Aktar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
