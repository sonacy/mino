import React from 'react'
import Routes from './routes'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Routes />
		</ApolloProvider>
	)
}

export default App
