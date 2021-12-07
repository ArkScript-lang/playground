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
    tokenPostfix: '.ck',
    keywords: [
        'true',
        'false',
        'maybe',
        'null',
        'NULL',
        'if',
        'else',
        'fun',
        'function',
        'return',
        'const',
        'new',
        'now',
        'pi',
        'me',
        'samp',
        'ms',
        'second',
        'minute',
        'hour',
        'day',
        'week',
        'repeat',
        'break',
        'continue',
        'class',
        'extends',
        'public',
        'private',
        'static',
        'pure',
        'this',
        'spork',
        'cherr',
        'chout',
        'while',
        'until',
        'for',
        'do',
        'int',
        'float',
        'time',
        'dur',
        'void',
        'string',
        'array',
        'ugen',
        'complex',
        'polar',
        'Object',
        'Event',
        'UGen',        
    ],
    builtins: [
        'adc',
        'blackhole',
        'dac',
        'Gain',
        'Noise',
        'Impulse',
        'Step',
        'Phasor',
        'Osc',
        'SinOsc',
        'PulseOsc',
        'SqrOsc',
        'TriOsc',
        'SawOsc',
        'Gen5',
        'Gen7',
        'Gen9',
        'Gen10',
        'Gen17',
        'CurveTable',
        'WarpTable',
        'BiQuad',
        'OneZero',
        'TwoZero',
        'OnePole',
        'TwoPole',
        'PoleZero',
        'Filter',
        'LPF',
        'HPF',
        'BPF',
        'BRF',
        'ResonZ',
        'Dynamics',
        'HalfRect',
        'FullRect',
        'ZeroX',
        'SndBuf',
        'Mix2',
        'Pan2',
        'StkInstrument',
        'BandedWG',
        'BlowBotl',
        'BlowHole',
        'Bowed',
        'Brass',
        'Clarinet',
        'Flute',
        'Mandolin',
        'ModalBar',
        'Moog',
        'Saxofony',
        'Shakers',
        'Sitar',
        'StifKarp',
        'VoicForm',
        'FM',
        'BeeThree',
        'FMVoices',
        'HevyMetl',
        'PercFlut',
        'Rhodey',
        'TubeBell',
        'Wurley',
        'Delay',
        'DelayA',
        'DelayL',
        'Echo',
        'Envelope',
        'ADSR',
        'JCRev',
        'NRev',
        'PRCRev',
        'Chorus',
        'Modulate',
        'PitShift',
        'SubNoise',
        'Blit',
        'BlitSaw',
        'BlitSquare',
        'WvIn',
        'WaveLoop',
        'WvOut',
        'GenX',
        'LiSa',
        'Dyno',
        'Chugen',
        'Chubgraph',
        'UAna',
        'UAnaBlob',
        'Windowing',
        'FFT',
        'IFFT',
        'DCT',
        'IDCT',
        'Centroid',
        'Flux',
        'RMS',
        'RollOff',
        'Flip',
        'pil',
        'ABSaturator',
        'AmbPan',
        'Bitcrusher',
        'Elliptic',
        'ExpDelay',
        'FIR',
        'FluidSynth',
        'GVerb',
        'KasFilter',
        'Ladspa',
        'MagicSine',
        'Mesh2D',
        'Multicomb',
        'Overdrive',
        'PanN',
        'PitchTrack',
        'PowerADSR',
        'Sigmund',
        'Spectacle',
        'WinFuncEnv',
        'OscRecv',
        'OscSend',
        'OscEvent',
        'OscOut',
        'OscIn',
        'OscMsg',
        'MidiIn',
        'MidiOut',
        'MidiMsg',
        'KBHit',
        'Hid',
        'HidMsg',
        'Machine',
        'RegEx',
        'FileIO',
        'SerialIO',
        'StringTokenizer',
        'ConsoleInput',
        'Math',
        'Std',
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