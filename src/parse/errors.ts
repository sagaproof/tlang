import { Delimiter, envDelimiters } from "./constants";

const errors = {
    undefinedEnv: (i: number, envName: string) =>
        Error(
            `line ${i}: encountered environment type '${envName}' undefined in the schema.`
        ),
    undefinedCommand: (i: number, charNum: number, commandName: string) =>
        Error(
            `line ${
                i + 1
            }: undefined command name '${commandName}' at character ${charNum} (after indentation)`
        ),
    noClosingDelimiter: (
        i: number,
        rootCharNum: number,
        delimiter: Delimiter
    ) =>
        Error(
            `line ${i + 1}: could not find closing delimiter to '${
                delimiter.open
            }' at character ${rootCharNum + 1} (after indentation)`
        ),
    noInlineMathClosing: (rootCharNum: number) =>
        Error(
            `inline math starting at ${
                rootCharNum + 1
            } needs closing (on same line)`
        ),
    env: {
        openingOption: (i: number) =>
            Error(
                `line ${
                    i + 1
                }: opening environment commands do not accept options`
            ),
        noOpeningName: (i: number) =>
            Error(
                `line ${i + 1}: opening environment command lacks name argument`
            ),
        wrongOpeningName: (i: number) =>
            Error(
                `first arg to opening to command should be a string, no commands allowed`
            ),
        unsupportedEnv: (i: number, envName: string) =>
            Error(
                `line ${
                    i + 1
                }: the '${envName}' environment is not supported in the current module`
            ),
        wrongClosingCommand: (i: number, envName: string) =>
            Error(
                `line ${i + 1}: to close '${envName}' environment use the '\\${
                    envDelimiters.close
                }' command`
            ),
        closingOption: (i: number) =>
            Error(
                `line ${
                    i + 1
                }: closing environment commands do not accept options`
            ),
        noClosingName: (i: number) =>
            Error(
                `line ${i + 1}: closing environment command lacks name argument`
            ),
        wrongClosingName: (
            closingLineNum: number,
            envName: string,
            openingLineNum: number
        ) =>
            Error(
                `line ${
                    closingLineNum + 1
                }: closing environment command should target the '${envName}' environment opened on line ${
                    openingLineNum + 1
                }`
            ),
        multipleClosingArgs: (i: number) =>
            Error(
                `line ${
                    i + 1
                }: closing environment commands do not accept auxiliary arguments`
            ),
        notIndented: (i: number, envName: string, openingLineNum: number) =>
            Error(
                `line ${
                    i + 1
                }: lines must be indented until environment '${envName}' (opened on line ${
                    openingLineNum + 1
                }) is closed`
            ),
    },
};

export default errors;
