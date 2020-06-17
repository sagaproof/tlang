import { Content, Command } from "../types";

export interface Blob {
    name: string;
    option: Content | null;
    args: Content[];
    lineNum: number;
    lines: string[];
}
