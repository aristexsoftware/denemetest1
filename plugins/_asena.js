/* Copyright (C) 2024 Çağan Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Morfin - Çağan Usta
*/

const Morfin = require('../events');
const Config = require('../config');
const {MessageType} = require('@adiwajshing/baileys');

const Language = require('../language');
const Lang = Language.getString('_morfin');

Morfin.addCommand({pattern: 'morfin ?(.*)', fromMe: true, dontAddCommandList: true}, (async (message, match) => {
    var CMD_HELP = '';
    if (match[1] === '') {
        Morfin.commands.map(
            async (command) =>  {
                if (command.dontAddCommandList || command.pattern === undefined) return;
                try {
                    var match = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç]*)/);
                } catch {
                    var match = [command.pattern];
                }
    
                var HANDLER = '';
    
                if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                    HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                } else {
                    HANDLER = '.';
                }
                CMD_HELP += '*🛠 ' + Lang.COMMAND + ':* ```' + (match.length >= 3 ? (HANDLER + match[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                if (command.desc !== '') CMD_HELP += '*💬 ' + Lang.DESC + ':* ```' + command.desc + (command.usage === '' ? '```\n\n' : '```\n');
                if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';
            }
        );
        
        await message.client.sendMessage(
            message.jid, CMD_HELP, MessageType.text
        );    
    } else {
        var CMD_HELP = '';
        Morfin.commands.map(
            async (command) =>  {
                if (command.dontAddCommandList || command.pattern === undefined) return;
                try {
                    var cmatch = command.pattern.toString().match(/(\W*)([A-Za-zğüşiöç]*)/);
                } catch {
                    var cmatch = [command.pattern];
                }
                
                if (cmatch[2] == match[1]) {
                    var HANDLER = '';
    
                    if (/\[(\W*)\]/.test(Config.HANDLERS)) {
                        HANDLER = Config.HANDLERS.match(/\[(\W*)\]/)[1][0];
                    } else {
                        HANDLER = '.';
                    }
                    CMD_HELP += '*🛠 ' + Lang.COMMAND + ':* ```' + (cmatch.length >= 3 ? (HANDLER + cmatch[2]) : command.pattern) + (command.desc === '' ? '```\n\n' : '```\n');
                    if (command.desc !== '') CMD_HELP += '*💬 ' + Lang.DESC + ':* ```' + command.desc + (command.usage === '' ? '```\n\n' : '```\n');
                    if (command.usage !== '') CMD_HELP += '*⌨️ ' + Lang.EXAMPLE + ':* ```' + command.usage + '```\n\n';    
                }
            }
        );
        if (CMD_HELP === '') CMD_HELP += Lang.NOT_FOUND;
        await message.client.sendMessage(
            message.jid, CMD_HELP, MessageType.text
        );
    }
}));