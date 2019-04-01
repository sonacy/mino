import React from 'react'
import { Platform } from 'react-native'
import {
	createBottomTabNavigator,
	createStackNavigator,
} from 'react-navigation'
import HomeScreen from '../screens/home'
import SettingsScreen from '../screens/setting'
import TabBarIcon from '../components/TabBarIcon'

const HomeStack = createStackNavigator(
	{
		Home: HomeScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#d32323',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
		navigationOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: ({ focused }) => (
				<TabBarIcon
					focused={focused}
					name={
						Platform.OS === 'ios'
							? `ios-information-circle${focused ? '' : '-outline'}`
							: 'md-information-circle'
					}
				/>
			),
		},
	}
)

const SettingsStack = createStackNavigator(
	{
		Settings: SettingsScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: '#d32323',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			},
		},
		navigationOptions: {
			tabBarLabel: 'Settings',
			tabBarIcon: ({ focused }) => (
				<TabBarIcon
					focused={focused}
					name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
				/>
			),
		},
	}
)

export const TabNavigator = createBottomTabNavigator({
	Home: HomeStack,
	Settings: SettingsStack,
})
