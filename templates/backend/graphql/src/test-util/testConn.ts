import { createConnection } from 'typeorm'

export const testConn = async (drop: boolean = false) => {
	return createConnection({
		type: 'minoType',
		name: 'default',
		host: 'localhost',
		port: minoPort,
		username: 'root',
		password: '',
		database: 'minoDB',
		synchronize: drop,
		dropSchema: drop,
		entities: [__dirname + '/../entity/*.*'],
	})
}
