import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-sage-100", className)}
      {...props}
    />
  )
}

// Pre-built skeleton components for common use cases
function BookCoverSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton className={cn("w-15 h-20 rounded-md", className)} />
  )
}

function BookCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center space-x-3 p-4", className)}>
      <BookCoverSkeleton />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}

function ReadingCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("bg-white rounded-xl p-4 shadow-sm border border-gray-200", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookCoverSkeleton className="w-10 h-12" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  )
}

function ContributionGridSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className="flex space-x-1">
          {Array.from({ length: 53 }, (_, j) => (
            <Skeleton key={j} className="w-3 h-3 rounded-sm" />
          ))}
        </div>
      ))}
    </div>
  )
}

function NavigationSkeleton({ className }: { className?: string }) {
  return (
    <nav className={cn("bg-cream-dark border-b border-sage-200", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Skeleton className="h-8 w-16" />
          <div className="hidden md:flex items-center space-x-8">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-4 w-16" />
            ))}
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
    </nav>
  )
}

export {
  Skeleton,
  BookCoverSkeleton,
  BookCardSkeleton,
  ReadingCardSkeleton,
  ContributionGridSkeleton,
  NavigationSkeleton,
} 