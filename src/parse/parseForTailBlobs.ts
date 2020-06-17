import * as util from "./utilities";
import parseCommand from "./parseCommand";
import { Content, Command, Block } from "../types";
import { Blob } from "./types";

interface TailCommandInfo {
    command: Command;
    lineNum: number;
}

const getTailCommandsInfo = function (
    lines: string[],
    tailName: string
): TailCommandInfo[] {
    const tailCommandsInfo: TailCommandInfo[] = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (util.isStartOfCommand(line, 0)) {
            const [command, endCharNum] = parseCommand(line, i, 0);
            const isTailCommand =
                endCharNum === line.length && tailName === command.name;
            if (isTailCommand) {
                tailCommandsInfo.push({
                    command: command,
                    lineNum: i,
                });
            }
        }
    }
    return tailCommandsInfo;
};

const parseForTailBlobs = function (
    lines: string[],
    rootLineNum: number,
    tailName: string
): [string[], Blob[]] {
    const tailCommandsInfo = getTailCommandsInfo(lines, tailName);
    if (tailCommandsInfo.length === 0) {
        const bodyLines = lines;
        const tailBlobs: Blob[] = [];
        return [bodyLines, tailBlobs];
    } else {
        const bodyLines = lines.slice(0, tailCommandsInfo[0].lineNum);
        const tailBlobs = tailCommandsInfo.map(
            (tailCommandInfo, tailCommandNum) => {
                const tailBlob: Blob = {
                    name: tailCommandInfo.command.name,
                    option: tailCommandInfo.command.option,
                    args: tailCommandInfo.command.args,
                    lineNum: rootLineNum + tailCommandInfo.lineNum + 1,
                    lines: [],
                };
                if (tailCommandNum + 1 === tailCommandsInfo.length) {
                    tailBlob.lines = lines.slice(
                        tailCommandInfo.lineNum + 1,
                        lines.length
                    );
                } else {
                    const nextTailCommandLineNum =
                        tailCommandsInfo[tailCommandNum + 1].lineNum;
                    tailBlob.lines = lines.slice(
                        tailCommandInfo.lineNum + 1,
                        nextTailCommandLineNum
                    );
                }
                return tailBlob;
            }
        );
        return [bodyLines, tailBlobs];
    }
};

export default parseForTailBlobs;
