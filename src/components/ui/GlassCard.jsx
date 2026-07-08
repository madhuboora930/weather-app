import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function GlassCard({ children, className = '', index = 0, hover = true, as = 'div' }) {
  const Component = motion[as] ?? motion.div

  return (
    <Component
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className={`glass glow-border rounded-2xl p-5 ${
        hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_var(--color-indigo)]' : ''
      } ${className}`}
    >
      {children}
    </Component>
  )
}
