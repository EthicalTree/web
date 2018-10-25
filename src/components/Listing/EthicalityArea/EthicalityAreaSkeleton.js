import React from 'react'
import { Skeleton } from '../../Skeleton'

export const EthicalityAreaSkeleton = props => (
  <Skeleton height={100} width={100} {...props}>
    <rect x="21.35" y="9.67" rx="3" ry="3" width="57" height="49.09" />
    <rect x="12" y="63.57" rx="3" ry="3" width="76.38" height="8.7" />
  </Skeleton>
)
