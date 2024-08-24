import * as monaco from "monaco-editor";

const conf = {
    comments: {
        lineComment: '#',
    },
    brackets: [
        ['{', '}'],
        ['[', ']'],
        ['(', ')']
    ],
    autoClosingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"', notIn: ['string']}
    ],
    surroundingPairs: [
        {open: '{', close: '}'},
        {open: '[', close: ']'},
        {open: '(', close: ')'},
        {open: '"', close: '"'}
    ],
    folding: {
        offSide: true,
        markers: {
            start: new RegExp('^\\s*#region\\b'),
            end: new RegExp('^\\s*#endregion\\b')
        }
    }
};
const language = {
    defaultToken: '',
    tokenPostfix: '.ark',
    keywords: [
        'begin',
        'del',
        'fun',
        'if',
        'import',
        'let',
        'mut',
        'set',
        'while',
    ],
    builtins: [
        'list',
        'append',
        'concat',
        'pop',
        'append!',
        'concat!',
        'pop!',
        'print',
        'puts',
        'input',
        'io:writeFile',
        'io:readFile',
        'io:fileExists?',
        'io:listFiles',
        'io:dir?',
        'io:makeDir',
        'io:removeFiles',
        'list:reverse',
        'list:find',
        'list:slice',
        'list:sort',
        'list:fill',
        'list:setAt',
        'math:exp',
        'math:ln',
        'math:ceil',
        'math:floor',
        'math:round',
        'math:NaN?',
        'math:Inf?',
        'math:cos',
        'math:sin',
        'math:tan',
        'math:arccos',
        'math:arcsin',
        'math:arctan',
        'math:cosh',
        'math:sinh',
        'math:tanh',
        'math:acosh',
        'math:asinh',
        'math:atanh',
        'math:pi',
        'math:e',
        'math:tau',
        'math:Inf',
        'math:NaN',
        'str:format',
        'str:find',
        'str:removeAt',
        'str:ord',
        'str:chr',
        'sys:exec',
        'sys:sleep',
        'sys:exit',
        'async',
        'await',
        'time',
        'len',
        'empty?',
        'tail',
        'head',
        'nil?',
        'assert',
        'toNumber',
        'toString',
        'and',
        'or',
        'mod',
        'type',
        'hasField',
        'not',
        'false',
        'true',
        'nil',
    ],
    brackets: [
        {open: '{', close: '}', token: 'delimiter.curly'},
        {open: '[', close: ']', token: 'delimiter.bracket'},
        {open: '(', close: ')', token: 'delimiter.parenthesis'}
    ],
    tokenizer: {
        root: [
            {include: '@whitespace'},
            {include: '@numbers'},
            {include: '@strings'},
            [/[,:;]/, 'delimiter'],
            [/[{}[]\(\)]/, '@brackets'],
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
            [/(#.*$)/, 'comment'],
        ],
        // Recognize hex, negatives, decimals, imaginary numbers, longs, and scientific notation
        numbers: [
            [/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/, 'number.hex'],
            [/-?(\d*\.)?\d+([eE][+-]?\d+)?[jJ]?[lL]?/, 'number']
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

monaco.languages.register({
    id: 'ark',
    extensions: ['.ark'],
    aliases: ['Ark', 'ark'],
});

monaco.languages.setMonarchTokensProvider('ark', language);
monaco.languages.setLanguageConfiguration('ark', conf);

export const languageConf = {
    highlighting: "ark",
    ext: 'ark',
    template: "ark",
    icon: 'mdi-code-parentheses',
    command: 'arkscript main.ark',
    args: '',
    errorRegEx: "On line (\\d+):\\d+, (.+)",
    keyBindings: null,
};