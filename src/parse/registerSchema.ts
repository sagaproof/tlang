import { CommandTypes, EnvTypes, Schema } from "../types";
import errors from "./errors";

let schema: Schema;

export { schema };

export const getEnvTailNames = function (
    envName: string,
    lineNum: number
): string[] {
    const envType = schema.envTypes[envName];
    if (envType === undefined) {
        throw errors.undefinedEnv(lineNum, envName);
    }
    const tailNames = envType.tails.map((tailType) => tailType.name);
    return tailNames;
};

const registerSchema = function (submittedSchema: Schema): void {
    schema = submittedSchema;
};

export default registerSchema;
