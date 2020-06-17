// import parseForBodyBlobs from '../parseForBodyBlobs'
// import {
//     envDelimiters,
//     TAB_SPACES,
// } from '../constants'
// import {
//     Blob,
// } from '../types'

// type Expect = (string[] | Blob)[];
// const tests: [Expect, Expect][] = [];
// export default tests;

// tests.push([
//     parseForBodyBlobs([], 0),
//     [],
// ]);

// tests.push([
//     parseForBodyBlobs([''], 0),
//     [],
// ]);

// tests.push([
//     parseForBodyBlobs([
//         'foo',
//         '',
//         '\\begin{env}',
//         '    some',
//         '',
//         '    env',
//         '    content',
//         '\\end{env}',
//         '',
//         '\\bar',
//         '',
//     ], 0),
//     [
//         [
//             'foo',
//         ],
//         {
//             name: 'env',
//             option: null,
//             arguments: [],
//             lineNum: 2,
//             lines: [
//                 'some',
//                 '',
//                 'env',
//                 'content',
//             ],
//         },
//         [
//             '\\bar',
//         ]
//     ]
// ]);
