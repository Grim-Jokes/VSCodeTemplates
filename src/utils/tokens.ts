interface DefinedTokens {
    [index: string]: string | number;
}

export interface PreDefinedTokens extends DefinedTokens {
    /// Set the current year so people don't have to update their templates manually
    /// Went with currentYear in case "year" will be set by the users
    "currentYear": string | number;
}

type TokenValues = PreDefinedTokens & DefinedTokens;

export function replaceVariable(content: string, tokens: TokenValues) {

    for (const key in tokens) {
        let value = tokens[key];
        content = content.replace(`\${${key}}`, value as string);
    }

    return content;
}