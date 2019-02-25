import execa from 'execa'
import Listr from 'listr'
import { IProjectJson } from '..'
import { writeToDest } from './copy'

export const run = async (
  srcDir: string,
  destDir: string,
  result: IProjectJson
) => {
  const tasks = new Listr([
    {
      title: 'generate project',
      task: async () => {
        await writeToDest(srcDir, destDir, result)
      },
    },
    {
      title: 'Install package dependencies with Yarn',
      task: (ctx, task) =>
        execa('yarn', {
          cwd: destDir,
        }).catch(() => {
          ctx.yarn = false

          task.skip('Yarn not available, install it via `npm install -g yarn`')
        }),
    },
    {
      title: 'Install package dependencies with npm',
      enabled: ctx => ctx.yarn === false,
      task: () =>
        execa('npm', ['install'], {
          cwd: destDir,
        }),
    },
  ])

  try {
    await tasks.run()
  } catch (errs) {
    console.log(errs)
  }
}
