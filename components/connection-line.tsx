"use client"

interface ConnectionLineProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export function ConnectionLine({ from, to }: ConnectionLineProps) {
  // Calculate control points for a smooth curve
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.sqrt(dx * dx + dy * dy)

  const controlOffset = Math.min(distance * 0.3, 100)

  const path = `M ${from.x} ${from.y} C ${from.x + controlOffset} ${from.y}, ${to.x - controlOffset} ${to.y}, ${to.x} ${to.y}`

  return (
    <path
      d={path}
      stroke="hsl(var(--muted-foreground))"
      strokeWidth="2"
      fill="none"
      className="transition-colors hover:stroke-primary"
    />
  )
}
