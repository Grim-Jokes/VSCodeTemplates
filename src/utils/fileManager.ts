
import * as fs from 'fs';
import { Config } from '../config';

let _manager: FileManager;

class FileManager {
    constructor(private root: string) { }

    public readFile(fileName: string) {
        return fs.readFileSync(`${this.root}/${fileName}`).toString();
    }

    public writeFile(fileName: string, data: any) {
        fs.writeFileSync(`${this.root}/${fileName}`, data);
    }
}

export function getFileManager(config: Config) {
    if (!_manager) {
        if (!config.root) {
            throw new Error("Root was not set correctly");
        }
        _manager = new FileManager(config.root);
    }
    return _manager;
}