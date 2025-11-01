"use client"

import { useState, useEffect } from "react"

interface TypewriterEffectProps {
  text: string
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  loop?: boolean
}

export default function TypewriterEffect({
  text,
  typingSpeed = 150,
  deletingSpeed = 40,
  pauseDuration = 2000,
  loop = true,
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1))
        } else if (loop) {
          // Finished typing, pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(text.slice(0, displayText.length - 1))
        } else if (loop) {
          // Start typing again
          setIsDeleting(false)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, text, typingSpeed, deletingSpeed, pauseDuration, loop])

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
