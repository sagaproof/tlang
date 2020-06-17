import * as util from "./utilities";
import parseString from "./parseString";
import { Content } from "../types";

const parseParagraphContents = function (linesContent: Content[]): Content {
    const paragraphContent: Content = [];
    let i = 0;
    while (i < linesContent.length) {
        const lineContent = linesContent[i];
        if (paragraphContent.length > 0) {
            const previousLineLastItem = linesContent[linesContent.length - 1];
            const currentLineFirstItem = lineContent[0];
            if (
                typeof previousLineLastItem !== "string" &&
                typeof currentLineFirstItem !== "string"
            ) {
                paragraphContent.push(" ");
            }
            if (
                typeof previousLineLastItem === "string" &&
                typeof currentLineFirstItem !== "string"
            ) {
                paragraphContent[paragraphContent.length - 1] =
                    previousLineLastItem + " ";
            }
            if (
                typeof previousLineLastItem !== "string" &&
                typeof currentLineFirstItem === "string"
            ) {
                lineContent[0] = " " + currentLineFirstItem;
            }
            if (
                typeof previousLineLastItem === "string" &&
                typeof currentLineFirstItem === "string"
            ) {
                paragraphContent[paragraphContent.length - 1] =
                    previousLineLastItem + " " + currentLineFirstItem;
                lineContent.splice(0, 1);
            }
        }
        lineContent.forEach((lineItem) => {
            paragraphContent.push(lineItem);
        });
        i++;
    }
    return paragraphContent;
};

export default parseParagraphContents;
