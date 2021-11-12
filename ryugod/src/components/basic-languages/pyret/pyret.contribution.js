/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { registerLanguage } from '../_.contribution.js';
registerLanguage({
    id: 'pyret',
    extensions: ['.arr'],
    aliases: ['Pyret', 'pyert'],
    loader: function () { return import('./pyret.js'); }
});
