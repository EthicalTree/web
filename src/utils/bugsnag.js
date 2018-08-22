import React from 'react'
import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'

const client = bugsnag({
  apiKey: process.env.REACT_APP_BUGSNAG_KEY,
  releaseStage: process.env.REACT_APP_ENVIRONMENT,
  notifyReleaseStages: ['production'],
})

export const assignBugsnagUser = user => {
  client.user = user
}

export default client.use(createPlugin(React))
