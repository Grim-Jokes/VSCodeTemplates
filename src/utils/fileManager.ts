
import * as fs from 'fs';
import { Config } from '../config';

let _manager: FileManager;

class FileManager {
    constructor() { }

    public readFile(filePath: string) {
        return fs.readFileSync(`${filePath}`).toString();
    }

    public writeFile(filePath: string, data: any) {
        fs.writeFileSync(filePath, data);

        return filePath;
    }
}

export function getFileManager() {
    if (!_manager) {
        _manager = new FileManager();
    }
    return _manager;
}