// import parseParagraph from '../parseParagraph'
// import {
//     MATH_INLINE,
// } from '../constants'
// import {
//     Content,
// } from '../types'

// type Expect = Content;
// const tests: [Content, Content][] = [];
// export default tests;

// tests.push([
//     parseParagraph([]),
//     []
// ]);

// tests.push([
//     parseParagraph([
//         'foo',
//     ]),
//     [
//         'foo',
//     ]
// ]);

// tests.push([
//     parseParagraph([
//         '$\\alpha$',
//         'foo',
//         'bar',
//         '$\\beta$',
//     ]),
//     [
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [['\\alpha']],
//             charNum: 0,
//         },
//         ' foo bar ',
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [['\\beta']],
//             charNum: 0,
//         }
//     ]
// ]);

// tests.push([
//     parseParagraph([
//         '\\the[very] quick ',
//         ' brown$ fox$ \\jumps{gracefully}',
//         '$over$the \\lazy\\dog',
//     ]),
//     [
//         {
//             name: 'the',
//             option: ['very'],
//             arguments: [],
//             charNum: 0,
//         },
//         ' quick   brown',
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [[' fox']],
//             charNum: 6,
//         },
//         ' ',
//         {
//             name: 'jumps',
//             option: null,
//             arguments: [
//                 ['gracefully']
//             ],
//             charNum: 13
//         },
//         ' ',
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [['over']],
//             charNum: 0,
//         },
//         'the ',
//         {
//             name: 'lazy',
//             option: null,
//             arguments: [],
//             charNum: 10,
//         },
//         {
//             name: 'dog',
//             option: null,
//             arguments: [],
//             charNum: 15,
//         },
//     ]
// ]);
