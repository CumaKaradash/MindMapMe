export interface MindMapNode {
  id: string
  position: { x: number; y: number }
  data: {
    label: string
    color: string
    isRoot?: boolean
  }
}

export interface MindMapEdge {
  id: string
  source: string
  target: string
}

export interface MindMapData {
  nodes: MindMapNode[]
  edges: MindMapEdge[]
}
