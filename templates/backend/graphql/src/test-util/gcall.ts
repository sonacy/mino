import { graphql, GraphQLSchema } from 'graphql'
// tslint:disable-next-line:no-submodule-imports
import Maybe from 'graphql/tsutils/Maybe'

import { createSchema } from '../utils/createSchema'

interface IOptions {
	source: string
	userId?: string
	variableValues?: Maybe<{
		[key: string]: any
	}>
}

let schema: GraphQLSchema

export const gCall = async ({ source, variableValues, userId }: IOptions) => {
	if (!schema) {
		schema = await createSchema()
	}
	return graphql({
		schema,
		source,
		variableValues,
		contextValue: {
			req: {
				session: {
					userId,
				},
			},
			res: {
				clearCookie: jest.fn(),
			},
		},
	})
}
