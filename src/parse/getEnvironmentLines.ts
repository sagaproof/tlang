import * as util from "./utilities";
import errors from "./errors";
import parseCommand from "./parseCommand";
import { envDelimiters, TAB_SPACES } from "./constants";

const stripIndentations = function (indentedLines: string[]): string[] {
    return indentedLines.map((indentedLine) => {
        if (indentedLine.length === 0) {
            return indentedLine;
        } else {
            return indentedLine.slice(TAB_SPACES, indentedLine.length);
        }
    });
};

const lineIsIndented = function (line: string): boolean {
    return !/\S/.test(line.slice(0, TAB_SPACES));
};

const findEnvClosing = function (
    lines: string[],
    rootLineNum: number,
    openingLineNum: number,
    envName: string
): number {
    let i = openingLineNum;
    i++;
    while (i < lines.length) {
        const line = lines[i];
        if (util.isStartOfCommand(line, 0)) {
            const [command] = parseCommand(line, rootLineNum + i, 0);
            if (command.name !== envDelimiters.close) {
                throw errors.env.wrongClosingCommand(rootLineNum + i, envName);
            }
            if (command.option !== null) {
                throw errors.env.closingOption(rootLineNum + i);
            }
            if (command.args.length === 0) {
                throw errors.env.noClosingName(rootLineNum + i);
            }
            const firstArgumentContent = command.args[0];
            if (
                firstArgumentContent.length !== 1 ||
                typeof firstArgumentContent[0] !== "string" ||
                firstArgumentContent[0] !== envName
            ) {
                throw errors.env.wrongClosingName(
                    rootLineNum + i,
                    envName,
                    rootLineNum + openingLineNum
                );
            }
            if (command.args.length > 1) {
                throw errors.env.multipleClosingArgs(rootLineNum + i);
            }
            break;
        }
        if (!lineIsIndented(line)) {
            throw errors.env.notIndented(
                rootLineNum + i,
                envName,
                rootLineNum + openingLineNum
            );
        }
        i++;
    }
    return i;
};

const getEnvironmentLines = function (
    lines: string[],
    rootLineNum: number,
    openingLineNum: number,
    envName: string
): [string[], number] {
    const closingLineNum = findEnvClosing(
        lines,
        rootLineNum,
        openingLineNum,
        envName
    );
    const indentedEnvLines = lines.slice(openingLineNum + 1, closingLineNum);
    const envLinesBlob = stripIndentations(indentedEnvLines);
    return [envLinesBlob, closingLineNum];
};

export default getEnvironmentLines;
