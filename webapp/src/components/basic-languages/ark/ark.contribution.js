/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as monaco from "monaco-editor";
import { conf, language } from "./ark";

monaco.languages.register({
    id: 'ark',
    extensions: ['.ark'],
    aliases: ['Ark', 'ark'],
});

monaco.languages.setMonarchTokensProvider('ark', language);
