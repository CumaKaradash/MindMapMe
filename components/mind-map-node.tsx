"use client"

import type React from "react"

import { memo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit3, Check, X, Trash2, Link } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MindMapNode } from "@/types/mindmap"

interface MindMapNodeComponentProps {
  node: MindMapNode
  isSelected: boolean
  isConnecting: boolean
  onMouseDown: (e: React.MouseEvent) => void
  onUpdate: (updates: Partial<MindMapNode>) => void
  onDelete: () => void
  onConnect: () => void
}

export const MindMapNodeComponent = memo(
  ({ node, isSelected, isConnecting, onMouseDown, onUpdate, onDelete, onConnect }: MindMapNodeComponentProps) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editValue, setEditValue] = useState(node.data.label)

    const handleSave = () => {
      onUpdate({
        data: { ...node.data, label: editValue },
      })
      setIsEditing(false)
    }

    const handleCancel = () => {
      setEditValue(node.data.label)
      setIsEditing(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSave()
      } else if (e.key === "Escape") {
        handleCancel()
      }
    }

    return (
      <div
        className={cn(
          "absolute group min-w-[120px] max-w-[200px] p-3 rounded-xl shadow-lg border-2 transition-all duration-200 cursor-move",
          "bg-card text-card-foreground select-none",
          isSelected ? "border-primary shadow-primary/20 z-10" : "border-border",
          isConnecting ? "ring-2 ring-primary ring-opacity-50" : "",
          node.data.isRoot ? "shadow-xl scale-110" : "hover:shadow-md",
        )}
        style={{
          left: node.position.x,
          top: node.position.y,
          borderColor: isSelected ? node.data.color : undefined,
          boxShadow: isSelected ? `0 0 0 2px ${node.data.color}20` : undefined,
        }}
        onMouseDown={onMouseDown}
      >
        {/* Color indicator */}
        <div
          className="absolute -top-1 -left-1 w-4 h-4 rounded-full border-2 border-background"
          style={{ backgroundColor: node.data.color }}
        />

        {/* Action buttons */}
        <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="h-6 w-6 p-0 rounded-full"
            onClick={(e) => {
              e.stopPropagation()
              onConnect()
            }}
          >
            <Link className="h-3 w-3" />
          </Button>
          {!node.data.isRoot && (
            <Button
              size="sm"
              variant="destructive"
              className="h-6 w-6 p-0 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex items-center gap-1 w-full">
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-sm h-8 border-none p-0 focus-visible:ring-0"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSave()
                }}
              >
                <Check className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCancel()
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full">
              <span
                className={cn("text-sm font-medium flex-1 text-center", node.data.isRoot && "font-semibold text-base")}
              >
                {node.data.label}
              </span>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsEditing(true)
                }}
              >
                <Edit3 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  },
)

MindMapNodeComponent.displayName = "MindMapNodeComponent"
