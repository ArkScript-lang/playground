/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export var conf = {
    comments: {
        lineComment: '//',
        blockComment: ["/*", "*/"]
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
    tokenPostfix: '.ec',
    keywords: [
        'auto',
        'break',
        'case',
        'const',
        'continue',
        'default',
        'do',
        'else',
        'enum',
        'extern',
        'float',
        'for',
        'goto',
        'if',
        'register',
        'return',
        'sizeof',
        '__alignof__',
        '__alignof',
        '__builtin_offsetof',
        'static',
        '__thread',
        'struct',
        'switch',
        'typedef',
        'union',
        'unsigned',
        'void',
        'volatile',
        '__volatile__',
        '__volatile',
        'while',
        'property',
        'set',
        'get',
        'isset',
        'class',
        'thisclass',
        'virtual',
        'delete',
        'new',
        'new0',
        'renew',
        'renew0',
        'import',
        'define',
        '__inline__',
        '_inline',
        '__inline',
        'inline',
        '__declspec',
        '__declspec',
        'dllexport',
        'dllimport',
        '_Noreturn',
        '__cdecl',
        '__stdcall',
        '__stdcall__',
        '_stdcall',
        'stdcall',
        '__restrict',
        '__const',
        '__restrict__',
        'public',
        'private',
        'typed_object',
        'any_object',
        'incref',
        '__extension__',
        '_extension_',
        '__asm__',
        'asm',
        '__asm',
        '__typeof',
        'watch',
        'stopwatching',
        'firewatchers',
        'watchable',
        'class_designer',
        'class_no_expansion',
        'class_fixed',
        'class_default_property',
        'property_category',
        'class_data',
        'class_property',
        'subclass',
        'namespace',
        'dbtable',
        'dbfield',
        'dbindex',
        'database_open',
    ],
    builtins: [
        'acos',
        'acosh',
        'asin',
        'asinh',
        'atan',
        'atan2',
        'atanh',
        'atof',
        'atoi',
        'ceil',
        'cos',
        'cosh',
        'exp',
        'fabs',
        'floor',
        'fmod',
        'fputs',
        'fstrcmp',
        'getenv',
        'isalnum',
        'isalpha',
        'isblank',
        'isdigit',
        'islower',
        'isprint',
        'isspace',
        'isupper',
        'isxdigit',
        'log',
        'log10',
        'memcmp',
        'memcpy',
        'memmove',
        'memset',
        'pow',
        'printf',
        'puts',
        'qsort',
        'rename',
        'sin',
        'sinh',
        'snprintf',
        'sprintf',
        'sqrt',
        'strcasecmp',
        'strcat',
        'strchr',
        'strcmp',
        'strcmpi',
        'strcpy',
        'strlen',
        'strlwr',
        'strncasecmp',
        'strncat',
        'strncmp',
        'strncpy',
        'strnicmp',
        'strstr',
        'strtod',
        'strtol',
        'strtoll',
        'strtoul',
        'strtoull',
        'strupr',
        'system',
        'tan',
        'tanh',
        'tolower',
        'toupper',
        'vsnprintf',
        'vsprintf',
        'PrintLn',
    ],
    typeKeywords: [
        'char',
        'true',
        'false',
        'null',
        'int',
        'double',
        'long',
        'short',
        'unsigned',
        '__signed',
        '__signed__',
        'unichar',
        'uint',
        'uint32',
        '__int32',
        'uint16',
        'uint64',
        'bool',
        'byte',
        'int64',
        '__int64',
        '__int128',
        '__float128',
        '_Float128',
        'uintptr',
        'intptr',
        'intsize',
        'uintsize',
        '__builtin_va_list',
        '__builtin_va_arg',
        'Bool',
        '_Bool',
        '_Complex',
        '_Imaginary',
        'restrict',
        '_Nullable',
        '_Nonnull',
        '__ptr32',
        '__ptr64',
        '_Atomic',
        '__forceinline',
        '__unaligned',
        '_Alignof',
        '_Static_assert',
        '__attribute_deprecated__',
        '__attribute__',
        '__attribute',
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
            [/#[a-zA-Z_]\w*/, 'metatag'],
            [
                /[a-zA-Z_]\w*/,
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
            [/(\/\/.*$)/, 'comment'],
            [/\/\*/, 'comment', '@comment'],
        ],
        comment: [
            [/[^\/*]+/, 'comment'],
            [/\*\//, 'comment', '@pop'],
            [/[\/*]/, 'comment']
        ],
        // Recognize hex, negatives, decimals, imaginaries, longs, and scientific notation
        numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
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
