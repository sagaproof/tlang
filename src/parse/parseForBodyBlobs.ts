import * as util from "./utilities";
import parseCommand from "./parseCommand";
import errors from "./errors";
import getEnvironmentLines from "./getEnvironmentLines";
import getParagraphs from "./getParagraphs";
import { envDelimiters, TAB_SPACES } from "./constants";
import { Content, Command, Block } from "../types";
import { Blob } from "./types";

const parseForBodyBlobs = function (
    lines: string[],
    rootLineNum: number
): (Content | Blob)[] {
    const bodyBlobs = [];
    let i = 0;
    while (i < lines.length) {
        let paragraphs: Content[];
        let maybeCommand: Command | null;
        [paragraphs, maybeCommand, i] = getParagraphs(lines, i, rootLineNum);
        paragraphs.forEach((paragraph) => {
            bodyBlobs.push(paragraph);
        });
        if (maybeCommand === null) {
            return bodyBlobs;
        }
        const command = maybeCommand;
        if (command.option !== null) {
            throw errors.env.openingOption(i);
        }
        if (command.args.length === 0) {
            throw errors.env.noOpeningName(i);
        }
        const firstArgumentContent = command.args[0];
        if (
            firstArgumentContent.length !== 1 ||
            typeof firstArgumentContent[0] !== "string"
        ) {
            throw errors.env.wrongOpeningName(i);
        }
        const commandLineNum = i;
        const envName = firstArgumentContent[0];
        let envLines: string[];
        [envLines, i] = getEnvironmentLines(lines, rootLineNum, i, envName);
        const envBlob = {
            name: envName,
            option: command.option,
            args: command.args.slice(1),
            lineNum: rootLineNum + commandLineNum + 1,
            lines: envLines,
        };
        bodyBlobs.push(envBlob);
        i++;
    }
    return bodyBlobs;
};

export default parseForBodyBlobs;
