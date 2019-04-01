import React from 'react'
import Main from './Main'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'


const App = () => {
	return (
		<ApolloProvider client={client}>
			<Main />
		</ApolloProvider>
	)
}

export default App
