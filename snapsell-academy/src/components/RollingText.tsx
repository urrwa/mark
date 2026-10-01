import React, { useMemo } from "react"
import { motion } from 'motion/react'

interface RollingTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  duration?: number
  trigger?: boolean
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

function getRandomChars(charIndex: number, count: number): string[] {
  const rand = seededRandom(charIndex * 31 + 7)
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(CHARSET[Math.floor(rand() * CHARSET.length)])
  }
  return result
}

export default function RollingText({
  text,
  className,
  style,
  delay = 0,
  duration = 0.6,
  trigger = true,
}: RollingTextProps) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const characters = useMemo(() => Array.from(text), [text])

  const columnData = useMemo(
    () =>
      characters.map((char, i) => ({
        char,
        cyclers: getRandomChars(i, 4),
      })),
    [characters]
  )

  if (prefersReduced || !trigger) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    )
  }

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        overflow: 'hidden',
        height: '1em',
        ...style,
      }}
    >
      {/* Screen-reader text */}
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {text}
      </span>

      {/* Animated columns */}
      <span aria-hidden="true" style={{ display: 'inline-flex' }}>
        {columnData.map(({ char, cyclers }, charIndex) => {
          if (char === ' ') {
            return (
              <span key={charIndex} style={{ display: 'inline-block', width: '0.3em' }} />
            )
          }

          const columnChars = [...cyclers, char]
          const totalRows = columnChars.length
          // We want to end on the last row (the real char), which sits at index totalRows-1
          // translateY from 0 → -(totalRows-1)/totalRows * 100%
          const endY = `-${((totalRows - 1) / totalRows) * 100}%`

          return (
            <motion.span
              key={charIndex}
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                height: '1em',
                overflow: 'hidden',
              }}
              initial={{ translateY: '0%' }}
              animate={{ translateY: endY }}
              transition={{
                duration,
                ease: [0.22, 1, 0.36, 1],
                delay: charIndex * 0.04 + delay,
              }}
            >
              {columnChars.map((c, rowIndex) => (
                <span
                  key={rowIndex}
                  style={{
                    display: 'inline-block',
                    height: '1em',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {c}
                </span>
              ))}
            </motion.span>
          )
        })}
      </span>
    </span>
  )
}
