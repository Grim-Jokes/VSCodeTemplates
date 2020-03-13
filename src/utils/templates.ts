import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../config';

export function getTemplates(config: Config): string[] {

    if (!fs.existsSync(config.templatesRoot)) {
        fs.mkdirSync(config.templatesRoot);
        return [];
    } else {
        const templates = fs.readdirSync(config.templatesRoot);
        return templates;
    }
}