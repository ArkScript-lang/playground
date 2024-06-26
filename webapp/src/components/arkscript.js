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
    // todo update the list
    builtins: [
        'reverseList',
        'findInList',
        'removeAtList',
        'sliceList',
        'sort_',
        'fill',
        'setListAt',
        'print',
        'puts_',
        'input',
        'writeFile',
        'readFile',
        'fileExists',
        'listFiles',
        'isDirectory',
        'makeDir',
        'removeFiles',
        'timeSinceEpoch',
        'system_',
        'sleep',
        'exit_',
        'format',
        'findSubStr',
        'removeAtStr',
        'ord',
        'chr',
        'exponential',
        'logarithm',
        'ceil_',
        'floor_',
        'round_',
        'isnan_',
        'isinf_',
        'pi_',
        'e_',
        'tau_',
        'inf_',
        'nan_',
        'cos_',
        'sin_',
        'tan_',
        'acos_',
        'asin_',
        'atan_',
        'cosh_',
        'sinh_',
        'tanh_',
        'acosh_',
        'asinh_',
        'atanh_',
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