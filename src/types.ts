// content

export type Content = (Command | string)[];

export interface RenderedContent {
    type: "CONTENT";
    items: (RenderedCommand | string)[];
}

// command

export type Command = {
    name: string;
    option: Content | null;
    args: Content[];
    charNum: number;
};

export interface RenderedCommand {
    type: "COMMAND";
    string: string;
}

export type CommandRenderer = (
    option: RenderedContent | null,
    args: RenderedContent[]
) => RenderedCommand;

export interface CommandTypes {
    [commandName: string]: {
        htmlRenderer: CommandRenderer;
        latexRenderer: CommandRenderer | null;
    };
}

// block

export interface Block {
    name: string;
    option: Content | null;
    args: Content[];
    lineNum: number;
    bodyChildren: (Content | Block)[];
    tailChildren: Block[];
}

export interface RenderedBlock {
    type: "BLOCK";
    lines: string[];
}

export type BlockRenderer = (
    option: RenderedContent | null,
    args: RenderedContent[],
    bodyChildren: (RenderedContent | RenderedBlock)[],
    tailChildren: RenderedBlock[]
) => RenderedBlock;

export interface EnvTypes {
    [envName: string]: {
        htmlRenderer: BlockRenderer;
        latexRenderer: BlockRenderer | null;
        tails: TailType[];
    };
}

export interface TailType {
    name: string;
    htmlRenderer: BlockRenderer;
    latexRenderer: BlockRenderer | null;
}

// schema

export interface Schema {
    commandTypes: CommandTypes;
    envTypes: EnvTypes;
    mathEnvs: string[];
}
