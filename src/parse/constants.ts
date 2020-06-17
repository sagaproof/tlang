export interface Delimiter {
    readonly open: string;
    readonly close: string;
}

export const braces: Delimiter = {
    open: "{",
    close: "}",
};

export const brackets: Delimiter = {
    open: "[",
    close: "]",
};

export const parentheses: Delimiter = {
    open: "(",
    close: ")",
};

export const envDelimiters: Delimiter = {
    open: "begin",
    close: "end",
};

export const COMMENT_MARK = "%";
export const MATH_MARK = "$";
export const MATH_INLINE = "mathInline";
export const TAB_SPACES = 4;
