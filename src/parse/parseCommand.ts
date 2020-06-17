import * as util from "./utilities";
import parseString from "./parseString";
import { braces, brackets, Delimiter } from "./constants";
import { Content, Command, Block } from "../types";
import { Blob } from "./types";

const getName = function (str: string, rootCharNum: number): [string, number] {
    let name = "";
    let i = rootCharNum;
    while (util.isLetter(str[i])) {
        name += str[i];
        i++;
    }
    return [name, i];
};

const getOptionOrArgument = function (
    str: string,
    lineNum: number,
    rootCharNum: number,
    delimiter: Delimiter
): [Content, number] {
    const closingIndex = util.findClosingDelimiter(
        str,
        lineNum,
        rootCharNum,
        delimiter
    );
    const stringInside = str.slice(rootCharNum + 1, closingIndex);
    const content = parseString(stringInside, lineNum, rootCharNum);
    content.forEach((item: Command | string) => {
        if (typeof item !== "string") {
            item.charNum += rootCharNum + 1;
        }
    });
    return [content, closingIndex + 1];
};

const parseCommand = function (
    str: string,
    lineNum: number,
    rootCharNum: number
): [Command, number] {
    let commandLength = 0;
    let i = rootCharNum;

    // \
    i++;
    commandLength += 1;

    // name
    let name;
    [name, i] = getName(str, i);
    commandLength += name.length;

    // option
    let option = null;
    if (str[i] === brackets.open) {
        [option, i] = getOptionOrArgument(str, lineNum, i, brackets);
        commandLength += 1 + option.length + 1;
    }

    // arguments
    const args = [];
    while (str[i] === braces.open) {
        let argument: Content;
        [argument, i] = getOptionOrArgument(str, lineNum, i, braces);
        commandLength += 1 + argument.length + 1;
        args.push(argument);
    }
    const command = {
        name: name,
        option: option,
        args: args,
        charNum: rootCharNum,
    };
    return [command, i];
};

export default parseCommand;
