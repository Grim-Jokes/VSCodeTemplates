import * as vscode from 'vscode';


let path = vscode.workspace.workspaceFolders;

let root;
if (path == null) {
    vscode.window.showErrorMessage("Must have open folders in workspace");
} else {
    root = path[0].uri.path;
}

const defaultConfig = {
    root
};

let customConfig;
try {
    customConfig = require(`${root}/templates.config.js`);
} catch (err) {
    customConfig = defaultConfig;
}

export const config = {
    ...defaultConfig,
    ...customConfig,
};

export interface Config {
    root?: string;
}