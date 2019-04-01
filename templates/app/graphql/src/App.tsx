import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { client } from './apollo'
import AppContainer from './navigations'

export default class App extends React.PureComponent {
	render() {
		return (
			<ApolloProvider client={client}>
				<AppContainer />
			</ApolloProvider>
		)
	}
}
