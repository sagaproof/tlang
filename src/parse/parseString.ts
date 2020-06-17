import * as util from "./utilities";
import parseCommand from "./parseCommand";
import errors from "./errors";
import { schema } from "./registerSchema";
import { COMMENT_MARK, MATH_MARK, MATH_INLINE } from "./constants";
import { Content, Command, Block } from "../types";
import { Blob } from "./types";

const parseInlineMath = function (
    str: string,
    rootCharNum: number
): [Command, number] {
    let inMathMode = true;
    let i = rootCharNum;

    // $
    i++;

    // content
    let mathStr = "";
    while (i < str.length) {
        if (str[i] === MATH_MARK) {
            mathStr = str.slice(rootCharNum + 1, i);
            inMathMode = false;
            break;
        }
        i++;
    }
    if (inMathMode) {
        throw errors.noInlineMathClosing(rootCharNum);
    }

    // $
    i++;

    const mathContent: Content = [mathStr];
    const mathCommand: Command = {
        name: MATH_INLINE,
        option: null,
        args: [mathContent],
        charNum: rootCharNum,
    };
    return [mathCommand, i];
};

const trim = function (content: Content): void {
    let i = 0;
    while (i < content.length) {
        if (content[i] === "") {
            content.splice(i, 1);
        } else {
            i++;
        }
    }
};

const parseString = function (
    str: string,
    lineNum: number,
    rootCharNum: number
): Content {
    const content = [];
    let i = 0;
    let currentStr = "";
    while (i < str.length) {
        if (str[i] === COMMENT_MARK) {
            break;
        } else if (str[i] === MATH_MARK) {
            let mathCommand: Command;
            [mathCommand, i] = parseInlineMath(str, i);
            content.push(currentStr);
            currentStr = "";
            content.push(mathCommand);
        } else if (util.isStartOfCommand(str, i)) {
            let command: Command;
            const startOfCommandCharNum = rootCharNum + i;
            [command, i] = parseCommand(str, lineNum, i);
            if (schema.commandTypes[command.name] === undefined) {
                throw errors.undefinedCommand(
                    lineNum,
                    startOfCommandCharNum,
                    command.name
                );
            }
            content.push(currentStr);
            currentStr = "";
            content.push(command);
        } else {
            currentStr += str[i];
            i++;
        }
    }
    content.push(currentStr);
    trim(content);
    return content;
};

export default parseString;
