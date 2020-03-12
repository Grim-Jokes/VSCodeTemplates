"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const CreateTemplatedFile_1 = require("./commands/CreateTemplatedFile");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const commandId = 'extension.CreateTemplatedFile';
    let disposable = vscode.commands.registerCommand(commandId, CreateTemplatedFile_1.commandHandler);
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map