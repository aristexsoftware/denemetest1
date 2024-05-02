/* Copyright (C) 2024 Çağan Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Morfin - Çağan Usta
*/

const Morfin = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const exec = require('child_process').exec;
const os = require("os");

const Language = require('../language');
const Lang = Language.getString('evaluators');

Morfin.addCommand({pattern: 'term ?(.*)', fromMe: true, desc: Lang.TERM_DESC, usage: '.term ls'}, (async (message, match) => {    
    var user = os.userInfo().username;
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.GIVE_ME_CODE,MessageType.text);

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + err + '```',MessageType.text);
        }
        
        return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + stdout + '```',MessageType.text);
      });
}));
