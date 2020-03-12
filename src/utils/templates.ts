import * as fs from 'fs';
import { Config } from '../config';

export function getTemplates(config: Config) {
    if (!config.root) {
        throw new Error("Root not set correctly");
    }
    const templates = fs.readdirSync(`${config.root}/.templates`);
    return templates;
}