import chalk from 'chalk'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import bePrompt from './backend'
import {
	DBType,
	ExistPath,
	FrontendType,
	NeedRouter,
	NeedTest,
	ProjectName,
	ProjectType,
	ServerType,
	StoreType,
	StyleProcessor,
} from './contants'
import fePrompt from './frontend'
import { run } from './utils/task'

// 1. project name -> input
// 2. front backend

const projectNameQuestion = [
	{
		name: ProjectName,
		type: 'input',
		message: 'Project Name: ',
		validate: (input: string) => {
			if (/^([a-zA-Z\-\_\d])+$/.test(input)) {
				return true
			} else {
				return 'project name may only include letters, numbers, underscores'
			}
		},
	},
]

const existQuestion = [
	{
		name: ExistPath,
		type: 'list',
		message: 'project has already exist, choose what you want?',
		choices: ['empty', 'overwrite', 'quit'],
	},
]

const typedQuestions = [
	{
		name: ProjectType,
		type: 'list',
		message: 'what kind of project do you want?',
		choices: ['frontend', 'backend'],
	},
]

export interface IProjectJson {
	[ProjectName]: string
	[ProjectType]: 'frontend' | 'backend'
	[ServerType]?: 'graphql' | 'restful' | 'customize'
	[DBType]?: 'mysql' | 'postgresql' | 'mongoose'
	[NeedTest]?: boolean
	[StoreType]?: 'redux' | 'mobx' | 'graphql' | 'nothing'
	[NeedRouter]?: boolean
	[FrontendType]?: 'h5' | 'pc' | 'react native'
	[StyleProcessor]?: 'scss' | 'less' | 'stylus' | 'nothing'
	[ExistPath]?: 'empty' | 'overwrite' | 'quit'
}

async function generateProject(result: IProjectJson) {
	// 1. target project dir
	const targetDir = path.resolve(__dirname, `../example/${result[ProjectName]}`)
	await fs.ensureDir(targetDir)
	let srcDir
	if (result[ProjectType] === 'frontend') {
		srcDir = path.resolve(
			__dirname,
			`../templates/frontend/${result[FrontendType]}/${result[StoreType]}`
		)
	} else {
		// backend
		srcDir = path.resolve(
			__dirname,
			`../templates/backend/${result[ServerType]}`
		)
	}
	await run(srcDir, targetDir, result)
}

const main = async () => {
	const firstAns: IProjectJson = await inquirer.prompt(projectNameQuestion)
	const targetPath = path.resolve(
		__dirname,
		`../example/${firstAns[ProjectName]}`
	)
	const isExist = await fs.pathExists(targetPath)
	if (isExist) {
		const existAns: IProjectJson = await inquirer.prompt(existQuestion)
		if (existAns[ExistPath] === 'empty') {
			await fs.remove(targetPath)
		} else if (existAns[ExistPath] === 'quit') {
			return
		}
	}

	let result
	const secondAns: IProjectJson = await inquirer.prompt(typedQuestions)
	switch (secondAns[ProjectType]) {
		case 'frontend':
			const feAns = await fePrompt()
			result = { ...feAns, ...secondAns, ...firstAns }
			break
		case 'backend':
			const beAns = await bePrompt()
			result = { ...beAns, ...secondAns, ...firstAns }
			break
		default:
			result = { ...secondAns, ...firstAns }
			break
	}
	console.log(result)

	await generateProject(result)
	console.log(
		chalk.yellowBright(
			`😄 Success! cd ${
				result[ProjectName]
			} and yarn start to run the app, happy hacking!`
		)
	)
}

main()
