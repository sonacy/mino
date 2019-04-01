import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createUploadLink } from 'apollo-upload-client'

export const client = new ApolloClient({
	link: createUploadLink({
		uri: 'http://localhost:4000/graphql',
		credentials: 'include',
	}),
	cache: new InMemoryCache(),
})
