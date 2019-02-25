import fs from 'fs-extra'
import { IProjectJson } from '..'
import css from './css'
import db from './db'
import testJson from './test'

export const writeToDest = async (
  srcDir: string,
  destDir: string,
  result: IProjectJson
) => {
  const {
    'project-name': projectName,
    'project-type': projectType,
    'server-type': serverType,
    'database-type': dbType,
    'need-test': needTest,
    'need-router': needRouter,
    'style-processor': styleProcessor,
    'store-type': storeType,
  } = result

  await fs.copy(srcDir, destDir, {
    filter: src => {
      if (src.includes('node_modules')) {
        return false
      }
      if (src.includes('.lock')) {
        return false
      }
      if (src.includes('.log')) {
        return false
      }

      if (projectType === 'backend' && serverType === 'graphql' && !needTest) {
        if (src.includes('test') || src.includes('jest')) {
          return false
        }
      }

      if (projectType === 'frontend') {
        if (needRouter) {
          if (src.includes('App1')) {
            return false
          }
        } else {
          if (src.includes('routes') || src.includes('App2')) {
            return false
          }
        }
      }
      return true
    },
  })
  await changeContent(`${destDir}/package.json`, (content: string) => {
    return content.replace('mino', projectName)
  })
  await changeContent(`${destDir}/readme.md`, (content: string) => {
    return content.replace('minoTitle', projectName)
  })

  // change db type
  if (projectType === 'backend') {
    if (serverType === 'graphql') {
      const dbJson = db[dbType!]

      await changeContent(`${destDir}/package.json`, (content: string) => {
        const pkg = content.replace('dbDrive', dbJson.drive)
        return pkg
          .replace(' - TestPkg', needTest ? testJson.TestPkg : '')
          .replace(' - TestCli', needTest ? testJson.TestCli : '')
      })

      await changeContent(`${destDir}/ormconfig.json`, (content: string) => {
        return content
          .replace('minoType', dbType!)
          .replace('minoPort', dbJson.port)
          .replace('minoDB', `${projectName}-ts-graphql`)
      })
      if (needTest) {
        await changeContent(
          `${destDir}/src/test-util/testConn.ts`,
          (content: string) => {
            return content
              .replace('minoType', dbType!)
              .replace('minoPort', dbJson.port)
              .replace('minoDB', `${projectName}-ts-graphql-test`)
          }
        )
      }
    }
  } else {
    const stylePkg =
      styleProcessor === 'stylus'
        ? `,
		"stylus-loader": "^3.0.2",
    "stylus": "^0.54.5"`
        : styleProcessor === 'scss'
        ? `,
		"node-sass": "^4.11.0",
		"sass-loader": "^7.1.0"`
        : ''

    await changeContent(`${destDir}/package.json`, (content: string) => {
      return content
        .replace(
          ' - Router',
          needRouter
            ? `,
		"react-router-dom": "^4.3.1"`
            : ''
        )
        .replace(
          ' - RouterDev',
          needRouter
            ? `,
		"@types/react-router-dom": "^4.3.1"`
            : ''
        )
        .replace(' - StyleDev', stylePkg)
    })
    if (needRouter) {
      await fs.rename(`${destDir}/src/App2.tsx`, `${destDir}/src/App.tsx`)
    } else {
      await fs.rename(`${destDir}/src/App1.tsx`, `${destDir}/src/App.tsx`)
    }

    await changeContent(
      `${destDir}/build/webpack.base.conf.js`,
      (content: string) => {
        return content.replace('StyleProcessor,', css[styleProcessor!])
      }
    )

    if (storeType !== 'nothing') {
      await fs.copy(
        `${srcDir}/src/routes/main/index.tsx`,
        `${destDir}/src/Main.tsx`
      )
    }
  }
}

const changeContent = async (
  filepath: string,
  cb: (content: string) => string
) => {
  const content = await fs.readFile(filepath, {
    encoding: 'utf8',
  })
  const newContent = cb(content)
  await fs.writeFile(filepath, newContent)
}
