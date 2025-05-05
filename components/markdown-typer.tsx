"use client"

import { TypeAnimation } from "./type-animation"

interface RichTextNode {
  type: string
  children?: RichTextNode[]
  text?: string
  id?: number
}

interface MarkdownTyperProps {
  content: {
    type: "root"
    children: RichTextNode[]
  }
  className?: string
  baseDelay?: number
  speed?: number
}

export function MarkdownTyper({
  content,
  className = "",
  baseDelay = 0,
  speed = 30,
}: MarkdownTyperProps) {
  if (!content || content.type !== "root") return null

  const paragraphs = content.children.filter((node) => node.type === "p")

  return (
    <div className="space-y-4">
      {paragraphs.map((para, index) => {
        const paragraphText = para.children
          ?.filter((child) => child.type === "text" && child.text)
          .map((child) => child.text)
          .join(" ") ?? ""

        return (
          <TypeAnimation
            key={para.id ? para.id + index : index}
            text={paragraphText}
            className={className}
            delay={baseDelay + index * 1000} // stagger each by 1s
            speed={speed}
          />
        )
      })}
    </div>
  )
}
