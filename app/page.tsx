"use client"

import { useState, useCallback, useEffect } from "react"
import { MindMapCanvas } from "@/components/mind-map-canvas"
import { Toolbar } from "@/components/toolbar"
import { ExportDialog } from "@/components/export-dialog"
import { useToast } from "@/hooks/use-toast"
import { StorageManager } from "@/lib/storage"
import { generateId } from "@/lib/utils"
import type { MindMapNode, MindMapEdge } from "@/types/mindmap"

const initialNodes: MindMapNode[] = [
  {
    id: "1",
    position: { x: 400, y: 300 },
    data: {
      label: "Ana Fikir",
      color: "#8B5CF6",
      isRoot: true,
    },
  },
]

const initialEdges: MindMapEdge[] = []

export default function MindMapApp() {
  const [nodes, setNodes] = useState<MindMapNode[]>(initialNodes)
  const [edges, setEdges] = useState<MindMapEdge[]>(initialEdges)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const { toast } = useToast()

  // Load saved data on mount
  useEffect(() => {
    const savedData = StorageManager.loadMindMap()
    if (savedData) {
      setNodes(savedData.nodes)
      setEdges(savedData.edges)
      toast({
        title: "Zihin haritası yüklendi",
        description: "Kaydedilmiş çalışmanız geri yüklendi.",
      })
    }
  }, [toast])

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      StorageManager.saveMindMap({ nodes, edges })
    }, 30000)

    return () => clearInterval(interval)
  }, [nodes, edges])

  const addNode = useCallback(() => {
    const colors = ["#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444", "#EC4899"]
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newNode: MindMapNode = {
      id: generateId(),
      position: {
        x: Math.random() * 400 + 200,
        y: Math.random() * 400 + 200,
      },
      data: {
        label: "Yeni Düşünce",
        color: randomColor,
        isRoot: false,
      },
    }

    setNodes((prev) => [...prev, newNode])

    toast({
      title: "Yeni düğüm eklendi",
      description: "Düşüncenizi düzenlemeye başlayabilirsiniz.",
    })
  }, [toast])

  const updateNode = useCallback((id: string, updates: Partial<MindMapNode>) => {
    setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, ...updates } : node)))
  }, [])

  const deleteNode = useCallback((id: string) => {
    setNodes((prev) => prev.filter((node) => node.id !== id))
    setEdges((prev) => prev.filter((edge) => edge.source !== id && edge.target !== id))
  }, [])

  const addEdge = useCallback((source: string, target: string) => {
    const newEdge: MindMapEdge = {
      id: generateId(),
      source,
      target,
    }
    setEdges((prev) => [...prev, newEdge])
  }, [])

  const clearCanvas = useCallback(() => {
    setNodes(initialNodes)
    setEdges(initialEdges)
    StorageManager.clearMindMap()

    toast({
      title: "Canvas temizlendi",
      description: "Yeni bir zihin haritası oluşturmaya başlayabilirsiniz.",
    })
  }, [toast])

  const saveMap = useCallback(() => {
    StorageManager.saveMindMap({ nodes, edges })
    toast({
      title: "Zihin haritası kaydedildi",
      description: "Çalışmanız güvenle saklandı.",
    })
  }, [nodes, edges, toast])

  return (
    <div className="w-full h-screen bg-background">
      <Toolbar
        onAddNode={addNode}
        onClear={clearCanvas}
        onSave={saveMap}
        onExport={() => setIsExportDialogOpen(true)}
      />

      <MindMapCanvas
        nodes={nodes}
        edges={edges}
        onUpdateNode={updateNode}
        onDeleteNode={deleteNode}
        onAddEdge={addEdge}
      />

      <ExportDialog
        isOpen={isExportDialogOpen}
        onClose={() => setIsExportDialogOpen(false)}
        nodes={nodes}
        edges={edges}
      />
    </div>
  )
}
