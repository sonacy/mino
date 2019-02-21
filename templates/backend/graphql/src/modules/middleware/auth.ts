import { MiddlewareFn } from 'type-graphql'
import { IMyContext } from '../../types/MyContext'

export const isAuth: MiddlewareFn<IMyContext> = async ({ context }, next) => {
	if (!context.req.session!.userId) {
		throw new Error('You need to login to perform this action!')
	}

	return next()
}
