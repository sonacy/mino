import { Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../../entity/User'
import { IMyContext } from '../../types/MyContext'

@Resolver()
export default class MeResolver {
	@Query(() => User, { nullable: true })
	async me(@Ctx() ctx: IMyContext): Promise<User | undefined> {
		const userId = ctx.req.session!.userId
		if (!userId) {
			return undefined
		}

		return User.findOne(userId)
	}
}
