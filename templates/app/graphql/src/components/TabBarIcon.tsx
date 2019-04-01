import React from 'react'
import { Icon } from 'react-native-elements'
import Colors from '../contants/Colors'

interface Iprops {
	name: string
	focused: boolean
}

export default class TabBarIcon extends React.Component<Iprops> {
	render() {
		return (
			<Icon
				type='ionicon'
				name={this.props.name}
				size={26}
				containerStyle={{ marginBottom: -3 }}
				color={
					this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
				}
			/>
		)
	}
}
