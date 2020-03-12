"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TemplateManager {
    constructor(basePath) {
        this.basePath = basePath;
    }
}
let _manager;
function getTemplateManager(config) {
    if (!_manager) {
        _manager = new TemplateManager(config.root);
    }
    return _manager;
}
exports.getTemplateManager = getTemplateManager;
//# sourceMappingURL=templateManager.js.map