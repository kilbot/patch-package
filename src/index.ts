import chalk from "chalk"
import process from "process"
import minimist from "minimist"

import { applyPatchesForApp } from "./applyPatches"
import { getAppRootPath } from "./getAppRootPath"
import { makePatch } from "./makePatch"
import { makeRegExp } from "./makeRegExp"
import { detectPackageManager } from "./detectPackageManager"
import { join } from "./path"
import { normalize, sep } from "path"
import slash = require("slash")

const appPath = getAppRootPath()
const argv = minimist(process.argv.slice(2), {
  boolean: [
    "use-yarn",
    "case-sensitive-path-filtering",
    "ignore-errors",
    "reverse",
    "help",
    "version",
  ],
  string: ["patch-dir"],
})
const packageNames = argv._

console.log(
  chalk.bold("patch-package"),
  // tslint:disable-next-line:no-var-requires
  require(join(__dirname, "../package.json")).version,
)

if (argv.version || argv.v) {
  // noop
} else if (argv.help || argv.h) {
  printHelp()
} else {
  const patchDir = slash(normalize((argv["patch-dir"] || "patches") + sep))
  if (patchDir.startsWith("/")) {
    throw new Error("--patch-dir must be a relative path")
  }
  if (packageNames.length) {
    const includePaths = makeRegExp(
      argv.include,
      "include",
      /.*/,
      argv["case-sensitive-path-filtering"],
    )
    const excludePaths = makeRegExp(
      argv.exclude,
      "exclude",
      /package\.json$/,
      argv["case-sensitive-path-filtering"],
    )
    const packageManager = detectPackageManager(
      appPath,
      argv["use-yarn"] ? "yarn" : null,
    )
    packageNames.forEach((packagePathSpecifier: string) => {
      makePatch({
        packagePathSpecifier,
        appPath,
        packageManager,
        includePaths,
        excludePaths,
        patchDir,
      })
    })
  } else {
    console.log("Applying patches...")
    const reverse = !!argv["reverse"]
    const ignoreErrors = !!argv["ignore-errors"]
    applyPatchesForApp({ appPath, reverse, ignoreErrors, patchDir })
  }
}

function printHelp() {
  console.log(`
Usage:

  1. Patching packages
  ====================

    ${chalk.bold("patch-package")}

  Without arguments, the ${chalk.bold(
    "patch-package",
  )} command will attempt to find and apply
  patch files to your project. It looks for files named like

     ./patches/<package-name>+<version>.patch

  Options:

    ${chalk.bold("--patch-dir <dirname>")}

      Specify the name for the directory in which the patch files are located.

    ${chalk.bold("--ignore-errors")}

      Try to apply all of the patches, even if some of them fail.

    ${chalk.bold("--reverse")}
        
      Un-applies all patches.

      Note that this will fail if the patched files have changed since being
      patched. In that case, you'll probably need to re-install 'node_modules'.

      This option was added to help people using CircleCI avoid an issue around caching
      and patch file updates (https://github.com/ds300/patch-package/issues/37),
      but might be useful in other contexts too.
      

  2. Creating patch files
  =======================

    ${chalk.bold("patch-package")} <package-name>${chalk.italic(
    "[ <package-name>]",
  )}

  When given package names as arguments, patch-package will create patch files
  based on any changes you've made to the versions installed by yarn/npm.

  Options:

    ${chalk.bold("--use-yarn")}

        By default, patch-package checks whether you use npm or yarn based on
        which lockfile you have. If you have both, it uses npm by default.
        Set this option to override that default and always use yarn.

    ${chalk.bold("--exclude <regexp>")}

        Ignore paths matching the regexp when creating patch files.
        Paths are relative to the root dir of the package to be patched.

        Default: 'package\\.json$'

    ${chalk.bold("--include <regexp>")}

        Only consider paths matching the regexp when creating patch files.
        Paths are relative to the root dir of the package to be patched.

        Default '.*'

    ${chalk.bold("--case-sensitive-path-filtering")}

        Make regexps used in --include or --exclude filters case-sensitive.
    
    ${chalk.bold("--patch-dir")}

        Specify the name for the directory in which to put the patch files.
`)
}
