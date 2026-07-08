export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="animate-blob absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-indigo/25 blur-[120px]" />
      <div className="animate-blob-slow absolute top-1/4 -right-40 h-[28rem] w-[28rem] rounded-full bg-sky/20 blur-[120px]" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-rose/10 blur-[120px]" />
    </div>
  )
}
