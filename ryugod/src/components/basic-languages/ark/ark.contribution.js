/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { registerLanguage } from '../_.contribution.js';
registerLanguage({
    id: 'ark',
    extensions: ['.ark'],
    aliases: ['ArkScript', 'arkscript', 'Ark', 'ark'],
    loader: function () { return import('./ark.js'); }
});
