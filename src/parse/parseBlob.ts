import * as util from "./utilities";
import parseForTailBlobs from "./parseForTailBlobs";
import parseForBodyBlobs from "./parseForBodyBlobs";
import { getEnvTailNames, schema } from "./registerSchema";
import { Content, Command, Block, EnvTypes } from "../types";
import { Blob } from "./types";

const parseBlob = function (blob: Blob, tailNames: string[]): Block {
    if (schema.mathEnvs.indexOf(blob.name) >= 0) {
        return {
            name: blob.name,
            option: blob.option,
            args: blob.args,
            lineNum: blob.lineNum,
            bodyChildren: blob.lines.map((line) => [line]),
            tailChildren: [],
        };
    }

    const [bodyLines, tailBlobs]: [string[], Blob[]] =
        tailNames.length > 0
            ? parseForTailBlobs(blob.lines, blob.lineNum, tailNames[0])
            : [blob.lines, []];

    const bodyBlobs: (Content | Blob)[] = parseForBodyBlobs(
        bodyLines,
        blob.lineNum
    );

    const tailBlocks: Block[] = tailBlobs.map((tailBlob) => {
        const tailBlockTailNames = tailNames.slice(1);
        return parseBlob(tailBlob, tailBlockTailNames);
    });

    const bodyChildren = bodyBlobs.map((bodyBlob) => {
        if (Array.isArray(bodyBlob)) {
            const paragraph = bodyBlob;
            return paragraph;
        } else {
            const envBlockTailNames = getEnvTailNames(
                bodyBlob.name,
                bodyBlob.lineNum
            );
            return parseBlob(bodyBlob, envBlockTailNames);
        }
    });

    const block = {
        name: blob.name,
        option: blob.option,
        args: blob.args,
        lineNum: blob.lineNum,
        bodyChildren: bodyChildren,
        tailChildren: tailBlocks,
    };

    return block;
};

export default parseBlob;
