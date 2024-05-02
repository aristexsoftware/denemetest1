/* Copyright (C) 2024 Çağan Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Morfin - Çağan Usta
*/

const Morfin = require('../events');
const {MessageType} = require('@adiwajshing/baileys');
const {spawnSync} = require('child_process');
const Config = require('../config');

const Language = require('../language');
const Lang = Language.getString('system_stats');

Morfin.addCommand({pattern: 'alive', fromMe: true, desc: Lang.ALIVE_DESC}, (async (message, match) => {
    await message.sendMessage(
        '```Tanrı Türk\'ü Korusun. 🐺 Morfin çalışıyor...```\n\n*Version:* ```'+Config.VERSION+'```\n*Telegram Group:* https://t.me/MorfinSupport\n*Telegram Channel:* https://t.me/Morfin' , MessageType.text
    );
}));

Morfin.addCommand({pattern: 'sysd', fromMe: true, desc: Lang.SYSD_DESC}, (async (message, match) => {
    const child = spawnSync('neofetch', ['--stdout']).stdout.toString('utf-8')
    await message.sendMessage(
        '```' + child + '```', MessageType.text
    );
}));