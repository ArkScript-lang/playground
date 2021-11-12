/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export var conf = {
    comments: {
        lineComment: '//',
        blockComment: ['/*', '*/']
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '[', close: ']' },
        { open: '{', close: '}' },
        { open: '(', close: ')' },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
        { open: '"', close: '"', notIn: ['string'] }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    folding: {
        markers: {
            start: new RegExp('^\\s*#pragma\\s+region\\b'),
            end: new RegExp('^\\s*#pragma\\s+endregion\\b')
        }
    }
};
export var language = {
    defaultToken: '',
    tokenPostfix: '.cpp',
    brackets: [
        { token: 'delimiter.curly', open: '{', close: '}' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'delimiter.square', open: '[', close: ']' },
        { token: 'delimiter.angle', open: '<', close: '>' }
    ],
    keywords: [
        'assert',
        'break',
        'case',
        'continue',
        'default',
        'do',
        'else',
        'for',
        'foreach',
        'goto',
        'if',
        'return',
        'sleep',
        'state',
        'switch',
        'while',
        'defer',
        'repeat',
        'stop',
        'call',
        'using',
        'loadtext',
        'yield',
        'localfunc',
        'broadcastfunc',
        'targetfunc',
        'char',
        'enum',
        'new',
        'public',
        'forward',
        'native',
        'hook',
        'const',
        'static',
        'stock',
        'inline',
        'foreign',
        'global',
        'timer',
        'remotefunc',
        'iterfunc',
        'uvar',
        'svar',
        '__declspec',
        'master_hook',
        'master_task',
        'master_ptask',
        'group_hook',
        'master_func',
        'task',
        'ptask',
        '@foreign',
        '@global',
        'mhook',
        'true',
        'false',
        'cellmin',
        'cellmax',
        'cellbits',
        'cellbytes',
        '__Pawn',
        '__line',
        '__file',
        '__date',
        '__time',
        '__compat',
        '__PawnBuild'
    ],
    operators: [
        '=',
        '>',
        '<',
        '!',
        '~',
        '?',
        ':',
        '==',
        '<=',
        '>=',
        '!=',
        '&&',
        '||',
        '++',
        '--',
        '+',
        '-',
        '*',
        '/',
        '&',
        '|',
        '^',
        '%',
        '<<',
        '>>',
        '>>>',
        '+=',
        '-=',
        '*=',
        '/=',
        '&=',
        '|=',
        '^=',
        '%=',
        '<<=',
        '>>=',
        '>>>='
    ],
    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    integersuffix: /(ll|LL|u|U|l|L)?(ll|LL|u|U|l|L)?/,
    floatsuffix: /[fFlL]?/,
    encoding: /u|u8|U|L/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // C++ 11 Raw String
            [/@encoding?R\"(?:([^ ()\\\t]*))\(/, { token: 'string.raw.begin', next: '@raw.$1' }],
            // identifiers and keywords
            [
                /[a-zA-Z_]\w*/,
                {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }
            ],
            // The preprocessor checks must be before whitespace as they check /^\s*#/ which
            // otherwise fails to match later after other whitespace has been removed.
            // Inclusion
            [/^\s*#\s*include/, { token: 'keyword.directive.include', next: '@include' }],
            // Preprocessor directive
            [/^\s*#\s*\w+/, 'keyword.directive'],
            // whitespace
            { include: '@whitespace' },
            // [[ attributes ]].
            [/\[\s*\[/, { token: 'annotation', next: '@annotation' }],
            // delimiters and operators
            [/[{}()\[\]]/, '@brackets'],
            [/[<>](?!@symbols)/, '@brackets'],
            [
                /@symbols/,
                {
                    cases: {
                        '@operators': 'delimiter',
                        '@default': ''
                    }
                }
            ],
            // numbers
            [/\d*\d+[eE]([\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?(@floatsuffix)/, 'number.float'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F](@integersuffix)/, 'number.hex'],
            [/0[0-7']*[0-7](@integersuffix)/, 'number.octal'],
            [/0[bB][0-1']*[0-1](@integersuffix)/, 'number.binary'],
            [/\d[\d']*\d(@integersuffix)/, 'number'],
            [/\d(@integersuffix)/, 'number'],
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid'],
            [/"/, 'string', '@string'],
            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
            [/'/, 'string.invalid']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*\*(?!\/)/, 'comment.doc', '@doccomment'],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment']
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        //Identical copy of comment above, except for the addition of .doc
        doccomment: [
            [/[^\/*]+/, 'comment.doc'],
            [/\*\//, 'comment.doc', '@pop'],
            [/[\/*]/, 'comment.doc']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ],
        raw: [
            [
                /(.*)(\))(?:([^ ()\\\t"]*))(\")/,
                {
                    cases: {
                        '$3==$S2': [
                            'string.raw',
                            'string.raw.end',
                            'string.raw.end',
                            { token: 'string.raw.end', next: '@pop' }
                        ],
                        '@default': ['string.raw', 'string.raw', 'string.raw', 'string.raw']
                    }
                }
            ],
            [/.*/, 'string.raw']
        ],
        annotation: [
            { include: '@whitespace' },
            [/using|alignas/, 'keyword'],
            [/[a-zA-Z0-9_]+/, 'annotation'],
            [/[,:]/, 'delimiter'],
            [/[()]/, '@brackets'],
            [/\]\s*\]/, { token: 'annotation', next: '@pop' }]
        ],
        include: [
            [
                /(\s*)(<)([^<>]*)(>)/,
                [
                    '',
                    'keyword.directive.include.begin',
                    'string.include.identifier',
                    { token: 'keyword.directive.include.end', next: '@pop' }
                ]
            ],
            [
                /(\s*)(")([^"]*)(")/,
                [
                    '',
                    'keyword.directive.include.begin',
                    'string.include.identifier',
                    { token: 'keyword.directive.include.end', next: '@pop' }
                ]
            ]
        ]
    }
};
