import chalk from 'chalk'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import appPrompt from './app'
import bePrompt from './backend'
import {
	AppType,
	DBType,
	ExistPath,
	FrontendType,
	NeedRouter,
	NeedTest,
	ProjectName,
	ProjectType,
	ServerType,
	StyleProcessor,
} from './contants'
import fePrompt from './frontend'
import { run } from './utils/task'
import worksapcePromt from './workspace'

// 1. project name -> input
// 2. front backend app workspaces

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
		choices: ['frontend', 'backend', 'app', 'workspace'],
	},
]

export interface IProjectJson {
	[ProjectName]: string
	[ProjectType]: 'frontend' | 'backend' | 'workspace' | 'app'
	[ServerType]?: 'graphql' | 'restful' | 'customize'
	[DBType]?: 'mysql' | 'postgresql' | 'mongoose'
	[NeedTest]?: boolean
	[FrontendType]?: 'redux' | 'mobx' | 'graphql' | 'customize'
	[NeedRouter]?: boolean
	[StyleProcessor]?: 'scss' | 'less' | 'stylus' | 'nothing'
	[ExistPath]?: 'empty' | 'overwrite' | 'quit'
	[AppType]?: 'graphql' | 'customize'
}

async function generateProject(result: IProjectJson) {
	const {
		'project-name': projectName,
		'project-type': projectType,
		'frontend-type': frontendType,
		'server-type': serverType,
		'app-type': appType,
	} = result
	const targetDir = `${process.cwd()}/${projectName}`

	await fs.ensureDir(targetDir)
	let srcDir
	if (projectType === 'frontend') {
		srcDir = path.resolve(__dirname, `../templates/frontend/${frontendType}`)
	} else if (projectType === 'backend') {
		// backend
		srcDir = path.resolve(__dirname, `../templates/backend/${serverType}`)
	} else if (projectType === 'app') {
		srcDir = path.resolve(__dirname, `../templates/app/${appType}`)
	} else {
		srcDir = path.resolve(__dirname, `../templates/workspace`)
	}
	await run(srcDir, targetDir, result, projectType === 'workspace')
}

const main = async () => {
	const firstAns: IProjectJson = await inquirer.prompt(projectNameQuestion as any)
	const targetPath = `${process.cwd()}/${firstAns[ProjectName]}`
	const isExist = await fs.pathExists(targetPath)
	if (isExist) {
		const existAns: IProjectJson = await inquirer.prompt(existQuestion as any)
		if (existAns[ExistPath] === 'empty') {
			await fs.remove(targetPath)
		} else if (existAns[ExistPath] === 'quit') {
			return
		}
	}

	let result
	const secondAns: IProjectJson = await inquirer.prompt(typedQuestions as any)
	switch (secondAns[ProjectType]) {
		case 'frontend':
			const feAns = await fePrompt()
			result = { ...feAns, ...secondAns, ...firstAns }
			break
		case 'app':
			const appAns = await appPrompt()
			result = { ...appAns, ...secondAns, ...firstAns }
			break
		case 'backend':
			const beAns = await bePrompt()
			result = { ...beAns, ...secondAns, ...firstAns }
			break
		case 'workspace':
			const wsPath = `${targetPath}/packages`
			await fs.ensureDir(wsPath)
			await worksapcePromt(wsPath, firstAns[ProjectName])
			result = { ...secondAns, ...firstAns }
			break
		default:
			result = { ...secondAns, ...firstAns }
			break
	}

	await generateProject(result)
	if (secondAns[ProjectType] !== 'workspace') {
		console.log(
			chalk.yellowBright(
				`😄 Success! cd ${
					result[ProjectName]
				} and yarn start to run the app, happy hacking!`
			)
		)
	}
}

export default main
