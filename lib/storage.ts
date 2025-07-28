import type { MindMapData } from "@/types/mindmap"

export class StorageManager {
  private static readonly STORAGE_KEY = "mindmapme-data"

  static saveMindMap(data: MindMapData): void {
    try {
      const serializedData = JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem(this.STORAGE_KEY, serializedData)
    } catch (error) {
      console.error("Failed to save mind map:", error)
    }
  }

  static loadMindMap(): MindMapData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY)
      if (!data) return null

      const parsed = JSON.parse(data)
      return {
        nodes: parsed.nodes || [],
        edges: parsed.edges || [],
      }
    } catch (error) {
      console.error("Failed to load mind map:", error)
      return null
    }
  }

  static clearMindMap(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY)
    } catch (error) {
      console.error("Failed to clear mind map:", error)
    }
  }

  static exportMindMap(data: MindMapData): string {
    return JSON.stringify(
      {
        ...data,
        metadata: {
          title: "MindMapMe Export",
          createdAt: new Date().toISOString(),
          version: "1.0.0",
        },
      },
      null,
      2,
    )
  }
}
