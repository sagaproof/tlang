import {
    // content
    Content,
    RenderedContent,
    // command
    Command,
    RenderedCommand,
    CommandRenderer,
    CommandTypes,
    // block
    Block,
    RenderedBlock,
    BlockRenderer,
    EnvTypes,
    TailType,
} from "../types";
import { CONTENT } from "../constants";

let commandTypes: CommandTypes;
let envTypes: EnvTypes;

const renderContent = function (content: Content): RenderedContent {
    const items = content.map((item) => {
        if (typeof item === "string") {
            return item;
        } else {
            return renderCommand(item);
        }
    });
    return {
        type: CONTENT,
        items: items,
    };
};

const renderCommand = function (command: Command): RenderedCommand {
    const commandType = commandTypes[command.name];
    if (commandType === undefined) {
        throw Error(`undefined command type ${command.name}`);
    }
    const renderedOption = command.option
        ? renderContent(command.option)
        : null;
    const renderedArgs = command.args.map(renderContent);
    return commandType.htmlRenderer(renderedOption, renderedArgs);
};

const renderBlock = function (
    block: Block,
    blockRenderer: BlockRenderer,
    tailTypes: TailType[]
): RenderedBlock {
    const renderedOption = block.option ? renderContent(block.option) : null;
    const renderedArgs = block.args.map(renderContent);
    const renderedBodyChildren = block.bodyChildren.map((bodyChild) => {
        if (Array.isArray(bodyChild)) {
            return renderContent(bodyChild);
        }
        const envBlock = bodyChild;
        const envBlockType = envTypes[envBlock.name];
        const envRenderer = envBlockType.htmlRenderer;
        const childTailTypes = envBlockType.tails;
        return renderBlock(envBlock, envRenderer, childTailTypes);
    });
    const renderedTailChildren = block.tailChildren.map((tailChild) => {
        const firstTailType = tailTypes[0];
        const tailBlock = tailChild;
        const tailRenderer = firstTailType.htmlRenderer;
        const remainingTailTypes = tailTypes.slice(1);
        return renderBlock(tailBlock, tailRenderer, remainingTailTypes);
    });
    return blockRenderer(
        renderedOption,
        renderedArgs,
        renderedBodyChildren,
        renderedTailChildren
    );
};

const render = function (
    rootBlock: Block,
    submittedCommandTypes: CommandTypes,
    submittedEnvTypes: EnvTypes
): string {
    commandTypes = submittedCommandTypes;
    envTypes = submittedEnvTypes;

    const renderedBlock = renderBlock(
        rootBlock,
        envTypes.root.htmlRenderer,
        envTypes.root.tails
    );
    return renderedBlock.lines.join("\n");
};

export default render;
