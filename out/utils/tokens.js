"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function replaceVariable(content, tokens) {
    for (const key in tokens) {
        let value = tokens[key];
        content = content.replace(`\${${key}}`, value);
    }
    return content;
}
exports.replaceVariable = replaceVariable;
//# sourceMappingURL=tokens.js.map