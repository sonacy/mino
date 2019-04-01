import chalk from 'chalk'
import fs from 'fs-extra'
import inquirer from 'inquirer'
import path from 'path'
import { IProjectJson } from '..'
import bePrompt from '../backend'
import {
	ExistPath,
	FrontendType,
	ProjectName,
	ProjectType,
	ServerType,
} from '../contants'
import fePrompt from '../frontend'
import { run } from '../utils/task'

const packageNameQuestion = [
	{
		name: ProjectName,
		type: 'input',
		message: 'add one package into the worksapce: ',
		validate: (input: string) => {
			if (/^([a-zA-Z\-\_\d])+$/.test(input)) {
				return true
			} else {
				return 'package name may only include letters, numbers, underscores'
			}
		},
	},
]

const existQuestion = [
	{
		name: ExistPath,
		type: 'list',
		message: 'package name has already exist, choose what you want?',
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

const endQuestion = [
	{
		name: 'workspace-end',
		type: 'confirm',
		message: 'would you like to add one more package into workspace?',
	},
]

async function generateProject(
	result: IProjectJson,
	targetDir: string,
	spaceName: string
) {
	await fs.ensureDir(targetDir)
	let srcDir
	if (result[ProjectType] === 'frontend') {
		srcDir = path.resolve(
			__dirname,
			`../../templates/frontend/${result[FrontendType]}`
		)
	} else {
		// backend
		srcDir = path.resolve(
			__dirname,
			`../../templates/backend/${result[ServerType]}`
		)
	}
	await run(srcDir, targetDir, result, true, spaceName)
}

const worksapcePromt = async (baseTargetPath: string, spaceName: string) => {
	const firstAns: IProjectJson = await inquirer.prompt(packageNameQuestion)
	const targetPath = `${baseTargetPath}/${firstAns[ProjectName]}`
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

	await generateProject(result, targetPath, spaceName)

	const endResult: any = await inquirer.prompt(endQuestion)
	if (endResult['workspace-end']) {
		await worksapcePromt(baseTargetPath, spaceName)
	} else {
		console.log(
			chalk.yellowBright(
				`😄 Success! cd ${spaceName} and yarn install, happy hacking!`
			)
		)
	}
}

export default worksapcePromt
