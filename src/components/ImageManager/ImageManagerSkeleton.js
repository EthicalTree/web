import React from 'react'
import { Skeleton } from '../Skeleton'

export const ImageManagerSkeleton = props => (
  <Skeleton height={277} width={1000} {...props}>
    <rect x="3" y="2.67" rx="5" ry="5" width="1000" height="277" />
  </Skeleton>
)
