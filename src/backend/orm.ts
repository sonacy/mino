import inquirer from 'inquirer'

import { DBType, NeedTest } from '../contants'

// 1. database -> mysql pgsql mongoose

const questions = [
  {
    name: DBType,
    message: 'what kind of database do you want?',
    type: 'list',
    choices: ['mysql', 'postgresql', 'mongoose'],
  },
  {
    name: NeedTest,
    message: 'do you need to setup test with ts-jest?',
    type: 'confirm',
  },
]

const ormPrompt = async () => {
  const answers = await inquirer.prompt(questions as any)
  return answers
}

export default ormPrompt
