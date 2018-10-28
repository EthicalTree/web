import React from 'react'
import { Skeleton } from '../../components/Skeleton'

export const CollectionBannerSkeleton = props => (
  <Skeleton height={320} width={1000} {...props}>
    <rect x="6" y="5" rx="5" ry="5" width="987.46" height="309.5" />
  </Skeleton>
)
