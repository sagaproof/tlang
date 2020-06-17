import parseBlob from "./parseBlob";
import registerSchema, { getEnvTailNames } from "./registerSchema";
import { Content, Block, Schema } from "../types";

const parse = function (
    envName: string,
    option: Content | null,
    args: Content[],
    input: string,
    schema: Schema
): Block {
    registerSchema(schema);
    const inputBlob = {
        name: envName,
        option: option,
        args: args,
        lineNum: 0,
        lines: input.split("\n"),
    };
    const tailNames = getEnvTailNames(envName, -1);
    return parseBlob(inputBlob, tailNames);
};

export default parse;
