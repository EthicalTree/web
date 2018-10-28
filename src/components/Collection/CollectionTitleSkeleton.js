import React from 'react'
import { Skeleton } from '../Skeleton'

export const CollectionTitleSkeleton = props => (
  <Skeleton height={45} width={370} {...props}>
    <rect x="21.17" y="9" rx="3" ry="3" width="214.2" height="26.42" />
    <rect x="257.17" y="9" rx="3" ry="3" width="7.51" height="26.42" />
    <rect x="281.13" y="16" rx="3" ry="3" width="62.32" height="13.93" />
  </Skeleton>
)
