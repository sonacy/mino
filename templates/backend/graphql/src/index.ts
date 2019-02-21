import { ApolloServer } from 'apollo-server-express'
import connectRedis from 'connect-redis'
import cors from 'cors'
import Express from 'express'
import session from 'express-session'
import 'reflect-metadata'
import { formatArgumentValidationError } from 'type-graphql'
import { createConnection } from 'typeorm'
import { redis } from './redis'
import { createSchema } from './utils/createSchema'

const main = async () => {
	await createConnection()

	const schema = await createSchema()
	const server = new ApolloServer({
		schema,
		formatError: formatArgumentValidationError,
		context: ({ req, res }: any) => ({ req, res }),
	})

	const app = Express()

	const RedisStore = connectRedis(session)

	app.use(
		cors({
			credentials: true,
			origin: 'http://localhost:3000',
		})
	)

	app.use(
		session({
			store: new RedisStore({
				client: redis as any,
			}),
			name: 'qid',
			secret: 'asdhopq9wdk',
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 1000 * 60 * 60 * 24 * 7,
			},
		})
	)

	server.applyMiddleware({ app })

	const port = 4000
	const host = 'localhost'

	app.listen(port, host, () => {
		console.log(
			`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`
		)
	})
}

main()
