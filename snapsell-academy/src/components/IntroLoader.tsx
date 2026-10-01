import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

interface IntroLoaderProps {
  onComplete: () => void
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const alreadyShown = sessionStorage.getItem('loaderShown') === '1'
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [count, setCount] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(!alreadyShown)
  const [done, setDone] = useState(false)

  const startedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const triggerExit = () => {
    sessionStorage.setItem('loaderShown', '1')
    setDone(true)
    setExiting(true)
    exitTimerRef.current = setTimeout(() => {
      document.body.style.overflow = ''
      setVisible(false)
      onComplete()
    }, 700)
  }

  useEffect(() => {
    if (alreadyShown) {
      onComplete()
      return
    }

    if (prefersReduced) {
      sessionStorage.setItem('loaderShown', '1')
      onComplete()
      return
    }

    if (startedRef.current) return
    startedRef.current = true

    document.body.style.overflow = 'hidden'

    intervalRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
          exitTimerRef.current = setTimeout(triggerExit, 200)
          return 100
        }
        return prev + 1
      })
    }, 14)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      document.body.style.overflow = ''
    }
  }, [])

  if (!visible) return null

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro-loader"
          initial={{ translateY: '0%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '-100%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Accessibility live region */}
          <div aria-live="polite" className="sr-only">
            {done ? 'Laden abgeschlossen' : ''}
          </div>

          {/* Counter */}
          <div
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              color: '#F5F5F2',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 300,
              fontSize: 'clamp(7rem, 18vw, 22rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            <span>{count}</span>
            <span
              style={{
                fontSize: '0.35em',
                lineHeight: 1,
                marginTop: '0.15em',
                color: '#F5F5F2',
              }}
            >
              %
            </span>
          </div>

          {/* Wordmark */}
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.5rem',
                letterSpacing: '0.25em',
                color: '#F5F5F2',
                textTransform: 'uppercase',
              }}
            >
              MARK AUREL
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: '0.75rem',
                letterSpacing: '0.3em',
                color: '#F5F5F2',
                textTransform: 'uppercase',
              }}
            >
              CREATOR AGENCY
            </span>
          </div>

          {/* Progress bar */}
          <div
            aria-hidden="true"
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: 'rgba(255,255,255,0.08)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${count}%`,
                backgroundColor: '#00D084',
                transition: 'width 14ms linear',
              }}
            />
          </div>

          {/* Skip button */}
          <button
            onClick={triggerExit}
            style={{
              position: 'fixed',
              bottom: '1.5rem',
              right: '1.5rem',
              background: 'transparent',
              border: '1px solid rgba(245,245,242,0.25)',
              color: '#F5F5F2',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              padding: '0.4rem 0.9rem',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
