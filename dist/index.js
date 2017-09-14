"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var process = require("process");
var applyPatches_1 = require("./applyPatches");
var getAppRootPath_1 = require("./getAppRootPath");
var patchYarn_1 = require("./patchYarn");
var makePatch_1 = require("./makePatch");
var minimist = require("minimist");
var detectPackageManager_1 = require("./detectPackageManager");
var appPath = getAppRootPath_1.default();
var argv = minimist(process.argv.slice(2), { boolean: true });
var packageNames = argv._;
if (argv.help || argv.h) {
    printHelp();
}
else {
    if (packageNames.length) {
        packageNames.forEach(function (packageName) {
            makePatch_1.default(packageName, appPath, detectPackageManager_1.default(appPath, argv["use-yarn"] ? "yarn" : null));
        });
    }
    else {
        console.log("patch-package: Applying patches...");
        if (argv["patch-yarn"]) {
            patchYarn_1.default(appPath);
        }
        applyPatches_1.default(appPath);
    }
}
function printHelp() {
    console.log("\nUsage:\n\n  1. Patching packages\n  ====================\n\n    " + chalk_1.bold("patch-package") + "\n\n  Without arguments, the " + chalk_1.bold("patch-package") + " command will attempt to find and apply\n  patch files to your project. It looks for files named like\n\n     ./patches/<package-name>+<version>.patch\n\n  Options:\n\n     " + chalk_1.bold("--patch-yarn") + "\n\n         If you have a local copy of yarn installed for the project, this\n         option causes it to be patched so that it runs the 'prepare'\n         lifecycle hook after `yarn remove`.\n\n         See https://github.com/ds300/patch-package#why-patch-yarn\n\n  2. Creating patch files\n  =======================\n\n    " + chalk_1.bold("patch-package") + " <package-name>" + chalk_1.italic("[ <package-name>]") + "\n\n  When given package names as arguments, patch-package will create patch files\n  based on any changes you've made to the versions installed by yarn/npm.\n\n  Options:\n\n     " + chalk_1.bold("--use-yarn") + "\n\n         By default, patch-package checks whether you use npm or yarn based on\n         which lockfile you have. If you have both, it uses npm by default.\n         Set this option to override that default and always use yarn.\n");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBb0M7QUFDcEMsaUNBQWtDO0FBQ2xDLCtDQUF5QztBQUN6QyxtREFBNkM7QUFDN0MseUNBQW1DO0FBQ25DLHlDQUFtQztBQUNuQyxtQ0FBb0M7QUFDcEMsK0RBQXlEO0FBRXpELElBQU0sT0FBTyxHQUFHLHdCQUFjLEVBQUUsQ0FBQTtBQUNoQyxJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUMvRCxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBRTNCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEIsU0FBUyxFQUFFLENBQUE7QUFDYixDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDTixFQUFFLENBQUMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4QixZQUFZLENBQUMsT0FBTyxDQUFDLFVBQUMsV0FBbUI7WUFDdkMsbUJBQVMsQ0FDUCxXQUFXLEVBQ1gsT0FBTyxFQUNQLDhCQUFvQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUNoRSxDQUFBO1FBQ0gsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUE7UUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixtQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3BCLENBQUM7UUFDRCxzQkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7QUFDSCxDQUFDO0FBRUQ7SUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHVFQU1SLFlBQUksQ0FBQyxlQUFlLENBQUMscUNBRUEsWUFBSSxDQUMzQixlQUFlLENBQ2hCLHFMQU9JLFlBQUksQ0FBQyxjQUFjLENBQUMsZ1ZBV3JCLFlBQUksQ0FBQyxlQUFlLENBQUMsdUJBQWtCLGNBQU0sQ0FBQyxtQkFBbUIsQ0FBQyw0TEFPakUsWUFBSSxDQUFDLFlBQVksQ0FBQyw4T0FLeEIsQ0FBQyxDQUFBO0FBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJvbGQsIGl0YWxpYyB9IGZyb20gXCJjaGFsa1wiXG5pbXBvcnQgKiBhcyBwcm9jZXNzIGZyb20gXCJwcm9jZXNzXCJcbmltcG9ydCBhcHBseVBhdGNoZXMgZnJvbSBcIi4vYXBwbHlQYXRjaGVzXCJcbmltcG9ydCBnZXRBcHBSb290UGF0aCBmcm9tIFwiLi9nZXRBcHBSb290UGF0aFwiXG5pbXBvcnQgcGF0Y2hZYXJuIGZyb20gXCIuL3BhdGNoWWFyblwiXG5pbXBvcnQgbWFrZVBhdGNoIGZyb20gXCIuL21ha2VQYXRjaFwiXG5pbXBvcnQgKiBhcyBtaW5pbWlzdCBmcm9tIFwibWluaW1pc3RcIlxuaW1wb3J0IGRldGVjdFBhY2thZ2VNYW5hZ2VyIGZyb20gXCIuL2RldGVjdFBhY2thZ2VNYW5hZ2VyXCJcblxuY29uc3QgYXBwUGF0aCA9IGdldEFwcFJvb3RQYXRoKClcbmNvbnN0IGFyZ3YgPSBtaW5pbWlzdChwcm9jZXNzLmFyZ3Yuc2xpY2UoMiksIHsgYm9vbGVhbjogdHJ1ZSB9KVxuY29uc3QgcGFja2FnZU5hbWVzID0gYXJndi5fXG5cbmlmIChhcmd2LmhlbHAgfHwgYXJndi5oKSB7XG4gIHByaW50SGVscCgpXG59IGVsc2Uge1xuICBpZiAocGFja2FnZU5hbWVzLmxlbmd0aCkge1xuICAgIHBhY2thZ2VOYW1lcy5mb3JFYWNoKChwYWNrYWdlTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBtYWtlUGF0Y2goXG4gICAgICAgIHBhY2thZ2VOYW1lLFxuICAgICAgICBhcHBQYXRoLFxuICAgICAgICBkZXRlY3RQYWNrYWdlTWFuYWdlcihhcHBQYXRoLCBhcmd2W1widXNlLXlhcm5cIl0gPyBcInlhcm5cIiA6IG51bGwpLFxuICAgICAgKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coXCJwYXRjaC1wYWNrYWdlOiBBcHBseWluZyBwYXRjaGVzLi4uXCIpXG4gICAgaWYgKGFyZ3ZbXCJwYXRjaC15YXJuXCJdKSB7XG4gICAgICBwYXRjaFlhcm4oYXBwUGF0aClcbiAgICB9XG4gICAgYXBwbHlQYXRjaGVzKGFwcFBhdGgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcHJpbnRIZWxwKCkge1xuICBjb25zb2xlLmxvZyhgXG5Vc2FnZTpcblxuICAxLiBQYXRjaGluZyBwYWNrYWdlc1xuICA9PT09PT09PT09PT09PT09PT09PVxuXG4gICAgJHtib2xkKFwicGF0Y2gtcGFja2FnZVwiKX1cblxuICBXaXRob3V0IGFyZ3VtZW50cywgdGhlICR7Ym9sZChcbiAgICBcInBhdGNoLXBhY2thZ2VcIixcbiAgKX0gY29tbWFuZCB3aWxsIGF0dGVtcHQgdG8gZmluZCBhbmQgYXBwbHlcbiAgcGF0Y2ggZmlsZXMgdG8geW91ciBwcm9qZWN0LiBJdCBsb29rcyBmb3IgZmlsZXMgbmFtZWQgbGlrZVxuXG4gICAgIC4vcGF0Y2hlcy88cGFja2FnZS1uYW1lPis8dmVyc2lvbj4ucGF0Y2hcblxuICBPcHRpb25zOlxuXG4gICAgICR7Ym9sZChcIi0tcGF0Y2gteWFyblwiKX1cblxuICAgICAgICAgSWYgeW91IGhhdmUgYSBsb2NhbCBjb3B5IG9mIHlhcm4gaW5zdGFsbGVkIGZvciB0aGUgcHJvamVjdCwgdGhpc1xuICAgICAgICAgb3B0aW9uIGNhdXNlcyBpdCB0byBiZSBwYXRjaGVkIHNvIHRoYXQgaXQgcnVucyB0aGUgJ3ByZXBhcmUnXG4gICAgICAgICBsaWZlY3ljbGUgaG9vayBhZnRlciBcXGB5YXJuIHJlbW92ZVxcYC5cblxuICAgICAgICAgU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9kczMwMC9wYXRjaC1wYWNrYWdlI3doeS1wYXRjaC15YXJuXG5cbiAgMi4gQ3JlYXRpbmcgcGF0Y2ggZmlsZXNcbiAgPT09PT09PT09PT09PT09PT09PT09PT1cblxuICAgICR7Ym9sZChcInBhdGNoLXBhY2thZ2VcIil9IDxwYWNrYWdlLW5hbWU+JHtpdGFsaWMoXCJbIDxwYWNrYWdlLW5hbWU+XVwiKX1cblxuICBXaGVuIGdpdmVuIHBhY2thZ2UgbmFtZXMgYXMgYXJndW1lbnRzLCBwYXRjaC1wYWNrYWdlIHdpbGwgY3JlYXRlIHBhdGNoIGZpbGVzXG4gIGJhc2VkIG9uIGFueSBjaGFuZ2VzIHlvdSd2ZSBtYWRlIHRvIHRoZSB2ZXJzaW9ucyBpbnN0YWxsZWQgYnkgeWFybi9ucG0uXG5cbiAgT3B0aW9uczpcblxuICAgICAke2JvbGQoXCItLXVzZS15YXJuXCIpfVxuXG4gICAgICAgICBCeSBkZWZhdWx0LCBwYXRjaC1wYWNrYWdlIGNoZWNrcyB3aGV0aGVyIHlvdSB1c2UgbnBtIG9yIHlhcm4gYmFzZWQgb25cbiAgICAgICAgIHdoaWNoIGxvY2tmaWxlIHlvdSBoYXZlLiBJZiB5b3UgaGF2ZSBib3RoLCBpdCB1c2VzIG5wbSBieSBkZWZhdWx0LlxuICAgICAgICAgU2V0IHRoaXMgb3B0aW9uIHRvIG92ZXJyaWRlIHRoYXQgZGVmYXVsdCBhbmQgYWx3YXlzIHVzZSB5YXJuLlxuYClcbn1cbiJdfQ==