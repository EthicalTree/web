import React from 'react'
import { Skeleton } from '../../Skeleton'

export const ResultSkeleton = props => (
  <Skeleton height={260} width={300} {...props}>
    <rect x="7" y="215" rx="4" ry="4" width="143" height="13" />
    <rect x="6" y="4.67" rx="5" ry="5" width="284" height="188" />
    <rect x="170" y="215" rx="4" ry="4" width="119" height="13" />
    <rect x="7" y="243" rx="4" ry="4" width="119" height="13" />
    <rect x="233.63" y="244" rx="4" ry="4" width="55" height="13" />
  </Skeleton>
)
