import React from 'react'
import { Button } from 'antd'
import { hot } from 'react-hot-loader/root'

const App = () => {
	return (
		<div>
			<h1>hello react typescript</h1>
			<Button type="primary" style={{ marginLeft: 50 }}>
				antd
			</Button>
		</div>
	)
}

export default hot(App)
