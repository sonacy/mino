import fs from 'fs-extra'
import { IProjectJson } from 'src'
import db from './db'
import testJson from './test'

export const writeToDest = async (
	srcDir: string,
	destDir: string,
	result: IProjectJson
) => {
	const {
		'project-name': projectName,
		'project-type': projectType,
		'server-type': serverType,
		'database-type': dbType,
		'need-test': needTest,
	} = result

	await fs.copy(srcDir, destDir, {
		filter: src => {
			if (src.includes('node_modules')) {
				return false
			}
			if (src.includes('.lock')) {
				return false
			}

			if (projectType === 'backend' && serverType === 'graphql' && !needTest) {
				if (src.includes('test') || src.includes('jest')) {
					return false
				}
			}
			return true
		},
	})
	await changeContent(`${destDir}/package.json`, (content: string) => {
		return content.replace('mino', projectName)
	})
	await changeContent(`${destDir}/readme.md`, (content: string) => {
		return content.replace('minoTitle', projectName)
	})

	// change db type
	if (projectType === 'backend') {
		if (serverType === 'graphql') {
			const dbJson = db[dbType!]

			await changeContent(`${destDir}/package.json`, (content: string) => {
				const pkg = content.replace('dbDrive', dbJson.drive)
				return pkg
					.replace(' - TestPkg', needTest ? testJson.TestPkg : '')
					.replace(' - TestCli', needTest ? testJson.TestCli : '')
			})

			await changeContent(`${destDir}/ormconfig.json`, (content: string) => {
				return content
					.replace('minoType', dbType!)
					.replace('minoPort', dbJson.port)
					.replace('minoDB', `${projectName}-ts-graphql`)
			})
			if (needTest) {
				await changeContent(
					`${destDir}/src/test-util/testConn.ts`,
					(content: string) => {
						return content
							.replace('minoType', dbType!)
							.replace('minoPort', dbJson.port)
							.replace('minoDB', `${projectName}-ts-graphql-test`)
					}
				)
			}
		}
	}
}

const changeContent = async (
	filepath: string,
	cb: (content: string) => string
) => {
	const content = await fs.readFile(filepath, {
		encoding: 'utf8',
	})
	const newContent = cb(content)
	await fs.writeFile(filepath, newContent)
}
