export default function IconButton({ children, label, className = '', ...rest }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:text-sky hover:shadow-[0_0_18px_-4px_var(--color-sky)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
