"use client"

import type React from "react"

import { useRef, useState, useCallback, useEffect } from "react"
import { MindMapNodeComponent } from "@/components/mind-map-node"
import { ConnectionLine } from "@/components/connection-line"
import { CanvasControls } from "@/components/canvas-controls"
import type { MindMapNode, MindMapEdge } from "@/types/mindmap"

interface MindMapCanvasProps {
  nodes: MindMapNode[]
  edges: MindMapEdge[]
  onUpdateNode: (id: string, updates: Partial<MindMapNode>) => void
  onDeleteNode: (id: string) => void
  onAddEdge: (source: string, target: string) => void
}

export function MindMapCanvas({ nodes, edges, onUpdateNode, onDeleteNode, onAddEdge }: MindMapCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<string | null>(null)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [canvasTransform, setCanvasTransform] = useState({ x: 0, y: 0, scale: 1 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null)

  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.stopPropagation()
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      setSelectedNode(nodeId)
      setDraggedNode(nodeId)
      setDragOffset({
        x: e.clientX - rect.left - node.position.x * canvasTransform.scale - canvasTransform.x,
        y: e.clientY - rect.top - node.position.y * canvasTransform.scale - canvasTransform.y,
      })
    },
    [nodes, canvasTransform],
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggedNode) {
        const rect = canvasRef.current?.getBoundingClientRect()
        if (!rect) return

        const newX = (e.clientX - rect.left - dragOffset.x - canvasTransform.x) / canvasTransform.scale
        const newY = (e.clientY - rect.top - dragOffset.y - canvasTransform.y) / canvasTransform.scale

        onUpdateNode(draggedNode, {
          position: { x: newX, y: newY },
        })
      } else if (isPanning) {
        const deltaX = e.clientX - panStart.x
        const deltaY = e.clientY - panStart.y

        setCanvasTransform((prev) => ({
          ...prev,
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }))

        setPanStart({ x: e.clientX, y: e.clientY })
      }
    },
    [draggedNode, dragOffset, canvasTransform, onUpdateNode, isPanning, panStart],
  )

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null)
    setIsPanning(false)
  }, [])

  const handleCanvasMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setSelectedNode(null)
      setIsPanning(true)
      setPanStart({ x: e.clientX, y: e.clientY })
    }
  }, [])

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      const newScale = Math.max(0.1, Math.min(3, canvasTransform.scale * delta))

      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      setCanvasTransform((prev) => ({
        x: mouseX - (mouseX - prev.x) * (newScale / prev.scale),
        y: mouseY - (mouseY - prev.y) * (newScale / prev.scale),
        scale: newScale,
      }))
    },
    [canvasTransform.scale],
  )

  const handleNodeConnect = useCallback(
    (nodeId: string) => {
      if (connectingFrom && connectingFrom !== nodeId) {
        onAddEdge(connectingFrom, nodeId)
        setConnectingFrom(null)
      } else {
        setConnectingFrom(nodeId)
      }
    },
    [connectingFrom, onAddEdge],
  )

  const resetView = useCallback(() => {
    setCanvasTransform({ x: 0, y: 0, scale: 1 })
  }, [])

  const zoomIn = useCallback(() => {
    setCanvasTransform((prev) => ({
      ...prev,
      scale: Math.min(3, prev.scale * 1.2),
    }))
  }, [])

  const zoomOut = useCallback(() => {
    setCanvasTransform((prev) => ({
      ...prev,
      scale: Math.max(0.1, prev.scale * 0.8),
    }))
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleCanvasMouseDown}
        onWheel={handleWheel}
        style={{
          backgroundImage: `radial-gradient(circle, hsl(var(--muted-foreground) / 0.3) 1px, transparent 1px)`,
          backgroundSize: `${20 * canvasTransform.scale}px ${20 * canvasTransform.scale}px`,
          backgroundPosition: `${canvasTransform.x}px ${canvasTransform.y}px`,
        }}
      >
        <div
          style={{
            transform: `translate(${canvasTransform.x}px, ${canvasTransform.y}px) scale(${canvasTransform.scale})`,
            transformOrigin: "0 0",
          }}
        >
          {/* Render edges */}
          <svg className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
            {edges.map((edge) => {
              const sourceNode = nodes.find((n) => n.id === edge.source)
              const targetNode = nodes.find((n) => n.id === edge.target)
              if (!sourceNode || !targetNode) return null

              return (
                <ConnectionLine
                  key={edge.id}
                  from={{ x: sourceNode.position.x + 100, y: sourceNode.position.y + 25 }}
                  to={{ x: targetNode.position.x + 100, y: targetNode.position.y + 25 }}
                />
              )
            })}
          </svg>

          {/* Render nodes */}
          {nodes.map((node) => (
            <MindMapNodeComponent
              key={node.id}
              node={node}
              isSelected={selectedNode === node.id}
              isConnecting={connectingFrom === node.id}
              onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
              onUpdate={(updates) => onUpdateNode(node.id, updates)}
              onDelete={() => onDeleteNode(node.id)}
              onConnect={() => handleNodeConnect(node.id)}
            />
          ))}
        </div>
      </div>

      <CanvasControls onZoomIn={zoomIn} onZoomOut={zoomOut} onResetView={resetView} scale={canvasTransform.scale} />
    </div>
  )
}
