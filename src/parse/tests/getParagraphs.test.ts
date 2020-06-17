// import getParagraphs from '../getParagraphs';
// import {
//     Command,
// } from '../types';

// type Expect = [string[][], Command | null, number];
// const tests: [Expect, Expect][] = [];
// export default tests;

// tests.push([
//     getParagraphs([], 0),
//     [[], null, 0]
// ]);

// tests.push([
//     getParagraphs([
//         'a'
//     ], 0),
//     [   [
//             [
//                 'a'
//             ]
//         ],
//         null,
//         1
//     ]
// ]);

// tests.push([
//     getParagraphs([
//         '',
//         'a',
//         'b',
//         '',
//         'c',
//         '',
//         '',
//     ], 0),
//     [
//         [
//             ['a','b'],
//             ['c'],
//         ],
//         null,
//         7,
//     ]
// ]);

// tests.push([
//     getParagraphs([
//         '\\begin{env}'
//     ], 0),
//     [
//         [],
//         {
//             name: 'begin',
//             option: null,
//             arguments: [
//                 ['env']
//             ],
//             charNum: 0,
//         },
//         0,
//     ],
// ]);
