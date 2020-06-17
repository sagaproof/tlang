# Tlang

This project defines a small, LaTeX-like language, and provides a program for conversion to either HTML or LaTeX.
For now, this language is called _tlang_. This documentation is a work in progress.

## Introduction

The purpose of tlang is to provide a convenient platform for writing technical content easily portable to both web and printed documents. Existing markup languages like Markdown and HTML are easily portable to both web and printed form, but they lack in flexibility and convenience for technical writing. LaTeX, on the other hand, is well suited for technical writing, but is not intended for the web.

Tlang consists of two layers. At the bottom is the underlying tlang model, akin to LaTeX. Then on top of the model a schema may be defined, akin to a LaTeX document class along with a set of commands and environments. At the moment, this project includes a single schema under `src/schema`, though in the future schemas should be in separate repos.

## Usage

The program may be invoked from outside the project as `node tlang <args>`, accepting the following parameters.

1. _Command_: `serve` or `build`. The program serves by rendering the input directory (argument 2) at `localhost:1234`. This command is intended for development. The program builds by compiling the input directory to the output directory (argument 3). This command is intended for production.
2. _Input directory_: the path to the input directory relative to the current working directory. This argument is needed for both serving and building.
3. _Output directory_: the path to the output directory relative to the current working directory. This argument is only needed for building.

When developing the typescript used in this program, one may skip the typescript compilation step and run directly from inside the project as `ts-node src/index.ts <args>`.

## Architecture

Tlang interprets an input in the following model.

-   An input is interpreted as a _block_.
-   A block (associated with a block name) consists of a _body_ followed by an optional _tail_ (associated with a tail name).
-   A body consists of a sequence of _content_ pieces and _environment blocks_.
-   A piece of content consists of a sequence of strings and commands.
-   An environment block takes the following form, and as a block it may have its own body and tail.

        \begin{<environment block name>}
            <environment block children>
        \end{<environment block name>}

-   A tail consists of a sequence of blocks called _tail blocks_ all associated with the tail name.
-   A tail block takes the following form, and as a block it may have its own body and tail.

        \<tail name>
        <tail block children>

For example, below are two adjacent environment blocks. The first has the name 'theorem', tail name 'proof', and body with the single line of content 'theorem statement...'. The second has the name 'itemize', tail name 'item', and body 'overview...'. As blocks, 'item' blocks have their own tail name 'subitem'.

```tex
\begin{theorem}
    theorem statement...
    \proof
    first proof...
    \proof
    second proof...
\end{theorem}
\begin{itemize}
    overview...
    \item
    first item...
    \subitem
    first subitem...
    \item
    second item...
\end{itemize}
```

Given a schema and an input file, one may first parse the file according to the schema, then render the parsed output according to the schema. The types below are detailed in `src/types.ts`.

### Schema

A schema is an object of the following type.

```ts
interface Schema {
    commandTypes: CommandTypes;
    envTypes: EnvTypes;
    mathEnvs: string[];
}
```

### Parsing

The `parse` function defined in `src/parse/index.ts` has the following signature, accepting the parameters below and returning a `block`.

```ts
function (
    envName: string,
    option: Content | null,
    args: Content[],
    input: string,
    commandTypes: CommandTypes,
    envTypes: EnvTypes,
    mathEnvs: string[]
): Block
```

1. `envName`: A `string` that must be equal to one of the keys in the `envTypes` object. The `input` will be processed in the environment of type `envName`. This is called the 'root' environment. The output will be the 'root' block.

2. `option`: A `Content` object or `null` used as the `option` field in the root block.

3. `arguments`: An array of `Content` objects used as the `arguments` field in the root block.

4. `input`: A `string` that will be processed in the root environment.

5. `envTypes`: An object with keys as `strings`. Each key is the name of an environment. The rhs of each key is an `array` of `strings` which are the ordered tail names of the corresponding environment.

6. `mathEnvs`: An `array` of environment name strings, each of which must appear as key in the `envTypes` object. Order does not matter. These environments will be cast as math environments, meaning their inputs will not be processed but included as raw strings.

### Rendering

The `render` function defined in `src/render/index.ts` has the following signature, accepting the parameters below and returning a string.

```ts
function (
    pageBlock: Block,
    commandTypes: CommandTypes,
    envTypes: EnvTypes
): string
```

1. `rootBlock`: A `block` returned from the parser. This block will be rendered according to the `commandTypes` and `envTypes`.
2. `commandTypes`: the command types defined in a schema.
3. `envTypes`: the environment types defined in a schema.

## Contribution

At the moment this project could benefit most by a better schema. In particular, the HTML renderer can use significant improvement semantically and aesthetically, while a LaTeX renderer is yet nonexistent.
