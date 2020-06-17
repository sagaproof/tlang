import {
    RenderedContent,
    RenderedBlock,
    CommandRenderer,
    BlockRenderer,
} from "../types";
import htmlTemplate from "./site/template.html";
import { CONTENT, COMMAND, BLOCK } from "../constants";

const TAB_SPACES = 2;
const TAB = ` `.repeat(TAB_SPACES);

// commands
export const htmlMathInline: CommandRenderer = function (option, args) {
    const firstArgContent = args.length > 0 ? args[0].items : [];
    const firstContentItem =
        firstArgContent.length > 0 ? firstArgContent[0] : ``;
    const inputString =
        typeof firstContentItem === "string" ? firstContentItem : ``;
    if (inputString === ``) {
        return {
            type: COMMAND,
            string: ``,
        };
    } else {
        return {
            type: COMMAND,
            string: [`<span class="math">`, inputString, `</span>`].join(""),
        };
    }
};

export const htmlEmph: CommandRenderer = function (option, args) {
    const firstArgContent = args.length > 0 ? args[0].items : [];
    const firstContentItem =
        firstArgContent.length > 0 ? firstArgContent[0] : ``;
    const inputString =
        typeof firstContentItem === "string" ? firstContentItem : ``;
    if (inputString === ``) {
        return {
            type: COMMAND,
            string: ``,
        };
    } else {
        return {
            type: COMMAND,
            string: [`<span class="emph">`, inputString, `</emph>`].join(""),
        };
    }
};

// auxiliary

const renderParagraph = function (renderedContent: RenderedContent): string[] {
    const lines = renderedContent.items.map((item) => {
        if (typeof item === "string") {
            return item;
        } else {
            const renderedCommand = item;
            return renderedCommand.string;
        }
    });
    return [`<p>`, ...lines.map((line) => TAB + line), `</p>`];
};

const renderRegularBody = function (
    bodyChildren: (RenderedContent | RenderedBlock)[]
): string[] {
    return bodyChildren
        .map((bodyChild) => {
            if (bodyChild.type === CONTENT) {
                const renderedContent = bodyChild;
                return renderParagraph(renderedContent);
            } else {
                const renderedBlock = bodyChild;
                return renderedBlock.lines;
            }
        })
        .reduce((acc, val) => acc.concat(val), []);
};

const renderRegularTail = function (tailChildren: RenderedBlock[]): string[] {
    return tailChildren
        .map((tailChild) => {
            const renderedBlock = tailChild;
            return renderedBlock.lines;
        })
        .reduce((acc, val) => acc.concat(val), []);
};

// blocks

// root
export const htmlRoot: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const title = typeof args[0].items[0] === "string" ? args[0].items[0] : ``;
    const lines = htmlTemplate(title, [
        ...renderRegularBody(bodyChildren),
        ...renderRegularTail(tailChildren),
    ]).split("\n");
    return {
        type: BLOCK,
        lines: lines,
    };
};

export const htmlSection: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const name = args[0] ? args[0].items[0] : ``;
    const lines = [
        `<div class="section">`,
        TAB + `<h2>${name}</h2>`,
        ...renderRegularBody(bodyChildren).map((line) => TAB + line),
        ...renderRegularTail(tailChildren).map((line) => TAB + line),
        `</div>`,
    ];
    return {
        type: BLOCK,
        lines: lines,
    };
};

export const htmlSubsection: BlockRenderer = function (
    option,
    args,
    bodyChildren
) {
    const name = args[0].items[0];
    const lines = [
        `<div class="subsection">`,
        TAB + `<h3>${name}</h3>`,
        ...renderRegularBody(bodyChildren).map((line) => TAB + line),
        `</div>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

// math
export const htmlAligned: BlockRenderer = function (
    option,
    args,
    bodyChildren
) {
    const inputString: string = bodyChildren
        .map((bodyChild) => {
            if (bodyChild.type === CONTENT) {
                return bodyChild.items.map((item) =>
                    typeof item === "string" ? item : item.string
                );
            } else {
                return ``;
            }
        })
        .join(``);
    const lines = [`<div class="aligned">`, TAB + inputString, `</div>`];
    return {
        type: BLOCK,
        lines,
    };
};

// definition
export const htmlDefinition: BlockRenderer = function (
    option,
    args,
    bodyChildren
) {
    const lines = [
        `<div class="definition">`,
        TAB + `<h4>Definition</h4>`,
        ...renderRegularBody(bodyChildren).map((line) => TAB + line),
        `</div>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

// theorems
export const htmlTheorem: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const lines = [
        `<div class="theorem">`,
        TAB + `<h4>Theorem</h4>`,
        ...renderRegularBody(bodyChildren).map((line) => TAB + line),
        TAB + `<div class="proofs">`,
        tailChildren.length === 1
            ? TAB + `<h5>Proof</h5>`
            : tailChildren.length > 1
            ? TAB + `<h5>Proofs</h5>`
            : ``,
        ...renderRegularTail(tailChildren).map((str) => TAB + TAB + str),
        TAB + `</div>`,
        `</div>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

export const htmlProof: BlockRenderer = function (option, args, bodyChildren) {
    const lines = [
        `<div class="proof">`,
        ...renderRegularBody(bodyChildren).map((str) => TAB + str),
        `</div>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

// lists
export const htmlEnumerate: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const lines = [
        `<ol class="enumerate">`,
        ...renderRegularBody(bodyChildren).map((str) => TAB + str),
        ...(tailChildren.length === 0
            ? []
            : renderRegularTail(tailChildren).map((str) => TAB + TAB + str)),
        `</ol>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

export const htmlItemize: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const lines = [
        `<ul class="itemize">`,
        ...renderRegularBody(bodyChildren).map((str) => TAB + str),
        ...(tailChildren.length === 0
            ? []
            : renderRegularTail(tailChildren).map((str) => TAB + TAB + str)),
        `</ul>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

export const htmlItem: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const subListType =
        args.length > 0 && typeof args[0].items[0] === "string"
            ? args[0].items[0]
            : ``;
    const lines = [
        `<li class="item">`,
        ...renderRegularBody(bodyChildren).map((str) => TAB + str),
        ...(tailChildren.length === 0
            ? []
            : [
                  TAB +
                      `<${
                          subListType === `enumerate` ? `ol` : `ul`
                      } class="${subListType}">`,
                  ...renderRegularTail(tailChildren).map(
                      (str) => TAB + TAB + str
                  ),
                  TAB + `</${subListType === `enumerate` ? `ol` : `ul`}>`,
              ]),
        `</li>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};

export const htmlSubItem: BlockRenderer = function (
    option,
    args,
    bodyChildren,
    tailChildren
) {
    const lines = [
        `<li class="subitem">`,
        ...renderRegularBody(bodyChildren).map((str) => TAB + str),
        `</li>`,
    ];
    return {
        type: BLOCK,
        lines,
    };
};
