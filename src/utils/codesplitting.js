import React from 'react'
import Loadable from 'react-loadable'
import { Loader } from '../components/Loader'

// Setup for code-splitting
export const split = importer => {
  return Loadable({
    loader: importer,
    loading: () => <Loader loading={true} fixed={true} />
  })
}
