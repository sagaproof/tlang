import * as nodeFs from "fs";
import * as nodeHttp from "http";
import * as nodePath from "path";
import * as chalk from "chalk";
import * as readdirp from "readdirp";
import * as fsExtra from "fs-extra";
import parse from "./parse/index";
import render from "./render/index";
import schema from "./schema/index";

const removeTrailingSlash = function (str: string): string {
    const endsInSlash = str[str.length - 1] === "/";
    if (endsInSlash) {
        return str.slice(-1);
    } else {
        return str;
    }
};

const commandLineArgs = process.argv.slice(2);
const commandType = commandLineArgs[0];
const relInputDirPath = commandLineArgs[1]
    ? removeTrailingSlash(commandLineArgs[1])
    : null;
const relOutputDirPath = commandLineArgs[2]
    ? removeTrailingSlash(commandLineArgs[2])
    : null;

const inputDirPath = process.cwd() + "/" + relInputDirPath;
if (!nodeFs.existsSync(inputDirPath)) {
    console.log(chalk.red(`Input directory "${inputDirPath}" does not exist.`));
    process.exit();
}

const transpileFile = function (name: string, input: string): string {
    const pageBlock = parse("page", null, [[name]], input, schema);
    return render(pageBlock, schema.commandTypes, schema.envTypes);
};

const build = function () {
    if (relOutputDirPath === null) {
        console.log(chalk.red(`Output directory unspecified.`));
        process.exit();
    }
    const outputDirPath = process.cwd() + "/" + relOutputDirPath;
    if (!nodeFs.existsSync(outputDirPath)) {
        console.log(
            chalk.red(`Output directory "${outputDirPath}" does not exist.`)
        );
        process.exit();
    }
    try {
        console.log(
            chalk.green(`Copying "${inputDirPath}" to "${outputDirPath}".`)
        );
        fsExtra.copySync(inputDirPath, outputDirPath);
        readdirp(outputDirPath, {
            fileFilter: "*.tex",
        })
            .on("data", (entry) => {
                console.log(
                    chalk.green(`Replacing "tex" files with "tex" files.`)
                );
                const stripTexExtension = (str: string) => {
                    return str.slice(0, entry.basename.length - (3 + 1));
                };
                const fileName = stripTexExtension(entry.basename);
                const input = nodeFs.readFileSync(entry.fullPath, "utf8");
                console.log(chalk.green(`Transpiling "${entry.path}".`));
                const output = transpileFile(fileName, input);
                const newFilePath =
                    outputDirPath +
                    "/" +
                    stripTexExtension(entry.path) +
                    ".html";
                nodeFs.renameSync(entry.fullPath, newFilePath);
                nodeFs.writeFileSync(newFilePath, output, "utf8");
            })
            .on("warn", (error) => {
                throw error;
            })
            .on("error", (error) => {
                throw error;
            })
            .on("end", () => console.log(chalk.green(`Finished.`)));
    } catch (error) {
        console.log(chalk.red(`Error:`), error.message);
    }
};

const serve = function () {
    const handleRegularFile = function (inputPath: string, response: any) {
        // const extName = nodePath.extname(inputPath);
        response.writeHead(200, {
            // for now
            "Content-Type": "text/plain",
        });
        response.end(nodeFs.readFileSync(inputPath, "utf8"));
    };
    const handleLanguageFile = function (inputPath: string, response: any) {
        const input = nodeFs.readFileSync(inputPath, "utf8");
        const output = transpileFile("request.path", input);
        response.writeHead(200, {
            "Content-Type": "text/html",
        });
        response.end(output);
    };
    const handler = function (request: any, response: any) {
        try {
            const inputPath = inputDirPath + request.url;
            const siteResourceMap: {
                [filename: string]: string;
            } = {
                "/index.js": "text/javascript",
                "/index.css": "text/css",
                "/favicon.ico": "image/x-icon",
            };
            if (siteResourceMap[request.url] !== undefined) {
                const contentType = siteResourceMap[request.url];
                response.writeHead(200, {
                    "Content-Type": contentType,
                });
                response.end(
                    nodeFs.readFileSync(
                        __dirname + `/schema/site/${request.url}`,
                        "utf8"
                    )
                );
            } else if (nodeFs.existsSync(inputPath)) {
                const pathStats = nodeFs.lstatSync(inputPath);
                if (pathStats.isDirectory()) {
                    const indexFilePath = inputPath + "index.tex";
                    if (nodeFs.existsSync(indexFilePath)) {
                        handleLanguageFile(indexFilePath, response);
                    } else {
                        throw new Error(
                            `Directory "${inputPath}" contains no default (index.tex) file.`
                        );
                    }
                } else if (pathStats.isFile()) {
                    handleRegularFile(inputPath, response);
                }
            } else {
                const extendedInputPath = inputPath + ".tex";
                if (nodeFs.existsSync(extendedInputPath)) {
                    handleLanguageFile(extendedInputPath, response);
                } else {
                    throw new Error(
                        `File or directory for "${request.url}" not found.`
                    );
                }
            }
            console.log(chalk.green("Served:"), request.url);
        } catch (error) {
            console.log(chalk.red("Error:"), error.message);
            response.writeHead(200, {
                "Content-Type": "text/plain",
            });
            response.end("Error\n" + JSON.stringify(error, null, 2));
        }
    };

    const server = nodeHttp.createServer(handler);
    server.listen(1234);
    console.log(chalk.green("Serving on port 1234."));
};

if (commandType === "build") {
    build();
} else if (commandType === "serve") {
    serve();
} else {
    console.log(
        chalk.red(`Unrecognized command type. Try 'build' or 'serve'.`)
    );
}
