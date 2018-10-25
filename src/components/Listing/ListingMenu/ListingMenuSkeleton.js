import React from 'react'
import { Skeleton } from '../../Skeleton'

export const ListingMenuSkeleton = props => (
  <Skeleton height={240} width={276} {...props}>
    <rect x="4" y="5" rx="5" ry="5" width="270.48" height="232" />
  </Skeleton>
)
