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
    tokenPostfix: '.c3',
    keywords: [
        'as',
        'auto',
        'asm',
        'attribute',
        'break',
        'case',
        'cast',
        'catch',
        'const',
        'continue',
        'default',
        'defer',
        'define',
        'do',
        'else',
        'enum',
        'errtype',
        'false',
        'for',
        'func',
        'generic',
        'if',
        'import',
        'local',
        'macro',
        'module',
        'nextcase',
        'nil',
        'private',
        'return',
        'struct',
        'switch',
        'throw',
        'throws',
        'true',
        'try',
        'type',
        'union',
        'until',
        'var',
        'void',
        'volatile',
        'while',
        'float',
        'double char',
        'bool',
        'byte',
        'short',
        'ushort',
        'int',
        'uint',
        'long',
        'ulong',
        'isize',
        'usize',
        'double',
        'extern',
        'char',
        'foreach',
    ],
    builtins: [
        'puts',
        'putchar',
        'print',
        'println',
        '_IOFBF',
        '_IOLBF',
        '_IONBF',
        'abort',
        'abs',
        'asctime',
        'atexit',
        'atof',
        'atoi',
        'atol',
        'bsearch',
        'BUFSIZ',
        'calloc',
        'clearerr',
        'clock',
        'Clock',
        'CLOCKS_PER_SEC',
        'CompareFunction',
        'ctime',
        'denom',
        'difftime',
        'div',
        'DivResult',
        'EOF',
        'exit',
        'EXIT_FAILURE',
        'EXIT_SUCCESS',
        'fclose',
        'feof',
        'ferror',
        'fflush',
        'fgetc',
        'fgetpos',
        'fgets',
        'FILENAME_MAX',
        'fopen',
        'FOPEN_MAX',
        'Fpos',
        'fprintf',
        'fputc',
        'fread',
        'free',
        'freopen',
        'fscanf',
        'fseek',
        'fsetpos',
        'ftell',
        'fwrite',
        'getc',
        'getchar',
        'getenv',
        'gmtime',
        'labs',
        'ldiv',
        'localtime',
        'LongDivResult',
        'malloc',
        'memchr',
        'memcmp',
        'memcpy',
        'memmove',
        'memset',
        'mktime',
        'number',
        'perror',
        'printf',
        'putc',
        'putchar',
        'puts',
        'qsort',
        'rand',
        'RAND_MAX',
        'realloc',
        'remove',
        'rename',
        'rewind',
        'scanf',
        'SEEK_CUR',
        'SEEK_END',
        'SEEK_SET',
        'setbuf',
        'setvbuf',
        'signal',
        'SignalFunction',
        'sprintf',
        'srand',
        'sscanf',
        'strcat',
        'strchr',
        'strcmp',
        'strcoll',
        'strcpy',
        'strcspn',
        'strerror',
        'strftime',
        'strlen',
        'strncat',
        'strncmp',
        'strncpy',
        'stroul',
        'strpbrk',
        'strspn',
        'strstr',
        'strtod',
        'strtok',
        'strtol',
        'strxfrm',
        'system',
        'TerminateFunction',
        'time',
        'Time',
        'Tm',
        'tmpnam',
        'ungetc',
    ],
    typeKeywords: [],
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
            [/[@$][a-zA-Z_]\w*/, 'metatag'],
            [/#[a-zA-Z_]\w*/, 'tag'],
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
            [/\/\*/, 'comment', '@push' ],
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