// "use client"

// import { useState, useEffect } from "react"

// interface TypewriterEffectProps {
//   texts: string[]
//   typingSpeed?: number
//   deletingSpeed?: number
//   pauseDuration?: number
// }

// export default function TypewriterEffect({
//   texts,
//   typingSpeed = 150,
//   deletingSpeed = 40,
//   pauseDuration = 2000,
// }: TypewriterEffectProps) {
//   const [displayText, setDisplayText] = useState("")
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isDeleting, setIsDeleting] = useState(false)

//   useEffect(() => {
//     const currentText = texts[currentIndex]

//     const timeout = setTimeout(
//       () => {
//         if (!isDeleting) {
//           // Typing
//           if (displayText.length < currentText.length) {
//             setDisplayText(currentText.slice(0, displayText.length + 1))
//           } else {
//             // Finished typing, pause then start deleting
//             setTimeout(() => setIsDeleting(true), pauseDuration)
//           }
//         } else {
//           // Deleting
//           if (displayText.length > 0) {
//             setDisplayText(currentText.slice(0, displayText.length - 1))
//           } else {
//             // Finished deleting, move to next text
//             setIsDeleting(false)
//             setCurrentIndex((prev) => (prev + 1) % texts.length)
//           }
//         }
//       },
//       isDeleting ? deletingSpeed : typingSpeed,
//     )

//     return () => clearTimeout(timeout)
//   }, [displayText, currentIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration])

//   return (
//     <span>
//       {displayText}
//       <span className="animate-pulse">|</span>
//     </span>
//   )
// }

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
