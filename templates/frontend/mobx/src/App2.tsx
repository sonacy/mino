import React from 'react'
import Routes from './routes'
import { Provider } from 'mobx-react'
import AppState from './store/app-state'

const appState = new AppState()

const App = () => {
	return (
		<Provider appState={appState}>
			<Routes />
		</Provider>
	)
}

export default App
