import * as vscode from 'vscode';

import { commandHandler } from './commands/CreateTemplatedFile';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const commandId = 'extension.CreateTemplatedFile';

	let disposable = vscode.commands.registerCommand(commandId, commandHandler);
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
