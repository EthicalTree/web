import React from 'react'
import { Skeleton } from '../Skeleton'

export const CollectionSkeleton = props => (
  <Skeleton height={200} width={400} {...props}>
    <rect x="6" y="5" rx="5" ry="5" width="390.3" height="190.24" />
  </Skeleton>
)
