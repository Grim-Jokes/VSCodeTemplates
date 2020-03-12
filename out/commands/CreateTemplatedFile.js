"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const path = require("path");
const config_1 = require("../config");
const fileManager_1 = require("../utils/fileManager");
const templates_1 = require("../utils/templates");
const tokens_1 = require("../utils/tokens");
function showTemplateOptions(templates) {
    return __awaiter(this, void 0, void 0, function* () {
        return vscode.window.showQuickPick(templates, {
            placeHolder: "Select the template you want to use",
            matchOnDescription: true,
            matchOnDetail: true,
        });
    });
}
function getExtension(selectedTemplate) {
    return path.extname(selectedTemplate);
}
exports.commandHandler = () => __awaiter(void 0, void 0, void 0, function* () {
    if (config_1.config.root == null) {
        vscode.window.showErrorMessage("Must have open folders in workspace");
        return;
    }
    const templates = templates_1.getTemplates(config_1.config);
    const selectedTemplateFileName = yield showTemplateOptions(templates);
    if (!selectedTemplateFileName) {
        throw new Error("A template must be selected");
    }
    const className = (yield vscode.window.showInputBox({
        placeHolder: "File name",
        prompt: "Enter the name of the file"
    })) || "ClassName";
    let content = fileManager_1.getFileManager(config_1.config)
        .readFile(`.templates/${selectedTemplateFileName}`);
    content = tokens_1.replaceVariable(content, {
        currentYear: new Date().getFullYear(),
        "className": className
    });
    let extension = getExtension(selectedTemplateFileName);
    const fileName = `${className}.${extension}`;
    fileManager_1.getFileManager(config_1.config).writeFile(fileName, content);
    vscode.workspace.openTextDocument(`${config_1.config.root}/${fileName}`);
});
//# sourceMappingURL=CreateTemplatedFile.js.map