/*
 * This script is intended as a workaround while Expo lands
 * official support for React Hooks.
 */

const {
  execSync
} = require('child_process')

function enableRnHooks() {
  execSync(
    'cp -R scripts/rn-renderer/* RELATIVEPATHnode_modules/react-native/Libraries/Renderer', {
      stdio: 'inherit',
    }
  )
}

enableRnHooks()