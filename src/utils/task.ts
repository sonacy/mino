import execa from 'execa'
import fs from 'fs-extra'
import Listr from 'listr'
import ncu from 'npm-check-updates'
import { IProjectJson } from '..'
import { writeToDest } from './copy'

export const run = async (
	srcDir: string,
	destDir: string,
	result: IProjectJson,
	isWorkSpace: boolean = false,
	spaceName: string = ''
) => {
	if (isWorkSpace) {
		const tasks = new Listr([
			{
				title: 'copy templates to workspaces',
				task: async () => {
					await writeToDest(srcDir, destDir, result, spaceName)
				},
			},
			{
				title: 'update pkgs to latest version',
				task: async () => {
					const newPkg = await ncu.run({
						packageData: fs.readFileSync(`${destDir}/package.json`, 'utf-8'),
						jsonAll: true,
					})
					fs.writeJSONSync(`${destDir}/package.json`, newPkg, {
						spaces: 2,
						encoding: 'utf-8',
					})
				},
			},
		])

		try {
			await tasks.run()
		} catch (errs) {
			console.log(errs)
		}
	} else {
		const tasks = new Listr([
			{
				title: 'generate project',
				task: async () => {
					await writeToDest(srcDir, destDir, result)
				},
			},
			{
				title: 'update pkgs to latest version',
				task: async () => {
					const newPkg = await ncu.run({
						packageData: fs.readFileSync(`${destDir}/package.json`, 'utf-8'),
						jsonAll: true,
					})
					fs.writeJSONSync(`${destDir}/package.json`, newPkg, {
						spaces: 2,
						encoding: 'utf-8',
					})
				},
			},
			{
				title: 'Install package dependencies with Yarn',
				task: (ctx, task) =>
					execa('yarn', {
						cwd: destDir,
					}).catch(() => {
						ctx.yarn = false

						task.skip(
							'Yarn not available, install it via `npm install -g yarn`'
						)
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
}
