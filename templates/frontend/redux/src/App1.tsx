import React from 'react'
import { Provider } from 'react-redux'

import Main from './Main'
import configureStore from './store'


const App = () => {
	return (
		<Provider store={configureStore()}>
			<Main />
		</Provider>
	)
}

export default App
