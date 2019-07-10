import inquirer from 'inquirer'

import { AppType } from '../contants'

const questions = [
  {
    name: AppType,
    message: 'what kind of react-native app do you want?',
    type: 'list',
    choices: ['graphql', 'customize'],
  },
]

const appPrompt = async () => {
  const answers: any = await inquirer.prompt(questions as any)
  return answers
}

export default appPrompt
