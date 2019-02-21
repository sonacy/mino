import inquirer from 'inquirer'
import { ServerType } from 'src/contants'
import ormPrompt from './orm'

// 1. server -> graphql restful plain

const questions = [
	{
		name: ServerType,
		message: 'what kind of server do you want?',
		type: 'list',
		choices: ['graphql', 'restful', 'customize'],
	},
]

const bePrompt = async () => {
	const answers: any = await inquirer.prompt(questions)
	switch (answers[ServerType]) {
		case 'graphql':
		case 'restful':
			const orms = await ormPrompt()
			return { ...answers, ...orms }
		default:
			return answers
	}
}

export default bePrompt
