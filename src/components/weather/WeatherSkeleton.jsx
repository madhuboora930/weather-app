import Skeleton from '../ui/Skeleton'

export default function WeatherSkeleton() {
  return (
    <div className="w-full space-y-6" aria-busy="true" aria-label="Loading weather">
      <div className="glass rounded-3xl p-8 text-center sm:p-10">
        <Skeleton className="mx-auto h-5 w-40" />
        <Skeleton className="mx-auto mt-2 h-4 w-24" />
        <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="mx-auto h-14 w-32" />
            <Skeleton className="mx-auto h-4 w-20" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
    </div>
  )
}
