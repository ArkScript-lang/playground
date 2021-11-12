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
        ['[', ']'],
        ['(', ')']
    ]
};
var asmKeywords = [
    'public',
    'private',
    'value',
    'enum',
    'interface',
    'sealed',
    'abstract',
    'auto',
    'sequential',
    'explicit',
    'ansi',
    'unicode',
    'autochar',
    'import',
    'serializable',
    'nested',
    'public',
    'private',
    'family',
    '.assembly',
    '.method',
    '.entrypoint',
    '.maxstack',
    '.module',
    '.class',
    'extends',
    'ldstr',
    'famandassem',
    'famorassem',
    'beforefieldinit',
    'specialname',
    'rtspecialname',
    'static',
    'public',
    'private',
    'family',
    'final',
    'specialname',
    'virtual',
    'abstract',
    'default',
    'cil',
    'managed',
    'famandassem',
    'famorassem',
    'privatescope',
    'hidebysig',
    'newslot',
    'rtspecialname',
    'unmanagedexp',
    'reqsecobj',
    'pinvokeimpl',
    'variant',
    'currency',
    'syschar',
    'void',
    'bool',
    'int8',
    'int16',
    'int32',
    'int64',
    'float32',
    'float64',
    'error',
    'nativeType',
    'decimal',
    'date',
    'bstr',
    'lpstr',
    'lpwstr',
    'lptstr',
    'objectref',
    'iunknown',
    'idispatch',
    'struct',
    'interface',
    'int',
    'unsigned',
    'byvalstr',
    'tbstr',
    'lpstruct',

    // operators
        'ret',
        'nop',
        'break',
        'ldarg.0',
        'ldarg.1',
        'ldarg.2',
        'ldarg.3',
        'ldloc.0',
        'ldloc.1',
        'ldloc.2',
        'ldloc.3',
        'stloc.0',
        'stloc.1',
        'stloc.2',
        'stloc.3',
        'ldarg.s',
        'ldarga.s',
        'starg.s',
        'ldloc.s',
        'ldloca.s',
        'stloc.s',
        'ldnull',
        'ldc.i4.m1',
        'ldc.i4.0',
        'ldc.i4.1',
        'ldc.i4.2',
        'ldc.i4.3',
        'ldc.i4.4',
        'ldc.i4.5',
        'ldc.i4.6',
        'ldc.i4.7',
        'ldc.i4.8',
        'ldc.i4.s',
        'ldc.i4',
        'ldc.i8',
        'ldc.r4',
        'ldc.r8',
        'dup',
        'pop',
        'jmp',
        'call',
        'calli',        
        'br.s',
        'brfalse.s',
        'brtrue.s',
        'beq.s',
        'bge.s',
        'bgt.s',
        'ble.s',
        'blt.s',
        'bne.un.s',
        'bge.un.s',
        'bgt.un.s',
        'ble.un.s',
        'blt.un.s',
        'br',
        'brfalse',
        'brtrue',
        'beq',
        'bge',
        'bgt',
        'ble',
        'blt',
        'bne.un',
        'bge.un',
        'bgt.un',
        'ble.un',
        'blt.un',
        'switch',
        'ldind.i1',
        'ldind.u1',
        'ldind.i2',
        'ldind.u2',
        'ldind.i4',
        'ldind.u4',
        'ldind.i8',
        'ldind.i',
        'ldind.r4',
        'ldind.r8',
        'ldind.ref',
        'stind.ref',
        'stind.i1',
        'stind.i2',
        'stind.i4',
        'stind.i8',
        'stind.r4',
        'stind.r8',
        'add',
        'sub',
        'mul',
        'div',
        'div.un',
        'rem',
        'rem.un',
        'and',
        'or',
        'xor',
        'shl',
        'shr',
        'shr.un',
        'neg',
        'not',
        'conv.i1',
        'conv.i2',
        'conv.i4',
        'conv.i8',
        'conv.r4',
        'conv.r8',
        'conv.u4',
        'conv.u8',
        'callvirt',
        'cpobj',
        'ldobj',
        'ldstr',
        'newobj',
        'castclass',
        'isinst',
        'conv.r.un',
        'unbox',
        'throw',
        'ldfld',
        'ldflda',
        'stfld',
        'ldsfld',
        'ldsflda',
        'stsfld',
        'stobj',
        'conv.ovf.i1.un',
        'conv.ovf.i2.un',
        'conv.ovf.i4.un',
        'conv.ovf.i8.un',
        'conv.ovf.u1.un',
        'conv.ovf.u2.un',
        'conv.ovf.u4.un',
        'conv.ovf.u8.un',
        'conv.ovf.i.un',
        'conv.ovf.u.un',
        'box',
        'newarr',
        'ldlen',
        'ldelema',
        'ldelem.i1',
        'ldelem.u1',
        'ldelem.i2',
        'ldelem.u2',
        'ldelem.i4',
        'ldelem.u4',
        'ldelem.i8',
        'ldelem.i',
        'ldelem.r4',
        'ldelem.r8',
        'ldelem.ref',
        'stelem.i',
        'stelem.i1',
        'stelem.i2',
        'stelem.i4',
        'stelem.i8',
        'stelem.r4',
        'stelem.r8',
        'stelem.ref',
        'ldelem',
        'stelem',
        'unbox.any',
        'conv.ovf.i1',
        'conv.ovf.u1',
        'conv.ovf.i2',
        'conv.ovf.u2',
        'conv.ovf.i4',
        'conv.ovf.u4',
        'conv.ovf.i8',
        'conv.ovf.u8',
        'refanyval',
        'ckfinite',
        'mkrefany',
        'ldtoken',
        'conv.u2',
        'conv.u1',
        'conv.i',
        'conv.ovf.i',
        'conv.ovf.u',
        'add.ovf',
        'add.ovf.un',
        'mul.ovf',
        'mul.ovf.un',
        'sub.ovf',
        'sub.ovf.un',
        'endfinally',
        'leave',
        'leave.s',
        'stind.i',
        'conv.u',
        'arglist',
        'ceq',
        'cgt',
        'cgt.un',
        'clt',
        'clt.un',
        'ldftn',
        'ldvirtftn',
        'ldarg',
        'ldarga',
        'starg',
        'ldloc',
        'ldloca',
        'stloc',
        'localloc',
        'endfilter',
        'unaligned.',
        'volatile.',
        'tail.',
        'Initobj',
        'constrained.',
        'cpblk',
        'initblk',
        'no.',
        'rethrow',
        'sizeof',
        'Refanytype',
        'readonly.'
];
export var language = {
    defaultToken: '',
    ignoreCase: true,
    tokenPostfix: '.asm',
    keywords: asmKeywords,
    typeKeywords: [
        
    ],
    operators: [
        
    ],
    symbols: /[=><!~?&+\-*\/\^%#@]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    // The main tokenizer for our languages
    tokenizer: {
        root: [
            [
                /[a-zA-Z_.]+/,
                {
                    cases: {
                        '@keywords': { token: 'keyword.$0' },
                        '@default': 'identifier'
                    }
                }
            ],
            // whitespace
            { include: '@whitespace' },
            // [[ attributes ]].
            [/\[\[.*\]\]/, 'annotation'],
            // Preprocessor directive
            [/^\s*#\w+/, 'keyword'],
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
            [/\d*\d+[eE]([\-+]?\d+)?/, 'number.float'],
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F']*[0-9a-fA-F]/, 'number.hex'],
            [/0[0-7']*[0-7]/, 'number.octal'],
            [/0[bB][0-1']*[0-1]/, 'number.binary'],
            [/\d[\d']*/, 'number'],
            [/\d/, 'number'],
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
        comment: [
            [/[^\/*]+/, 'comment'],
            // [/\/\*/,    'comment', '@push' ],    // no nested comments :-(
            ['\\*/', 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        whitespace: [
            [/[ \t\r\n]+/, ''],
            [/\/\*/, 'comment', '@comment'],
            [/\/\/.*$/, 'comment']
        ],
        string: [
            [/[^\\"]+/, 'string'],
            [/@escapes/, 'string.escape'],
            [/\\./, 'string.escape.invalid'],
            [/"/, 'string', '@pop']
        ]
    }
};
