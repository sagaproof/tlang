import errors from "./errors";
import { Delimiter } from "./constants";

export const findClosingDelimiter = function (
    str: string,
    lineNum: number,
    rootCharNum: number,
    delimiter: Delimiter
): number {
    let level = 1;
    let i = rootCharNum + 1;
    while (i < str.length) {
        if (str[i] === delimiter.open) {
            if (!isEscape(str[i - 1]) || isEscape(str[i - 2])) {
                level++;
            }
        }
        if (str[i] === delimiter.close) {
            if (!isEscape(str[i - 1]) || isEscape(str[i - 2])) {
                level--;
            }
        }
        if (level === 0) {
            break;
        }
        i++;
    }
    if (level !== 0) {
        throw errors.noClosingDelimiter(lineNum, rootCharNum, delimiter);
    }
    return i;
};

export const isStartOfCommand = function (str: string, i: number): boolean {
    return (
        // str[i - 1] ? !isEscape(str[i - 1]) : true
        // &&
        str[i] !== undefined &&
        isEscape(str[i]) &&
        str[i + 1] !== undefined &&
        isLetter(str[i + 1])
    );
};

export const isEscape = function (char: string): boolean {
    return char === "\\";
};

export const isLetter = function (char: string): boolean {
    return char !== undefined && /[A-Za-z]/.test(char);
};
