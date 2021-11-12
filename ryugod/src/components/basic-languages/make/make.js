/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { languages } from '../fillers/monaco-editor-core.js';
export var conf = {
    comments: {
        lineComment: '#',
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
    onEnterRules: [
        {
            beforeText: new RegExp('^\\s*(?:fn|for|if|else|interface).*?\\s*$'),
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
    defaultToken: 'invalid',
    tokenPostfix: '.makefile',
    keywords: [
        'vpath',
        'export',
        'unexport',
        'override',
        'define',
        'endef',
        'cmdswitches',
        'error',
        'message',
        'include',
        'if',
        'ifdef',
        'ifndef',
        'else',
        'endif',
        'undef',
    ],
    builtins: [
        'abspath',
        'addprefix',
        'addsuffix',
        'and',
        'basename',
        'call',
        'dir',
        'error',
        'eval',
        'file',
        'filter-out',
        'filter',
        'findstring',
        'firstword',
        'flavor',
        'foreach',
        'guile',
        'if',
        'info',
        'join',
        'lastword',
        'notdir',
        'or',
        'origin',
        'patsubst',
        'realpath',
        'shell',
        'sort',
        'strip',
        'subst',
        'suffix',
        'value',
        'warning',
        'wildcard',
        'word',
        'wordlist',
        'words',
    ],
    typeKeywords: [
        '@',
        '.SUFFIXES',
        '.PHONY',
        '.DEFAULT',
        '.PRECIOUS',
        '.IGNORE',
        '.SILENT',
        '.EXPORT_ALL_VARIABLES',
        '.KEEP_STATE',
        '.LIBPATTERNS',
        '.NOTPARALLEL',
        '.DELETE_ON_ERROR',
        '.INTERMEDIATE',
        '.POSIX',
        '.SECONDARY',
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
            [/\$[a-zA-Z_@-].*/, 'variable'],
            [/\$\([a-zA-Z_@-].*?\)/, 'variable'],
            //[/[a-zA-Z_@.]+\ *:/, 'metatag'],
            [
                /\.?[a-zA-Z_@-]\w*/,
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
            [/(#.*$)/, 'comment'],
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
