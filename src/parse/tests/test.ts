// import utilitiesTests from "./utilities.test";
// import parseCommandTests from "./parseCommand.test";
// import parseStringTests from "./parseString.test";
// import parseParagraphTests from "./parseParagraph.test";
// import parseForTailBlobsTests from "./parseForTailBlobs.test";
// import parseForBodyBlobsTests from "./parseForBodyBlobs.test";
// import getParagraphsTests from "./getParagraphs.test";
// import parseBlobTests from "./parseBlob.test";

// type Test = [any, any];

// const queue: {
//     [testName: string]: Test[];
// } = {
//     utilities: utilitiesTests,
//     parseCommand: parseCommandTests,
//     parseString: parseStringTests,
//     parseParagraph: parseParagraphTests,
//     parseForTailBlobs: parseForTailBlobsTests,
//     parseForBodyBlobs: parseForBodyBlobsTests,
//     getParagraphs: getParagraphsTests,
//     parseBlob: parseBlobTests,
// };

// const testFunc = function (funcName: string, funcTests: Test[]): void {
//     console.log("\x1b[1m%s\x1b[0m", "------------------------");
//     console.log("\x1b[1m%s\x1b[0m", funcName);
//     funcTests.forEach(([receivedValue, expectedValue], i) => {
//         const passed =
//             JSON.stringify(receivedValue) === JSON.stringify(expectedValue);
//         console.log(
//             "\x1b[1m%s",
//             i + 1 + ")",
//             passed ? "\x1b[42m\x1b[37m" : "\x1b[41m\x1b[37m",
//             passed ? "PASSED" : "FAILED",
//             "\x1b[0m"
//         );
//         if (!passed) {
//             console.log("\x1b[1m\x1b[31m%s\x1b[0m", "received:");
//             console.log(
//                 "\x1b[1m%s\x1b[0m",
//                 JSON.stringify(receivedValue, null, 2)
//             );
//             console.log("\x1b[1m\x1b[32m%s\x1b[0m", "expected:");
//             console.log(
//                 "\x1b[1m%s\x1b[0m",
//                 JSON.stringify(expectedValue, null, 2)
//             );
//         }
//     });
// };

// for (const funcName in queue) {
//     const funcTests = queue[funcName];
//     testFunc(funcName, funcTests);
// }
