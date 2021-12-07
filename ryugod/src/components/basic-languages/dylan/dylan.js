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
            beforeText: new RegExp('^\\s*(?:function|if|for|if|else|until|while|class).*?\\s*$'),
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
    tokenPostfix: '.dylan',
    keywords: [
        'abort',
        'above',
        'afterwards',
        'array',
        'begin',
        'below',
        'block',
        'boolean',
        'by',
        'byte-string',
        'case',
        'character',
        'class',
        'class',
        'cleanup',
        'collection',
        'complex',
        'condition',
        'constant',
        'create',
        'default',
        'define',
        'deque',
        'double-float',
        'each-subclass',        
        'else',
        'elseif',        
        'empty-list',
        'end',
        'error',
        'exception',
        'exclude',
        'explicit-key-collection',
        'export',
        'extended-float',
        'finally',
        'float',
        'for',
        'from',
        'function',
        'generic',
        'generic-function',
        'if',
        'import',
        'in',
        'inherited',
        'init-function',
        'init-keyword',
        'init-value',
        'instance',
        'integer',
        'keyed-by',
        'keyword',
        'let',
        'library',
        'list',
        'load-library',
        'local',
        'login-name',
        'login-group',
        'macro',
        'method',
        'method',
        'module',
        'mutable-collection',
        'mutable-explicit-key-collection',
        'mutable-sequence',
        'number',
        'object',
        'object-table',
        'otherwise',
        'pair',
        'prefix',
        'range',
        'rational',
        'real',
        'rename',
        'required',
        'required-init-keyword',
        'restart',
        'run-application',
        'sealed',
        'sealed-object-error',
        'select',
        'sequence',
        'serious-condition',
        'setter',
        'simple-error',
        'simple-object-vector',
        'simple-restart',
        'simple-vector',
        'simple-warning',
        'single-float',
        'singleton',
        'slot',
        'stretchy-collection',
        'stretchy-vector',
        'string',
        'symbol',
        'table',
        'then',
        'to',
        'type',
        'type',
        'type-error',
        'unicode-string',
        'unless',
        'until',
        'use',
        'using',
        'variable',
        'vector',
        'virtual',
        'warning',
        'when',
        'while',
    ],
    builtins: [
        'abort',
        'abs',
        'add',
        'add-method',
        'add-new',
        'all-superclasses',
        'always',
        'any',
        'applicable-method',
        'application-arguments',
        'application-name',
        'apply',
        'aref',
        'aref-setter',
        'as',
        'as-lowercase',
        'as-uppercase',
        'ash',
        'author',
        'backward-iteration-protocol',
        'break',
        'ceiling',
        'cerror',
        'check-type',
        'choose',
        'choose-by',
        'compiler-open',
        'compiler-sideways',
        'complement',
        'compose',
        'concatenate',
        'concatenate-as',
        'condition-format-arguments',
        'condition-format-string',
        'conjoin',
        'constant',
        'copy-sequence',
        'copyright',
        'curry',
        'default-handler',
        'default-inline',
        'dimension',
        'dimensions',
        'direct-subclasses',
        'direct-superclasses',
        'disjoin',
        'do',
        'do-handlers',
        'domain method',
        'dynamic',
        'element',
        'element-setter',
        'empty',
        'error',
        'even',
        'every',
        'environment-variableFunction',
        'executable',
        'exit-application',
        'false-or',
        'files',
        'fill',
        'find-key',
        'find-method',
        'first',
        'first-setter',
        'floor',
        'force-err',
        'force-out',
        'format-err',
        'format-out',
        'forward-iteration-protocol',
        'function',
        'function-arguments',
        'function-return-values',
        'function-specializers',
        'gcd',
        'generic',
        'generic-function-mandatory-keywords',
        'generic-function-methods',
        'head',
        'head-setter',
        'identity',
        'initialize',
        'inline',
        'inline-only',
        'instance',
        'integral',
        'intersection',
        'key-sequence',
        'key-test',
        'last',
        'last-setter',
        'lcm',
        'library',
        'limited',
        'list',
        'locked',
        'logand',
        'logbit',
        'logior',
        'lognot',
        'logxor',
        'make',
        'map',
        'map-as',
        'map-into',
        'max',
        'may-inline',
        'member',
        'merge-hash-codes',
        'min',
        'modulo',
        'negative',
        'next-method',
        'not-inline',
        'object-class',
        'object-hash',
        'odd',
        'one-of',
        'open',
        'pair',
        'pop',
        'pop-last',
        'positive',
        'print',
        'print-to-string',
        'print-object',
        'printing-object',
        'push',
        'push-last',
        'range',
        'rank',
        'rcurry',
        'reduce',
        'reduce1',
        'remainder',
        'remove',
        'remove-duplicates',
        'remove-duplicates',
        'remove-key',
        'remove-method',
        'replace-elements',
        'replace-subsequence',
        'restart-query',
        'return-allowed',
        'return-description',
        'return-query',
        'reverse',
        'round',
        'row-major-index',
        'sealed',
        'second',
        'second-setter',
        'shallow-copy',
        'sideways',
        'signal',
        'singleton',
        'size',
        'size-setter',
        'slot-initialized',
        'sort',
        'sorted-applicable-methods',
        'subsequence-position',
        'subtype',
        'synopsis',
        'table-protocol',
        'tail',
        'tail-setter',
        'third',
        'third-setter',
        'thread',
        'truncate',
        'type-error-expected-type',
        'type-error-value',
        'type-for-copy',
        'type-union',
        'union',
        'values',
        'variable',
        'vector',
        'version',
        'zero',
        'Module',
        'Synopsis',
        'Author',
        'Copyright',
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
            [/\<[a-zA-Z_]\w*\>/, 'metatag'],
            [
                /[a-zA-Z_\-]+/,
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