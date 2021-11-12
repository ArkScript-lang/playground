/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export var conf = {
    comments: {
        lineComment: ';',
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] }
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" }
    ],
    folding: {
        offSide: true,
        markers: {
            start: new RegExp('^\\s*#region\\b'),
            end: new RegExp('^\\s*#endregion\\b')
        }
    }
};
export var language = {
    defaultToken: 'invalid',
    ignoreCase: true,
    tokenPostfix: '.s',
    keywords: [
        'ABCD',
        'ADD',
        'ADDA',
        'ADDI',
        'ADDQ',
        'ADDX',
        'AND',
        'ANDI',
        'ASL',
        'Bcc',
        'BCHG',
        'BCLR',
        'BFCHG',
        'BFCLR',
        'BFEXTS',
        'BFEXTU',
        'BFFFO',
        'BFINS',
        'BFSET',
        'BFTST',
        'BKPT',
        'BRA',
        'BSET',
        'BSR',
        'BTST',
        'CAS',
        'CHK',
        'CINV',
        'CLR',
        'CMP',
        'CMPA',
        'CMPI',
        'CMPM',
        'CPUSH',
        'DBcc',
        'DIVS',
        'DIVU',
        'EOR',
        'EORI',
        'EXG',
        'EXT',
        'FABS',
        'FACOS',
        'FADD',
        'FASIN',
        'FATAN',
        'FATANH',
        'FBcc',
        'FCMP',
        'FCOS',
        'FCOSH',
        'FDBcc',
        'FDIV',
        'FDNEG',
        'FDSQRT',
        'FDSUB',
        'FETOX',
        'FETOXM',
        'FGETEXP',
        'FGETMAN',
        'FINT',
        'FINTRZ',
        'FLOG',
        'FLOG0',
        'FLOGN',
        'FLOGNP',
        'FMOD',
        'FMOVE',
        'FMOVECR',
        'FMOVEM',
        'FMUL',
        'FNEG',
        'FNOP',
        'FREM',
        'FRESTORE',
        'FSABS',
        'FSADD',
        'FSAVE',
        'FSCALE',
        'FScc',
        'FSDIV',
        'FSGLDIV',
        'FSGLMUL',
        'FSIN',
        'FSINCOS',
        'FSINH',
        'FSMOVE',
        'FSMUL',
        'FSNEG',
        'FSQRT',
        'FSSQRT',
        'FSSUB',
        'FSUB',
        'FTAN',
        'FTANH',
        'FTENTOX',
        'FTRAPcc',
        'FTST',
        'FTWOTOX',
        'ILLEGAL',
        'JMP',
        'JSR',
        'LEA',
        'LINK',
        'LSL',
        'LSR',
        'MOVE',
        'MOVE6',
        'MOVEA',
        'MOVEC',
        'MOVEM',
        'MOVEP',
        'MOVEQ',
        'MOVES',
        'MULS',
        'MULU',
        'ROR',
        'ROXR',
        'RTS',
        'BEQ',
        'TST',
        'BNE',
        'SUBA',
        'SUBQ',
        'DBRA',
        'DS',
        'DC',
        '.B',
        '.L',
        '.S',
        '.W',
    ],
    builtins: [
        
    ],
    typeKeywords: [
        'BSS',
        'CNOP',
        'CSEG',
        'DC.B',
        'DC.L',
        'DC.W',
        'DCB.B',
        'DCB.L',
        'DCB.W',
        'DS.B',
        'DS.L',
        'DS.W',
        'DSEG',
        'END',
        'ENDC',
        'ENDM',
        'EQU',
        'EQUR',
        'EVEN',
        'FAR',
        'IDNT',
        'IFC',
        'IFD',
        'IFEQ',
        'IFGE',
        'IFGT',
        'IFLE',
        'IFLT',
        'IFNC',
        'IFND',
        'IFNE',
        'INCBIN',
        'INCLUDE',
        'LIST',
        'MACRO',
        'NEAR',
        'NOLIST',
        'ORG',
        'PAGE',
        'PUBLIC',
        'RORG',
        'SECTION',
        'SET',
        'SPC',
        'TITLE',
        'TTL',
        'XDEF',
        'XREF',
    ],
    brackets: [
        { open: '{', close: '}', token: 'delimiter.curly' },
        { open: '[', close: ']', token: 'delimiter.bracket' },
        { open: '(', close: ')', token: 'delimiter.parenthesis' }
    ],
    tokenizer: {
        root: [
            { include: '@whitespace' },
            { include: '@numbers' },
            { include: '@strings' },
            [/[,:;]/, 'delimiter'],
            [/[{}\[\]()]/, '@brackets'],
            [/#[a-zA-Z_()01-9']+/, 'metatag'],
            [/^[a-zA-Z_]\w*:?/, 'metatag'],
            [/[a-dA-D][0-7]/, 'variable'],
            [
                /\.?[a-zA-Z_]\w*/,
                {
                    cases: {
                        '@keywords': 'keyword',
                        '@builtins': 'type.identifier',
                        '@typeKeywords': 'keyword.flow',
                        '@default': 'identifier'
                    }
                }
            ]
        ],
        // Deal with white space, including single and multi-line comments
        whitespace: [
            [/\s+/, 'white'],
            [/([;*].*$)/, 'comment'],
        ],
        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [
            [/-?\$([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/, 'number']
        ],
        // Recognize strings, including those broken across lines with \ (but not without)
        strings: [
            [/'$/, 'string.escape', '@popall'],
            [/'/, 'string.escape', '@stringBody'],
            [/"$/, 'string.escape', '@popall'],
            [/"/, 'string.escape', '@dblStringBody']
        ],
        stringBody: [
            [/[^\\']+$/, 'string', '@popall'],
            [/[^\\']+/, 'string'],
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ],
        dblStringBody: [
            [/[^\\"]+$/, 'string', '@popall'],
            [/[^\\"]+/, 'string'],
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ]
    }
};
