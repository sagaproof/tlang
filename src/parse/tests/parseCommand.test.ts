// //
// import parseCommand from '../parseCommand';
// import {
//     Command,
// } from '../types'

// type Expect = [Command, number]
// const tests: [Expect, Expect][] = []
// export default tests

// tests.push([
//     parseCommand('\\command[option]{arg1}{arg2}', 0),
//     [{
//         name: 'command',
//         option: ['option'],
//         arguments: [
//             ['arg1'],
//             ['arg2'],
//         ],
//         charNum: 0,
//     }, 28]
// ])
// tests.push([
//     parseCommand('abc\\begin{environment}', 3),
//     [{
//         name: 'begin',
//         option: null,
//         arguments: [
//             ['environment']
//         ],
//         charNum: 3,
//     }, 22]
// ])
// tests.push([
//     parseCommand('a \\b c', 2),
//     [{
//         name: 'b',
//         option: null,
//         arguments: [],
//         charNum: 2,
//     }, 4]
// ])
