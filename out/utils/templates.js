"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function getTemplates(config) {
    if (!config.root) {
        throw new Error("Root not set correctly");
    }
    const templates = fs.readdirSync(`${config.root}/.templates`);
    return templates;
}
exports.getTemplates = getTemplates;
//# sourceMappingURL=templates.js.map