import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { getConfig } from '../config';
import { getFileManager } from '../utils/fileManager';
import { getTemplates } from '../utils/templates';
import { replaceVariable } from '../utils/tokens';

async function showTemplateOptions(templates: string[]) {
    return vscode.window.showQuickPick(
        templates,
        {
            placeHolder: "Select the template you want to use",
            matchOnDescription: true,
            matchOnDetail: true,
        }
    );
}

function getExtension(selectedTemplate: string) {
    return path.extname(selectedTemplate);
}

async function showDocument(fullPath: string) {
    const doc = await vscode.workspace.openTextDocument(fullPath);
    vscode.window.showTextDocument(doc);
}

export const commandHandler = async (targetUri: vscode.Uri) => {
    try {
        const config = getConfig(targetUri);

        if (config.root == null) {
            vscode.window.showErrorMessage("Must have open folders in workspace");
            return;
        }

        const templates: string[] = getTemplates(config);

        const selectedTemplateFileName = await showTemplateOptions(templates);

        if (!selectedTemplateFileName) {
            throw new Error("A template must be selected");
        }

        const className = await vscode.window.showInputBox({
            placeHolder: "File name",
            prompt: "Enter the name of the file"
        }) || "ClassName";

        let content = getFileManager()
            .readFile(path.resolve(config.templatesRoot, selectedTemplateFileName));


        content = replaceVariable(content, {
            currentYear: new Date().getFullYear(),
            "className": className
        });

        let extension = getExtension(selectedTemplateFileName);
        const fileName = `${className}${extension}`;
        const fullPath = getFileManager().writeFile(path.resolve(config.targetPath, fileName), content);

        showDocument(fullPath);
    }
    catch (err) {
        vscode.window.showErrorMessage(err);
        return 1;
    }
};