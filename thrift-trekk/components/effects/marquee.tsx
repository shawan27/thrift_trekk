'use client'

import { ReactNode } from 'react'

interface MarqueeProps {
  children: ReactNode
  reverse?: boolean
  speed?: 'slow' | 'normal' | 'fast'
  className?: string
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  reverse = false,
  speed = 'normal',
  className = '',
  pauseOnHover = false,
}: MarqueeProps) {
  const animationClass = reverse
    ? speed === 'slow'
      ? 'animate-[marquee-reverse_90s_linear_infinite]'
      : speed === 'fast'
      ? 'animate-[marquee-reverse_25s_linear_infinite]'
      : 'animate-[marquee-reverse_50s_linear_infinite]'
    : speed === 'slow'
    ? 'animate-[marquee_90s_linear_infinite]'
    : speed === 'fast'
    ? 'animate-[marquee_25s_linear_infinite]'
    : 'animate-[marquee_50s_linear_infinite]'

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${animationClass} ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
