import inquirer from 'inquirer'
import {
  FrontendType,
  NeedRouter,
  StoreType,
  StyleProcessor,
} from 'src/contants'

// 1. pc h5 react-native
// 2. store
// 3. css processor
// 4. need router

const questions = [
  {
    name: FrontendType,
    message: 'what is the target of your project?',
    type: 'list',
    choices: ['web', 'react native'],
  },
  {
    name: StoreType,
    message: 'what kind of state management do you want?',
    type: 'list',
    choices: ['redux', 'mobx', 'graphql', 'nothing'],
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
  const answers: any = await inquirer.prompt(questions)
  return answers
}

export default fePrompt
