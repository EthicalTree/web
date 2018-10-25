import React from 'react'
import { Skeleton } from '../../Skeleton'

export const DailyHoursSkeleton = props => (
  <Skeleton height={50} width={130} {...props}>
    <rect x="29" y="6.67" rx="3" ry="3" width="69.42" height="10.09" />
    <rect x="16" y="31.67" rx="3" ry="3" width="97.77" height="10.4" />
  </Skeleton>
)
