import React from 'react'
import { shallow } from 'enzyme'
import Main from './index'

test('render Main', () => {
	const wrapper = shallow(<Main />)
	expect(wrapper.find('h1')).toHaveLength(1)
	expect(
		wrapper
			.find('h1')
			.at(0)
			.text()
	).toBe('Main')
})
