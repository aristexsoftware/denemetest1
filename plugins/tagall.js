/* Copyright (C) 2024 Çağan Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Morfin - Çağan Usta
*/

const Morfin = require('../events');
const {MessageType} = require('@adiwajshing/baileys');

const Language = require('../language');
const Lang = Language.getString('tagall');

Morfin.addCommand({pattern: 'tagall', fromMe: true, desc: Lang.TAGALL_DESC}, (async (message, match) => {
    grup = await message.client.groupMetadata(message.jid);
    var jids = [];
    mesaj = '';
    grup['participants'].map(
        async (uye) => {
            mesaj += '@' + uye.id.split('@')[0] + ' ';
            jids.push(uye.id.replace('c.us', 's.whatsapp.net'));
        }
    );
    await message.client.sendMessage(message.jid,mesaj, MessageType.extendedText, {contextInfo: {mentionedJid: jids}, previewType: 0})
}));
