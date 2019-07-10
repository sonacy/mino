import inquirer from 'inquirer'

import { FrontendType, NeedRouter, StyleProcessor } from '../contants'

// 1. frontend type
// 2. css processor
// 3. need router

const questions = [
  {
    name: FrontendType,
    message: 'what kind of state management do you want?',
    type: 'list',
    choices: ['redux', 'mobx', 'graphql', 'customize'],
  },
  {
    name: StyleProcessor,
    message: 'what kind of css processor do you want?',
    type: 'list',
    choices: ['scss', 'less', 'stylus', 'nothing'],
  },
  {
    name: NeedRouter,
    message: 'do you need react router?',
    type: 'confirm',
  },
]

const fePrompt = async () => {
  const answers: any = await inquirer.prompt(questions as any)
  return answers
}

export default fePrompt
