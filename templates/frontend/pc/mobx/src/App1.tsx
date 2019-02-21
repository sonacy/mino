import React from 'react'
import Main from './Main'
import { Provider } from 'mobx-react'
import AppState from './store/app-state'

const appState = new AppState()

const App = () => {
	return (
		<Provider appState={appState}>
			<Main />
		</Provider>
	)
}

export default App
