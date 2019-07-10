import React from 'react'
import { Provider } from 'react-redux'

import Routes from './routes'
import configureStore from './store'

const App = () => {
	return (
		<Provider store={configureStore()}>
			<Routes />
		</Provider>
	)
}

export default App
