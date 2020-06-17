import { CommandTypes, EnvTypes, TailType, Schema } from "../types";
import {
    htmlMathInline,
    htmlEmph,
    // page
    htmlRoot,
    htmlSection,
    htmlSubsection,
    // math
    htmlAligned,
    // definition
    htmlDefinition,
    // theorems
    htmlTheorem,
    htmlProof,
    // lists
    htmlEnumerate,
    htmlItemize,
    htmlItem,
    htmlSubItem,
} from "./components";

const commandTypes: CommandTypes = {
    mathInline: {
        htmlRenderer: htmlMathInline,
        latexRenderer: null,
    },
    emph: {
        htmlRenderer: htmlEmph,
        latexRenderer: null,
    },
};

const envTypes: EnvTypes = {
    // root
    root: {
        htmlRenderer: htmlRoot,
        latexRenderer: null,
        tails: [
            {
                name: "section",
                htmlRenderer: htmlSection,
                latexRenderer: null,
            },
            {
                name: "subsection",
                htmlRenderer: htmlSubsection,
                latexRenderer: null,
            },
        ],
    },
    // math
    aligned: {
        htmlRenderer: htmlAligned,
        latexRenderer: null,
        tails: [],
    },
    // definition
    definition: {
        htmlRenderer: htmlDefinition,
        latexRenderer: null,
        tails: [],
    },
    // theorems
    theorem: {
        htmlRenderer: htmlTheorem,
        latexRenderer: null,
        tails: [
            {
                name: "proof",
                htmlRenderer: htmlProof,
                latexRenderer: null,
            },
        ],
    },
    // lists
    enumerate: {
        htmlRenderer: htmlEnumerate,
        latexRenderer: null,
        tails: [
            {
                name: "item",
                htmlRenderer: htmlItem,
                latexRenderer: null,
            },
            {
                name: "subitem",
                htmlRenderer: htmlSubItem,
                latexRenderer: null,
            },
        ],
    },
    itemize: {
        htmlRenderer: htmlItemize,
        latexRenderer: null,
        tails: [
            {
                name: "item",
                htmlRenderer: htmlItem,
                latexRenderer: null,
            },
            {
                name: "subitem",
                htmlRenderer: htmlSubItem,
                latexRenderer: null,
            },
        ],
    },
};

const mathEnvs: string[] = ["aligned"];

const schema: Schema = {
    commandTypes,
    envTypes,
    mathEnvs,
};

export default schema;
