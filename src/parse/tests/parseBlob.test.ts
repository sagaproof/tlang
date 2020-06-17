// // import fs from 'fs'
// import parseBlob from '../parseBlob'

// import { registerEnvTypes } from '../getTailNames'
// import {
//     Block,
// } from '../types'

// // const input = testNum => fs.readFileSync(__dirname + `/inputs/${testNum}.tex`, 'utf8').split('\n')

// type Expect = Block
// const tests: [Expect, Expect][] = []
// export default tests;

// registerEnvTypes({
//     document: ["section"],
// }, ["align"])

// tests.push([
//     parseBlob({
//         name: 'document',
//         option: ['option'],
//         arguments: [['arg']],
//         lineNum: 6,
//         lines: [],
//     }, []),
//     {
//         name: 'document',
//         option: ['option'],
//         arguments: [['arg']],
//         lineNum: 6,
//         children: [],
//     }
// ]);

// // tests.push([
// //     parseBlob(input(1)),
// //     [
// //         [
// //             {
// //                 name: 'a',
// //                 option: 'b',
// //                 arguments: [
// //                     ['c'],
// //                     ['d'],
// //                 ]
// //             }
// //         ]
// //     ]
// // ]);
