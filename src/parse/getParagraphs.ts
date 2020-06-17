import * as util from "./utilities";
import parseCommand from "./parseCommand";
import { envDelimiters } from "./constants";
import { Content, Command } from "../types";
import parseString from "./parseString";
import parseParagraphContents from "./parseParagraphContents";

const extractNextParagraphContents = function (
    linesContent: Content[],
    rootLineNum: number
): [Content[], number] {
    const paragraphContents = [];
    let i = rootLineNum;
    while (i < linesContent.length && linesContent[i].length === 0) {
        i++;
    }
    while (i < linesContent.length && linesContent[i].length > 0) {
        paragraphContents.push(linesContent[i]);
        i++;
    }
    return [paragraphContents, i];
};

const splitIntoParagraphs = function (linesContent: Content[]): Content[] {
    const paragraphs = [];
    let i = 0;
    while (i < linesContent.length) {
        let paragraphContents: Content[];
        [paragraphContents, i] = extractNextParagraphContents(linesContent, i);
        const paragraph: Content = parseParagraphContents(paragraphContents);
        paragraphs.push(paragraph);
    }
    if (
        paragraphs.length > 0 &&
        paragraphs[paragraphs.length - 1].length === 0
    ) {
        paragraphs.splice(paragraphs.length - 1, 1);
    }
    return paragraphs;
};

const getParagraphs = function (
    lines: string[],
    lineNum: number,
    rootLineNum: number
): [Content[], Command | null, number] {
    const linesContent: Content[] = [];
    let maybeCommand = null;
    let i = lineNum;
    while (i < lines.length) {
        const line = lines[i];
        if (util.isStartOfCommand(line, 0)) {
            const [candidateCommand] = parseCommand(line, i, 0);
            if (candidateCommand.name === envDelimiters.open) {
                maybeCommand = candidateCommand;
                break;
            }
        }
        const lineContent = parseString(line, rootLineNum + i, 0);
        linesContent.push(lineContent);
        i++;
    }
    const paragraphs = splitIntoParagraphs(linesContent);
    return [paragraphs, maybeCommand, i];
};

export default getParagraphs;
