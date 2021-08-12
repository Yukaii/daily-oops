export const springSimple = {
  transition: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeInOut',
  },
  initial: { y: 200, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 200, opacity: 0 },
}
