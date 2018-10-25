import React from 'react'
import { Skeleton } from '../Skeleton'

export const OpenCloseSkeleton = props => (
  <Skeleton height={30} width={130} {...props}>
    <rect x="16" y="6.67" rx="3" ry="3" width="97.77" height="15.75" />
  </Skeleton>
)
