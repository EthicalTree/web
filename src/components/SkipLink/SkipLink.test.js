import React from 'react'
import { shallow } from 'enzyme'
import { SkipLink } from './SkipLink'

it('renders without crashing', () => {
  shallow(<SkipLink t={t => t} handleSkip={() => {}} />)
})
