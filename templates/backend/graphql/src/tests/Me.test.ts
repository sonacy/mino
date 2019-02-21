import faker from 'faker'
import { Connection } from 'typeorm'
import { User } from '../entity/User'
import { gCall } from '../test-util/gcall'
import { testConn } from '../test-util/testConn'

let conn: Connection
beforeAll(async () => {
	conn = await testConn()
})

afterAll(async () => {
	await conn.close()
})

const meMutation = `
query {
  me {
    name
    email
    id
    firstName
    lastName
  }
}
`

describe('Me', () => {
	it('get a user', async () => {
		const user = await User.create({
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		}).save()

		const response = await gCall({
			source: meMutation,
			userId: user.id,
		})

		expect(response).toMatchObject({
			data: {
				me: {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					id: '' + user.id,
				},
			},
		})
	})
})
