/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { languages } from '../fillers/monaco-editor-core.js';
export var conf = {
    comments: {
        lineComment: '//',
        blockComment: ["/*", "*/"]
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')'],
        ['if', 'end'],
        ['for', 'next'],
        ['switch', 'off'],
        ['func', 'endfunc'],
    ],
    autoClosingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"', notIn: ['string'] },
        { open: "'", close: "'", notIn: ['string', 'comment'] },
    ],
    surroundingPairs: [
        { open: '{', close: '}' },
        { open: '[', close: ']' },
        { open: '(', close: ')' },
        { open: '"', close: '"' },
        { open: "'", close: "'" },
    ],
    onEnterRules: [
        {
            beforeText: new RegExp('^\\s*(?:func|for|if|else|elseif).*?\\s*$'),
            action: { indentAction: languages.IndentAction.Indent }
        }
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
    defaultToken: '',
    ignoreCase: true,
    tokenPostfix: '.ring',
    brackets: [
        { token: 'delimiter.bracket', open: '{', close: '}' },
        { token: 'delimiter.array', open: '[', close: ']' },
        { token: 'delimiter.parenthesis', open: '(', close: ')' },
        { token: 'keyword.if', open: 'if', close: 'end' },
        { token: 'keyword.for', open: 'for', close: 'next' },
        { token: 'keyword.switch', open: 'switch', close: 'off' },
        { token: 'keyword.func', open: 'func', close: 'endfunc' },
    ],
    keywords: [
        'again',
        'and',
        'but',
        'bye',
        'call',
        'case',
        'catch',
        'changeringkeyword',
        'changeringoperator',
        'class',
        'def',
        'do',
        'done',
        'else',
        'elseif',
        'end',
        'exit',
        'for',
        'from',
        'func',
        'get',
        'give',
        'if',
        'import',
        'in',
        'load',
        'loadsyntax',
        'loop',
        'new',
        'next',
        'not',
        'off',
        'ok',
        'on',
        'or',
        'other',
        'package',
        'private',
        'put',
        'return',
        'see',
        'step',
        'switch',
        'to',
        'try',
        'while',
        'endfunc',
        'endclass',
        'endpackage',
        'false',
        'true',
    ],
    builtins: [
        'len',
        'add',
        'del',
        'get',
        'clock',
        'lower',
        'upper',
        'input',
        'ascii',
        'char',
        'date',
        'time',
        'filename',
        'getchar',
        'system',
        'random',
        'timelist',
        'adddays',
        'diffdays',
        'isstring',
        'isnumber',
        'islist',
        'type',
        'isnull',
        'isobject',
        'hex',
        'dec',
        'number',
        'string',
        'str2hex',
        'hex2str',
        'str2list',
        'list2str',
        'left',
        'right',
        'trim',
        'copy',
        'substr',
        'lines',
        'strcmp',
        'eval',
        'raise',
        'assert',
        'isalnum',
        'isalpha',
        'iscntrl',
        'isdigit',
        'isgraph',
        'islower',
        'isprint',
        'ispunct',
        'isspace',
        'isupper',
        'isxdigit',
        'locals',
        'globals',
        'functions',
        'cfunctions',
        'islocal',
        'isglobal',
        'isfunction',
        'iscfunction',
        'packages',
        'ispackage',
        'classes',
        'isclass',
        'packageclasses',
        'ispackageclass',
        'classname',
        'objectid',
        'attributes',
        'methods',
        'isattribute',
        'ismethod',
        'isprivateattribute',
        'isprivatemethod',
        'addattribute',
        'addmethod',
        'getattribute',
        'setattribute',
        'mergemethods',
        'list',
        'find',
        'min',
        'max',
        'insert',
        'sort',
        'reverse',
        'binarysearch',
        'sin',
        'cos',
        'tan',
        'asin',
        'acos',
        'atan',
        'atan2',
        'sinh',
        'cosh',
        'tanh',
        'exp',
        'log',
        'log10',
        'ceil',
        'floor',
        'fabs',
        'pow',
        'sqrt',
        'unsigned',
        'decimals',
        'murmur3hash',
        'fopen',
        'fclose',
        'fflush',
        'freopen',
        'tempfile',
        'tempname',
        'fseek',
        'ftell',
        'rewind',
        'fgetpos',
        'fsetpos',
        'clearerr',
        'feof',
        'ferror',
        'perror',
        'rename',
        'remove',
        'fgetc',
        'fgets',
        'fputc',
        'fputs',
        'ungetc',
        'fread',
        'fwrite',
        'dir',
        'read',
        'write',
        'fexists',
        'ismsdos',
        'iswindows',
        'iswindows64',
        'isunix',
        'ismacosx',
        'islinux',
        'isfreebsd',
        'isandroid',
        'windowsnl',
        'mysql_info',
        'mysql_init',
        'mysql_error',
        'mysql_connect',
        'mysql_close',
        'mysql_query',
        'mysql_result',
        'mysql_insert_id',
        'mysql_columns',
        'mysql_result2',
        'mysql_next_result',
        'mysql_escape_string',
        'mysql_autocommit',
        'mysql_commit',
        'mysql_rollback',
        'odbc_init',
        'odbc_drivers',
        'odbc_datasources',
        'odbc_close',
        'odbc_connect',
        'odbc_disconnect',
        'odbc_execute',
        'odbc_colcount',
        'odbc_fetch',
        'odbc_getdata',
        'odbc_tables',
        'odbc_columns',
        'odbc_autocommit',
        'odbc_commit',
        'odbc_rollback',
        'md5',
        'sha1',
        'sha256',
        'sha512',
        'sha384',
        'sha224',
        'encrypt',
        'decrypt',
        'randbytes',
        'download',
        'sendemail',
        'loadlib',
        'closelib',
        'callgc',
        'varptr',
        'intvalue',
        'nl',
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
            [/@[a-zA-Z_]\w*/, 'tag'],
            [
                /[a-zA-Z_]\w*/,
                {
                    cases: {
                        '@keywords': 'keyword',
                        '@builtins': 'type.identifier',
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
            [/[^\\']+/, 'string'],
            [/\\./, 'string'],
            [/'/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ],
        dblStringBody: [
            [/[^\\"]+/, 'string'],
            [/\\./, 'string'],
            [/"/, 'string.escape', '@popall'],
            [/\\$/, 'string']
        ]
    }
};
