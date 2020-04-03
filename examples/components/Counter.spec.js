import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { Counter } from './Counter'

configure({ adapter: new Adapter() })

describe('Test Counter', () => {
  it('Renders Counter', () => {
    const wrapper = mount(<Counter />)
    const span = wrapper.find('span')
    expect(span.text()).toBe('Count: 0')
  })
  it('Buttons alter state', () => {
    const wrapper = mount(<Counter />)
    const span = wrapper.find('span')
    const buttons = wrapper.find('button')
    buttons.at(1).simulate('click')
    expect(span.text()).toBe('Count: 1')
    buttons.at(0).simulate('click')
    expect(span.text()).toBe('Count: 0')
  })
})
