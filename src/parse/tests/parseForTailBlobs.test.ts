// import parseForTailBlobs from '../parseForTailBlobs';
// import {
//     Blob,
// } from '../types';

// type Expect = [string[], Blob[]];
// const tests: [Expect, Expect][] = [];
// export default tests;

// tests.push([
//     parseForTailBlobs([], 0, ''),
//     [[], []],
// ]);

// tests.push([
//     parseForTailBlobs([
//         'foo',
//         '\\bar',
//     ], 0, 'foo'),
//     [
//         [
//             'foo',
//             '\\bar'
//         ],
//         [],
//     ],
// ]);

// tests.push([
//     parseForTailBlobs([
//         'foo',
//         '\\bar',
//     ], 0, 'bar'),
//     [
//         [
//             'foo',
//         ],
//         [
//             {
//                 name: 'bar',
//                 option: null,
//                 arguments: [],
//                 lineNum: 1,
//                 lines: [],
//             }
//         ]
//     ]
// ]);
