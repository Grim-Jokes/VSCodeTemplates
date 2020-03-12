"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
let _manager;
class FileManager {
    constructor(root) {
        this.root = root;
    }
    readFile(fileName) {
        return fs.readFileSync(`${this.root}/${fileName}`).toString();
    }
    writeFile(fileName, data) {
        fs.writeFileSync(`${this.root}/${fileName}`, data);
    }
}
function getFileManager(config) {
    if (!_manager) {
        if (!config.root) {
            throw new Error("Root was not set correctly");
        }
        _manager = new FileManager(config.root);
    }
    return _manager;
}
exports.getFileManager = getFileManager;
//# sourceMappingURL=fileManager.js.map