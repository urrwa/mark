export const ease = [0.22, 1, 0.36, 1] as const

export const transitions = {
  hover: { duration: 0.22, ease },
  reveal: { duration: 0.75, ease },
  slow: { duration: 1.1, ease },
  fast: { duration: 0.4, ease },
  spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
  springGentle: { type: 'spring' as const, stiffness: 160, damping: 22 },
}

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease } },
  },
}

export const stagger = (delay = 0.08) => ({
  visible: { transition: { staggerChildren: delay } },
})
