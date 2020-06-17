// import parseString from '../parseString'
// import {
//     MATH_INLINE,
// } from '../constants'
// import {
//     Content,
// } from '../types'

// type Expect = Content
// const tests: [Expect, Expect][] = []
// export default tests

// // interface StringConstructor {
// //     raw: string => string;
// // }
// // const s = function
// //     (str)
// // {
// //     return String.raw(str)
// // }

// tests.push([
//     parseString(''),
//     [],
// ])

// tests.push([
//     parseString('foo'),
//     ['foo'],
// ])

// tests.push([
//     parseString('\\foo'),
//     [
//         {
//             name: 'foo',
//             option: null,
//             arguments: [],
//             charNum: 0,
//         }
//     ]
// ])

// tests.push([
//     parseString('\\outer[option]{foo}'),
//     [
//         {
//             name: 'outer',
//             option: ['option'],
//             arguments: [
//                 ['foo']
//             ],
//             charNum: 0,
//         }
//     ]
// ])

// tests.push([
//     parseString('\\outer[option]{\\inner{foo}}'),
//     [
//         {
//             name: 'outer',
//             option: ['option'],
//             arguments: [
//                 [
//                     {
//                         name: 'inner',
//                         option: null,
//                         arguments: [
//                             ['foo']
//                         ],
//                         charNum: 15,
//                     }
//                 ]
//             ],
//             charNum: 0,
//         }
//     ]
// ])

// tests.push([
//     parseString('$\\alpha$'),
//     [
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [['\\alpha']],
//             charNum: 0,
//         }
//     ]
// ])

// tests.push([
//     parseString(`$$$\\alpha$ a &\\foo b \\\\bar c $$`),
//     [
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [['']],
//             charNum: 0,
//         },
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [[`\\alpha`]],
//             charNum: 2,
//         },
//         ` a &`,
//         {
//             name: 'foo',
//             option: null,
//             arguments: [],
//             charNum: 14,
//         },
//         ' b \\',
//         {
//             name: 'bar',
//             option: null,
//             arguments: [],
//             charNum: 22,
//         },
//         ' c ',
//         {
//             name: MATH_INLINE,
//             option: null,
//             arguments: [[``]],
//             charNum: 29,
//         },
//     ]
// ])
