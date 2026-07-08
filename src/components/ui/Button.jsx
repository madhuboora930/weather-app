const VARIANTS = {
  primary:
    'bg-gradient-to-r from-sky via-indigo to-rose text-ink font-semibold shadow-lg shadow-indigo/20 hover:scale-105',
  ghost: 'glass text-white hover:-translate-y-0.5 hover:shadow-[0_0_20px_-6px_var(--color-sky)]',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  as: Component = 'button',
  ...rest
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${VARIANTS[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  )
}
