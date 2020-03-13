import * as vscode from 'vscode';
import * as path from 'path';

let workspacePaths = vscode.workspace.workspaceFolders;

let root: string;
if (workspacePaths == null) {
    throw new Error("Must have open folders in workspace");
} else {
    root = workspacePaths[0].uri.fsPath;
}

const defaultConfig: Config = {
    root,
    targetPath: root,
    templatesRoot: path.resolve(root, ".templates")
};

let customConfig;
try {
    customConfig = require(`${root}/templates.config.js`) as Config;
    /// Remove fields that need to be ignored at all costs
    /// As the values are determined a different way
    const { targetPath, ...others } = customConfig;

    /// Make sure that .templates is in the path as we open the right folder
    if (others.templatesRoot.indexOf('/.templates') == -1) {
        others.templatesRoot = path.resolve(others.templatesRoot, ".templates");
    }

    customConfig = others;
} catch (err) {
    customConfig = defaultConfig;
}

const config = {
    ...defaultConfig,
    ...customConfig,
};

export interface Config {
    root: string;
    // Store the folder where to create the templated file.
    // If it's not set, then it's the same as the root directory 
    // (i.e. using the pallete rather than that explorer)
    targetPath: string;
    templatesRoot: string;
}

export function getConfig(targetUrl?: vscode.Uri): Config {
    if (targetUrl) {
        config.targetPath = targetUrl.fsPath;
    }
    return config;
}